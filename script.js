// =====================
// EOS 계약계산기
// script.js
// 업셀 합산 + 지원금 합산 후 버림 최종
// =====================


const productSelect = document.getElementById("productSelect");
const qtyInput = document.getElementById("qty");
const contractList = document.getElementById("contractList");

const totalPrice = document.getElementById("totalPrice");
const monthlyPayment = document.getElementById("monthlyPayment");
const supportMoney = document.getElementById("supportMoney");

const originPrice = document.getElementById("originPrice");
const customPrice = document.getElementById("customPrice");

const upsellInput = document.getElementById("upsell");
const discountInput = document.getElementById("discount");


let contracts = [];


// 제품 목록 생성

function loadProducts(){

    productSelect.innerHTML = "";

    products.forEach((product,index)=>{

        const option = document.createElement("option");

        option.value = index;

        option.textContent = product.name;

        productSelect.appendChild(option);

    });

    showPrice();

}



// 선택 제품 표시

function showPrice(){

    const product = products[productSelect.value];

    if(product){

        originPrice.innerHTML =
            product.monthly.toLocaleString()
            + "원";

    }

}


productSelect.addEventListener(
    "change",
    showPrice
);




// PMT 계산

function PMT(rate,nper,pv){

    if(rate === 0){

        return pv / nper;

    }


    return (
        rate * pv
    )
    /
    (
        1 - Math.pow(1+rate,-nper)
    );

}




// 금액 표시

function money(value){

    return Math.round(value)
    .toLocaleString("ko-KR")
    + "원";

}




// 추가 버튼

document
.getElementById("addBtn")
.addEventListener(
    "click",
    addProduct
);




function addProduct(){


    const product =
        products[productSelect.value];


    const qty =
        Number(qtyInput.value);



    if(qty <= 0){

        alert("수량을 입력하세요.");

        return;

    }




    // 월 사용료

    let monthly =
        product.monthly;




    // 월 사용료 조정

    if(customPrice.value){

        monthly =
            Number(customPrice.value);

    }




    // 업셀

    let upsell = 0;


    if(upsellInput.value){

        upsell =
            Number(upsellInput.value);

    }




    // 할인

    let discount = 0;


    if(discountInput.value){

        discount =
            Number(discountInput.value);

    }




    // 제품 원금

    let productAmount =
        monthly *
        product.month *
        qty;




    // 최종 판매금액

    let totalAmount =
        productAmount
        + upsell
        - discount;



    if(totalAmount < 0){

        totalAmount = 0;

    }




    // 월 납입금

    const payment =
        PMT(
            product.rate / 100 / 12,
            product.month,
            totalAmount
        );





    // 지원금 원본 저장 (여기서 버림하지 않음)

    const support =
        payment / 1.1;





    contracts.push({

        name: product.name,

        qty: qty,

        total: totalAmount,

        payment: payment,

        support: support

    });




    drawContracts();




    // 입력 초기화

    upsellInput.value = 0;

    discountInput.value = 0;

    customPrice.value = "";

}





// 계약 목록 출력

function drawContracts(){


    contractList.innerHTML = "";


    let total = 0;

    let payment = 0;

    let support = 0;




    contracts.forEach((item,index)=>{


        total += item.total;

        payment += item.payment;

        support += item.support;




        contractList.innerHTML += `

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




    // ★ 최종 합산 후 천원단위 버림

    support =
        Math.floor(support / 1000)
        * 1000;




    totalPrice.innerHTML =
        money(total);


    monthlyPayment.innerHTML =
        money(payment);


    supportMoney.innerHTML =
        money(support);



}





// 삭제

function removeProduct(index){

    contracts.splice(index,1);

    drawContracts();

}





// 시작

loadProducts();
