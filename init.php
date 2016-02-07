<?php
session_start();

//init database
require("libs/FluentPDO/FluentPDO.php");
$pdo = new PDO("mysql:host=176.10.154.200;dbname=eyeofsweden", "root", "reftec1234");
$fpdo = new FluentPDO($pdo);

//to get access inside functions
function db(){
	global $fpdo;
	return $fpdo;
}
function pdodb(){
	global $pdo;
	return $pdo;
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

/**
 * Get next video information
 * @TODO: returning only not seen videos - what if we run out of videos?
 * meybe not seen in latest
 * @return     boolean|array false if not video found, array if there is a next video
 */
function getNextVideo(){
	//sort
	asort($_SESSION['rating']);
	$favorites = array_slice($_SESSION['rating'],-3);//get 3 favorite tags
	//get next video
	$watchedIds = array_keys($_SESSION['history']);
	//create query
	$query = 'SELECT video_id, SUM(relevance) AS video_rel FROM video_tags ';//select video_id and counter of founded
	if(count($favorites)>0 || count($watchedIds)>0) $query.= 'WHERE ';
	if(count($favorites)>0) $query.= 'tag_id IN ('.implode(',',$favorites).') ';//check tags selected by user
	if(count($favorites)>0 and count($watchedIds)>0) $query.= 'AND ';
	if(count($watchedIds)>0) $query.= 'video_id NOT IN ('.implode(',',$watchedIds).') ';//check for not seen videos
	$query.= 'GROUP BY video_id ORDER BY video_rel DESC LIMIT 1';//order by relevance and limit to 1 row
	//pepare pdo query
	$stmt = pdodb()->prepare($query);
	//execute query
	$queryOk = $stmt->execute();
	//if db error - return false
	if(!$queryOk) return false;
	//fetch videos from result
	$videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
	//check if videos are not empty
	if(count($videos)>0){
		//get first video. fuck the rest
		$v = $videos[0];
		//save as watched with 0 score to not show again
		if(!isset($_SESSION['history'][$v['video_id']])){
			$_SESSION['history'][$v['video_id']] = 0;
		}
		//return video
		return $v;
	}else{
		//no videos found
		return false;
	}
}

function videoList($pdo){
	$query = $pdo->query("
		select v.id, v.link link, group_concat(t.title SEPARATOR ' ') tags
		from videos v
		  join video_tags vt on vt.video_id = v.id
		  join tags t on t.id = vt.tag_id
		group by v.id");

	if (!$query) {
		return;
	}

	return $query->fetchAll();
}







