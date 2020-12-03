
class ProductsById {
    constructor() {
    };
    initProductsById(url) {
        $('.productName').remove();
        $.ajax({
            url: url,
            method: "GET",
            success: (response) => {
                this.addToList(response);
            },
            error: (error) => {
                console.log(error);
            }
        })
    };

    addToList(obj){
        $.each(obj, (k, v) => {
            const {length, price, id, name} = v;
            if(typeof (v) == 'object'){
                if(id && name){
                    this.generateListItem(id, name, price);
                }
                this.addToList(v);
            }

            if(k==='productType') {
                let upperFirstCase = this.upperFirstCase(v);
                $('#productCat').text(upperFirstCase);
            }

            if(length===0){
                $('#productsByCat').append('<tr class="border-bottom productName"><td colspan="4">sooooorry - out of stock, coming soon</td></tr>');
            }
        });
    };

    generateListItem(id, productName, price) {
        let svgShoppingCart = this.generateSVGwithId(id);
        let listItem = this.generateItemRow(productName,price,svgShoppingCart);
        $('#productsByCat').append(listItem);
        $(`#${id}`).on('click', () => {
            shoppingCart.connectShopppingCart('addArticle', id, productName);
        })
    };
    generateSVGwithId(id){
        return `<span class="svgIcon" id="${id}" data-toggle="modal" data-target="#stateModal"><svg focusable="false" data-prefix="fas" data-icon="cart"class="float-right d-inline" width="1.2em" height="1.2em" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"></path></svg></span>`;
    }

    generateItemRow(productName, price, svgShoppingCart){
    return `<tr class="border-bottom p-1 productName">
                <td class="border-0 ">${productName}</td>
                <td class="text-right  border-0">${Number(price).toFixed(2)} €</td>
                <td class="text-right  border-0">${svgShoppingCart}</td>
            </tr>`
    }

    upperFirstCase(string){
        let upperFirstLetter = string[0].toUpperCase();
        return string.replace(string[0],upperFirstLetter);
    };
}