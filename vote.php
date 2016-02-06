<?php

require("libs/FluentPDO/FluentPDO.php");
$pdo = new PDO("mysql:dbname=challange4", "root", "reftec1234");
$fpdo = new FluentPDO($pdo);