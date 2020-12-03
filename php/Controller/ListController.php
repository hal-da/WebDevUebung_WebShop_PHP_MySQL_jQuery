<?php

session_start();
//session_destroy();


class ListController
{
    private $view;
    private $action;
    private $productList;

    public function __construct()
    {
        $this->view = new View();
    }

    public function init(){
        $this->initAction();
        $this->initModel();
        $data = $this->productList->getFormattedData();
        $this->view->sendJsonView($data);
    }

    private function initAction(){
        if(isset($_GET['action'])){
            $this->action= filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING);
            if(in_array($this->action, possibleActions)){
                return true;
            } else {
                $this->view->sendError('possible typo in field action -possible values: "listTypes", "listProductsByTypeID", "listCart", "addArticle", "removeArticle"');
                die();
            }
        } else {
            $this->view->sendError('field action not set - possible values: listTypes or listProductsByTypeID in combination with typeId');
            die();
        }
    }

    private function initModel(){
        switch ($this->action){
            case 'listTypes':
                $this->productList = new ListProductTypes(null);
                break;
            case 'listProductsByTypeId':
                $typeId = $this->initTypeId('typeId');
                $this->productList = new ListProducts($typeId);
                if(!$this->validateTypeId($typeId)){
                    $this->view->sendError("product type does not exist");
                    die();
                }
                break;
            case 'addArticle':
                $this->removeOrAdd('add');
                die();
            case 'removeArticle':
                $this->removeOrAdd('remove');
                die();
            case 'listCart':
                if (!$_SESSION['cart']) {
                    $_SESSION['cart'] = [];
                }
                $cart = [];
                $cart['cart'] = $_SESSION['cart'];
                $this->view->sendJsonView($cart);
                die;
            default:
                $this->view->sendError('something went wrong');
                die();
        }
    }

    private function removeOrAdd($toDo){
        $cart = $_SESSION['cart'];
        $shoppingCart = new ShoppingCart();
        $id = $this->initTypeId('articleId');
        switch ($toDo){
            case 'add':
                if($shoppingCart->existsArticle($id)){
                    $cart = $shoppingCart->addToCart($cart, $id);
                } else{
                    $this->view->sendState('ERROR - Article does not exist');
                    die();
                }
                break;
            case 'remove':
                if($shoppingCart->existsInCart($cart, $id)){
                    $cart = $shoppingCart->removeFromCart($cart, $id);
                } else {
                    $this->view->sendState('ERROR - Item was not in ShoppingCart');
                    die();
                }
                break;
            default: $this->view->sendState('ERROR');
                die();
        }
        $_SESSION['cart']= $cart;
        $this->view->sendState('OK');
    }

    private function initTypeId($id)
    {
        if(isset($_GET[$id]) ) {
            return filter_input(INPUT_GET, $id, FILTER_SANITIZE_NUMBER_INT);
        }
        else {
            $this->view->sendError('field '. $id . 'not set');
            die();
        }
    }

    private function validateTypeId($typeId){
        $listLength =  $this->productList->getListLength();
        return (is_numeric($typeId) && $typeId <= $listLength && $typeId > 0);
    }
}