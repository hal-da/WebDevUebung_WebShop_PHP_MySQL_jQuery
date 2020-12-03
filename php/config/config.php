<?php


include "View\View.php";
include "Models\ListInterface.php";
include "Models\ListProductTypes.php";
include "Models\ListProducts.php";
include "Models\ShoppingCart.php";
include "service\DB.php";
include "service\DbConnection.php";
include "Controller\ListController.php";

define ("DBImplementation", "mysql");
define("DBHost", "localhost");
define("DBName", "uebung3");
define("DBPassword", "");
define("DBUsername", "root");
define("possibleActions", ["listTypes", "listProductsByTypeId", "listCart", "addArticle", "removeArticle"]);