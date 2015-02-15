
function gatherJdDatail() {
    var domPrice = document.getElementById("jd-price");//document.getElementById("jd-price");
    var price = "";
    //var info=document.getElementById("product-promotions")
    var type = 0;
    if (domPrice!=null) {
        price = domPrice.innerText();
        type = 1;
    }
    var domName = document.querySelector("#name h1");
    var name = "";
    if (domName!=null) {
        name = domName.innerText();
    }
    //ͼƬ
    //var domImageListContainer = document.getElementById('spec-list');
    //if (domImageListContainer != null) {
    //    var liCollection=domImageListContainer.querySelectorAll("div ul li");
    //}
    
    return { type: type, price: price, name: name, url: window.location.pathname }
}