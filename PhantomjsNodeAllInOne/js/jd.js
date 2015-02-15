
function gatherJdDatail() {
    try {
        var domPrice = document.getElementById("jd-price"); //document.getElementById("jd-price");
        var price = "";
        //var info=document.getElementById("product-promotions")
        var type = 0;
        if (domPrice != null) {
            price = domPrice.innerText;
            type = 1;
        }
        var domName = document.querySelector("#name h1");
        var name = "";
        if (domName != null) {
            name = domName.innerText;
        }
        //图片
        var imageUrl = "";
        var domImageList = document.getElementById("spec-list");
        if (domImageList != null) {
            domImageList = domImageList.querySelectorAll("img");
            if (domImageList != null) {
                if (domImageList.length > 0) {
                    for (var i = 0, len = domImageList.length; i < len; i++) {
                        imageUrl += domImageList[i].src + "|";
                    }
                }
            }
        }

        return { type: type, price: price, name: name, url: window.location.pathname, imageUrl: imageUrl }
    } catch (e) {
        return { type: "", price: "", name: "", url: "", imageUrl: "" };
    }


}