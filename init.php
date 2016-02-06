<?php
session_start();

//init database
require("libs/FluentPDO/FluentPDO.php");
$pdo = new PDO("mysql:dbname=challange4", "root", "reftec1234");
$fpdo = new FluentPDO($pdo);

//to get access inside functions
function db(){
	global $fpdo;
	return $fpdo;
}

//prepare session places
if(!isset($_SESSION['rating'])) $_SESSION['rating'] = array();
if(!isset($_SESSION['rates'])) $_SESSION['rates'] = array();


function updateRating($videoId,$rating){
	$rating = (int)$rating;
	//add to history
	$_SESSION['rates'][$videoId] = $rating;
	//get video tags
	$videoTags = db()->from('video_tags')->where('video = ?',$videoId)->fetchAll();
	foreach($videoTags as $videoTag){
		if(!isset($_SESSION['rating'][$videoTag['tag_id']])){
			//set a new
			$_SESSION['rating'][$videoTag['tag_id']] = 0;
		}
		//update
		$_SESSION['rating'][$videoTag['tag_id']] += $rating*$videoTag['relevance'];
	}
	//get next video
	
}



