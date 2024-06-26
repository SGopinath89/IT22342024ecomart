//GLOBALS
var products= JSON.parse(localStorage.getItem('cart'));
var cartItems=[];
var cart_n = document.getElementById('cart_n')
var table= document.getElementById('table')
var total=0;

//HTML
function tableHTML(i) {
    return `
        <tr>
           <th scope="row"> ${i+1}</th>
           <th><img style="width:90px;" src="${products[i].url}"></th>
           <td>${products[i].name}</td>
           <td>1</td>
           <td>${products[i].price}</td> 
        </tr>
`;
}

//clean
function clean() {
    localStorage.clear();
    for(let index = 0; index < products.length; index++){
        table.innerHTML+= tableHTML(index);
        total=total+parseInt(products[index].price)
    }
    total=0;
    table.innerHTML=`
    <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    </tr>
    `;
    cart_n.innerHTML='';
    document.getElementById("btnBuy").style.display="none";
    document.getElementById("btnClean").style.display="none";

}


(()=>{
for(let index=0;index<products.length;index++){
    table.innerHTML+=tableHTML(index);
    total=total+parseInt(products[index].price);
}
table.innerHTML+=`
  <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">Total :$${total}}.00</th>
  </tr>

<tr>
<th scope="col"></th>
<th scope="col"></th>
<th scope="col"></th>
<th scope="col">
    <button id="btnClean" onClick="clean()" class="btn text-white btn-warning">
        Clean Shopping Cart
    </button>
</th>

<th scope="col">
<form id="form1" action="/cart" method="POST" autocomplete="off">
     <input type="hidden" name="Total" value="${Total}">
     <input type="hidden" name="_id" value="">
     <button id="submitbtn" class="btn btn-success">Buy</button>
</form>
</th>
</tr>
`;

products=JSON.parse(localStorage.getItem('cart'));
cart_n.innerHTML=`[${products.length}]`;
})();
var form=document.getElementById('form1');
document.getElementById('submitbtn').addEventListener('Click',()=>{
    localStorage.clear();
    setTimeout(()=>{
        Sub();
 },50000);
 });
function sub() {
    setTimeout(()=>{
    form.onsubmit();
},5000);
}
  

