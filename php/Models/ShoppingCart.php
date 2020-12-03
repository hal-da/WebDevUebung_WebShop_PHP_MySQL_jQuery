<?php

class ShoppingCart
{
    private $dBConn;
    private $stmt = 'SELECT name AS productName, price_of_sale as price, id AS productId FROM products WHERE id =?';

    public function __construct()
    {
        $this->dBConn = new DbConnection();
    }

    private function getArticleFromDB($id){
        $articleArr = $this->dBConn->getData($this->stmt,[$id]);
        $article = new stdClass();
        $article->articleName = $articleArr[0]['productName'];
        $article->price = $articleArr[0]['price'];
        $article->id = $articleArr[0]['productId'];
        $article->quantity = 1;

        return $article;
    }

    public function addToCart($cart, $id){
        foreach ($cart as $item){
            if($item->id == $id){
                $item->quantity++;
                return $cart;
            }
        }
        $cart[] = $this->getArticleFromDB($id);
        return $cart;
    }

    public function removeFromCart($cart, $id){
        foreach ($cart as $key => $article){
            if($article->id == $id){
                $article->quantity--;
                if ($article->quantity === 0){
                    unset($cart[$key]);
                }
                return array_values($cart); //double return statement only for performance
            }
        }
        return array_values($cart);
    }

    public function existsArticle($id){
        $stmt = 'SELECT EXISTS(SELECT 1 FROM products WHERE ID = ?) AS exist';
        $existsArr = $this->dBConn->getData($stmt, [$id]);
        return $existsArr[0]['exist'];
    }

    public function existsInCart($cart, $id){
        return (in_array($id, array_column($cart, 'id')));
    }
}