<?php
session_start();

//init database
require("libs/FluentPDO/FluentPDO.php");
$pdo = new PDO("mysql:dbname=challange4", "root", "reftec1234");
$fpdo = new FluentPDO($pdo);

//prepare session place
if(!isset($_SESSION['choices'])){
	$_SESSION['choices'] = array();
}

//set vote
$_SESSION[ $_POST['video_id'] ] = $_POST['rate'];