// =====================
// EOS 계약계산기
// Part 1
// =====================

const productSelect = document.getElementById("productSelect");
const qtyInput = document.getElementById("qty");
const contractList = document.getElementById("contractList");

const totalPrice = document.getElementById("totalPrice");
const monthlyPayment = document.getElementById("monthlyPayment");
const supportMoney = document.getElementById("supportMoney");

let contracts = [];

// 제품 목록 만들기
function loadProducts() {

    productSelect.innerHTML = "";

    products.forEach((product, index) => {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = product.name;

        productSelect.appendChild(option);

    });

}

// PMT 함수 (엑셀과 동일한 방식)
function PMT(rate, nper, pv){

    if(rate===0){
        return pv/nper;
    }

    return (rate*pv)/(1-Math.pow(1+rate,-nper));

}

// 숫자 표시
function money(value){

    return Math.round(value).toLocaleString("ko-KR")+"원";

}

// 시작
loadProducts();
// =====================
// Part 2
// =====================

// 추가 버튼
document.getElementById("addBtn").addEventListener("click", addProduct);

// 제품 추가
function addProduct(){

    const product = products[productSelect.value];

    const qty = Number(qtyInput.value);

    if(qty<=0){
        alert("수량을 입력하세요.");
        return;
    }

    const total =
        product.price *
        qty *
        product.month;

    const payment =
        PMT(
            product.rate/100/12,
            product.month,
            total
        );

    // ★ 지원금 천원단위 버림
    const support =
        Math.floor((payment/1.1)/1000)*1000;

    contracts.push({

        name:product.name,
        qty:qty,
        total:total,
        payment:payment,
        support:support

    });

    drawContracts();

}

// 목록 출력
function drawContracts(){

    contractList.innerHTML="";

    let total=0;
    let payment=0;
    let support=0;

    contracts.forEach((item,index)=>{

        total+=item.total;
        payment+=item.payment;
        support+=item.support;

        contractList.innerHTML+=`

<tr>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${money(item.total)}</td>

<td>${money(item.payment)}</td>

<td>${money(item.support)}</td>

<td>

<button onclick="removeProduct(${index})">

삭제

</button>

</td>

</tr>

`;

    });

    totalPrice.innerHTML=money(total);
    monthlyPayment.innerHTML=money(payment);
    supportMoney.innerHTML=money(support);

}

// 삭제
function removeProduct(index){

    contracts.splice(index,1);

    drawContracts();

}