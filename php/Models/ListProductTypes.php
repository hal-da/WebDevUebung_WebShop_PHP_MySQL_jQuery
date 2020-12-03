<?php


class ListProductTypes implements ListInterface
{

    private $stmt = 'SELECT id, name FROM product_types ORDER BY name';
    private $dbConnection;

    public function __construct($id)
    {
        $this->dbConnection =  new DbConnection();

    }

    private function getDataFromDB()
    {
        return $this->dbConnection->getData($this->stmt, null);
    }

    public function getFormattedData()
    {
        $rawData = $this->getDataFromDB();
        $formattedData = [];
        foreach ($rawData as $row){
            $formattedData[] = array("productType"=>$row["name"],"url"=>$this->generateUrl($row["id"]));
        }
        return $formattedData;
    }
    private function generateUrl($id){
        return 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'] . "?action=listProductsByTypeId&typeId=".$id;
    }
}