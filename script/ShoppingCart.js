const checkoutButton = `<button type="button" id="checkoutButton" class="btn btn-outline-danger mt-3 mb-5 float-right">checkout</button>`
let sumAllArticles = 0;

class ShoppingCart {
    constructor(url) {
        this.url = url;
    };

    connectShopppingCart(action, id, articleName) {
        $.ajax({
            url: this.url,
            method: "GET",
            data: {action: action, articleId: id},
            success: (response) => {
                $('.cartList').remove();
                this.displayResponse(response, articleName, action);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    displayResponse(response, articleName, action){
        const {cart, state} = response;
        if(state){
            this.displayModal(response, articleName, action);
        }
        if(cart){
            this.displayCart(response);
        }
    }

    displayModal(response, articleName, action){
        $('#removeModal').remove();
        let modalResponse = this.generateModal(response, articleName, action);
        $('#stateModal').append(modalResponse).modal('show');
        $('#modalButton').on('click', ()=>{
            $('#stateModal').modal('hide');
        })
        this.connectShopppingCart('listCart', null);
    }

    displayCart(response){
        if(response.cart){
            sumAllArticles = 0;
            $('.articleRows').remove();
            $('#checkoutButton').remove();
            response.cart.forEach(product =>{
                let articleRow = this.generateCartRow(product);
                $('#articleTable').append(articleRow);
                const {id, articleName} = product;
                this.generateEventHandler(id, articleName);
            });
            let lastRow = this.generateLastCartRow();
            $('#articleTable').append(lastRow);
            $('#addButton').append(checkoutButton);
        }
    }

    generateEventHandler(id, productName){
        $(`#addArticle${id}`).on('click', ()=>{
            this.connectShopppingCart('addArticle', id, productName);
        });
        $(`#removeArticle${id}`).on('click', ()=>{
            this.connectShopppingCart('removeArticle', id, productName);
        });
    }

    generateCartRow(article){
        const {price, articleName, id, quantity} = article;
        let articleSum = (quantity * price);
        sumAllArticles += articleSum;
        let svgPlus = this.generateSVGaddItem(id);
        let svgMinus = this.generateSVGremoveItem(id);
        return `<tr class="border-bottom articleRows">
                            <td class="border-0 ">${svgPlus}  ${svgMinus} </td>
                            <td class="border-0 border-bottom">${articleName}</td>
                            <td class="text-right border-0 ">${quantity}x</td>
                            <td class="text-right border-0 ">${Number(price).toFixed(2)} €</td>
                            <td class="text-right border-0 ">${Number(articleSum).toFixed(2)} €</td>
                        </tr>`
    }

    generateLastCartRow(){
        return `<tr class="articleRows">
                    <td colspan="4" class="text-right border-0 border-bottom-1">Total</td>
                    <td class="text-right border-0 border-bottom-1">${sumAllArticles.toFixed(2)} €</td>
                </tr>`
    }

    generateSVGaddItem(id){
        return `<span class="svgIcon" id="addArticle${id}"><svg  class="mr-1" focusable="false" data-prefix="far" data-icon="plus-square" width="1.2em" height="1.2em"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg></span>`;
    }
    generateSVGremoveItem(id){
        return `<span class="svgIcon" id="removeArticle${id}"><svg focusable="false" data-prefix="far" data-icon="minus-square" height="1.2em" width="1.2em"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M108 284c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v32c0 6.6-5.4 12-12 12H108zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg></span>`;
    }

    generateModal(response, articleName, action){
        let header, body;

        if(response.state === 'OK'){
            header = 'Success';
            if(action==='addArticle'){
                body = `<b>${articleName}</b> was added to your cart`;
            } else if(action==='removeArticle'){
                body = `<b>${articleName}</b> was removed from your cart`;
            }
        }else{
            header = 'Fail';
            body = `<b>${articleName}</b> was not added to your cart`;
        }

        return `
            <div class="modal-dialog modal-lg" id="removeModal">
                <div class="modal-content">
                    <div class="modal-header" id="modalHeader">
                        ${header}
                    </div>
                    <div class="modal-body" id="modalBody">
                        ${body}
                    </div>
                    <div class="modal-footer" id="modalFooter">
                        <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal" id="modalButton">close</button>
                    </div>
                </div>
            </div>`;
    }
}