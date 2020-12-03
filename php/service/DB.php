<?php


class DB
{
    private $pdo;

    public function __construct($databaseImplementation, $dbUrl, $dbName, $dbUserName, $dbPassword)
    {
        try {
            $this->pdo = new PDO("$databaseImplementation:host=$dbUrl;dbname=$dbName; charset=utf8", $dbUserName, $dbPassword);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            error_log( 'Connection Error:' . $e->getMessage());
        }
    }

    public function getData($stmt, $id){
        $query = $this->pdo->prepare($stmt);
        $query->execute($id);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}