<?php


class ListProducts implements ListInterface
{
    private $stmt = 'SELECT t.name AS productTypeName, p.name AS productName, p.id AS productId, p.price_of_sale AS price FROM product_types t JOIN products p  ON t.id = p.id_product_types WHERE t.id=?';
    private $id;
    private $dbConnection;

    public function __construct($id)
    {
        $this->dbConnection =  new DbConnection();
        $this->id = $id;
    }

    private function getDataFromDB()
    {
        return $this->dbConnection->getData($this->stmt, [$this->id]);
    }



    public function getFormattedData()
    {
        $productTypeName = $this->getProductTypeName();
        $rawData = $this->getDataFromDB();
        $products= [];
        foreach ($rawData as $row){
            $products[] = array("name"=>$row["productName"], "id"=>$row['productId'], "price"=>$row['price']);
        }

        $formattedData = new stdClass();
        $formattedData->productType = $productTypeName;
        $formattedData->products = $products;
        $formattedData->url = $this->generateUrl();

        return $formattedData;
    }

    private function generateUrl(){
        return 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'] . "?action=listTypes";
    }




    private function getProductTypeName(){
        $stmt = 'SELECT name FROM product_types WHERE id= ?';
        $data = $this->dbConnection->getData($stmt,[$this->id]);
        return $data[0]["name"];
    }

    public function getListLength(){
        $stmt = 'SELECT count(*) AS cnt FROM product_types ';
        $listLengthArr = $this->dbConnection->getData($stmt, null);
        return $listLengthArr[0]['cnt'];
    }
}