    const productList = new ProductList('php/index.php', 'listTypes');
    const shoppingCart = new ShoppingCart('php/index.php');
    productList.initProductList();
    shoppingCart.connectShopppingCart('listCart', null);
