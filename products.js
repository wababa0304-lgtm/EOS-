// =====================
// EOS 계약계산기(렌탈) 제품 데이터
// 계산식 최종.csv 기준
// =====================


const products = [

{
    name:"포스세트",
    monthly:45833.33,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"서브포스",
    monthly:45833.33,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"멀티패드",
    monthly:4583.34,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"테이블오더 후불",
    monthly:19800,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"테이블오더 선불",
    monthly:22000,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"플레이뷰",
    monthly:80208.33,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"키오스크",
    monthly:80208.33,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"CCTV",
    monthly:11000,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"서빙로봇",
    monthly:343750,
    month:48,
    rate:11.9,
    type:"normal"
},

{
    name:"수압식세척기",
    monthly:57291.6666666667,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"초음파세척기500",
    monthly:103125,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"초음파세척기600",
    monthly:114583.333333333,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"초음파세척기700",
    monthly:126041.666666667,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"초음파세척기800",
    monthly:137500,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"초음파세척기1000",
    monthly:160416.666666667,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"초음파세척기1200",
    monthly:183333.333333333,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"초음파세척기1500",
    monthly:217708.333333333,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"초음파세척기1800",
    monthly:252083.333333333,
    month:48,
    rate:13.9,
    type:"normal"
},


{
    name:"음식물처리기30",
    monthly:160416.666666667,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"음식물처리기50",
    monthly:252083.333333333,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"음식물처리기100",
    monthly:343750,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"음식물처리기150",
    monthly:412500,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"음식물처리기200",
    monthly:504166.666666667,
    month:48,
    rate:13.9,
    type:"normal"
},

{
    name:"인덕션솥밥",
    monthly:275,
    month:48,
    rate:17,
    type:"normal"
},

{
    name:"초음파튀김기45",
    monthly:91666.6666666667,
    month:48,
    rate:16,
    type:"normal"
},

{
    name:"초음파튀김기60",
    monthly:103125,
    month:48,
    rate:16,
    type:"normal"
}

];
products.forEach(product => {
    product.rate = 22;
});
