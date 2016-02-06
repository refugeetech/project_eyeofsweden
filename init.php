<?php
session_start();

//init database
require("libs/FluentPDO/FluentPDO.php");
$pdo = new PDO("mysql:host=176.10.154.200;dbname=challange4", "root", "reftec1234");
$fpdo = new FluentPDO($pdo);

//to get access inside functions
function db(){
	global $fpdo;
	return $fpdo;
}

//prepare session places
if(!isset($_SESSION['rating'])) $_SESSION['rating'] = array();
if(!isset($_SESSION['history'])) $_SESSION['history'] = array();


function updateRating($videoId,$rating){
	$rating = (int)$rating;
	//add to history
	$_SESSION['history'][$videoId] = $rating;
	//get video tags
	$videoTags = db()->from('video_tags')->where('video = ?',$videoId)->fetchAll();
	foreach($videoTags as $videoTag){
		if(!isset($_SESSION['rating']['tag'.$videoTag['tag_id']])){
			//set a new
			$_SESSION['rating']['tag'.$videoTag['tag_id']] = 0;
		}
		//update
		$_SESSION['rating']['tag'.$videoTag['tag_id']] += ((int)$rating*$videoTag['relevance']);
	}
	return true;
}


function getNextVideo(){
	//sort
	asort($_SESSION['rating']);
	$favorites = array_slice($_SESSION['rating'],-3);//get 3 favorite tags
	//get next video
	$watchedIds = array_keys($_SESSION['history']);
	$videos = db()->from('video_tags')
		->where('tags',$favorites) //check tags
		->where('id NOT IN (:id)',array(':id'=>implode(', ',$watchedIds)))
		->limit(10)
		->fetchAll();
	//return video
	if(count($videos)>0){
		//get first, fuck the rest
		return db()->from('videos',$videos[0]['video_id'])->fetch();
	}else{
		return false;
	}
}







