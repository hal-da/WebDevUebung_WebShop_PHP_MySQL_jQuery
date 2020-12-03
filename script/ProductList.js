class ProductList {
    constructor(url, action) {
        this.url = url;
        this.action = action;
        this.products = new ProductsById();
    }

    viewProductsById(url){
        this.products.initProductsById(url);
    }

    addToList(obj) {
        $.each(obj, (k, v) => {
            if (typeof (v) == "object") {
                v.productType = this.upperFirstCase(v.productType);
                this.generateLiItem(v.productType, v.url);
            }
        });
    }

    upperFirstCase(string){
        let upperFirstLetter = string[0].toUpperCase();
        return string.replace(string[0],upperFirstLetter);
    }

    generateLiItem(productType, url) {
        let idArr = url.split("=");
        let id = idArr[2];
        let listItem = `<li class="nav-item border-top ">
        <a class="nav-link productListItem" id="product${id}">${productType}</a>
            </li>`;
        $('#productList').append(listItem);

        this.bindProductsToProductList(id, url);
    }

    bindProductsToProductList(id, url){
        $(`#product${id}`).on('click', ()=> {
            $('.activeLink').removeClass('activeLink');
            $(`#product${id}`).addClass('activeLink');

            this.viewProductsById(url);
        });
    }

    initProductList() {
        $.ajax({
            url: this.url,
            method: "GET",
            data: { action: this.action },
            success: (response) => {
                this.addToList(response);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}