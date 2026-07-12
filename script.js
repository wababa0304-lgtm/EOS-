// =====================
// EOS 계약계산기
// script.js
// 업셀 합산 + 지원금 합산 후 버림 + 계약저장 최종
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

const savedList = document.getElementById("savedList");


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




// 제품 추가

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




    let monthly =
    product.monthly;



    if(customPrice.value){

        monthly =
        Number(customPrice.value);

    }




    let upsell = 0;


    if(upsellInput.value){

        upsell =
        Number(upsellInput.value);

    }




    let discount = 0;


    if(discountInput.value){

        discount =
        Number(discountInput.value);

    }




    let productAmount =
    monthly *
    product.month *
    qty;



    let totalAmount =
    productAmount
    + upsell
    - discount;



    if(totalAmount < 0){

        totalAmount = 0;

    }




    const payment =
    PMT(
        product.rate / 100 / 12,
        product.month,
        totalAmount
    );




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





// =====================
// 저장 기능
// =====================


document
.getElementById("saveBtn")
.addEventListener(
"click",
saveContract
);



function saveContract(){


    const data = {


        id: Date.now(),


        date:
        new Date()
        .toLocaleDateString("ko-KR"),


        company:
        document.getElementById("company").value
        || "미입력",


        owner:
        document.getElementById("owner").value,


        manager:
        document.getElementById("manager").value,


        contracts: contracts,


        total:
        totalPrice.innerText,


        monthly:
        monthlyPayment.innerText,


        support:
        supportMoney.innerText


    };




    let saved =
    JSON.parse(
        localStorage.getItem("eosSaved")
    )
    || [];



    saved.push(data);



    localStorage.setItem(
        "eosSaved",
        JSON.stringify(saved)
    );



    alert("저장되었습니다.");

    drawSaved();

}





// 저장 목록 표시

function drawSaved(){


    if(!savedList) return;


    savedList.innerHTML = "";


    let saved =
    JSON.parse(
        localStorage.getItem("eosSaved")
    )
    || [];



    saved.forEach(item=>{


        savedList.innerHTML += `

<tr>

<td>${item.company}</td>

<td>${item.date}</td>

<td>${item.total}</td>

<td>${item.monthly}</td>

<td>

<button onclick="loadContract(${item.id})">
불러오기
</button>


<button onclick="deleteContract(${item.id})">
삭제
</button>

</td>

</tr>

`;

    });


}





// 불러오기

function loadContract(id){


    let saved =
    JSON.parse(
        localStorage.getItem("eosSaved")
    )
    || [];



    const data =
    saved.find(
        item=>item.id===id
    );



    if(!data) return;



    document.getElementById("company").value =
    data.company;


    document.getElementById("owner").value =
    data.owner;


    document.getElementById("manager").value =
    data.manager;



    contracts =
    data.contracts;



    drawContracts();


    alert("불러오기 완료");

}





// 저장 삭제

function deleteContract(id){


    let saved =
    JSON.parse(
        localStorage.getItem("eosSaved")
    )
    || [];



    saved =
    saved.filter(
        item=>item.id!==id
    );



    localStorage.setItem(
        "eosSaved",
        JSON.stringify(saved)
    );



    drawSaved();

}





// 시작

loadProducts();

drawSaved();
