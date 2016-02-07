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
	$videoTags = db()->from('video_tags')->where('video_id = ?',$videoId)->fetchAll();
	if(is_array($videoTags)){
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
	return false;
}

/**
 * Get next video information
 * @TODO: returning only not seen videos - what if we run out of videos?
 * meybe not seen in latest
 * @return     boolean|array false if not video found, array if there is a next video
 */
function getNextVideo($markedAsWatched=true,$howMany=1){
	//sort
	asort($_SESSION['rating']);
	//latest 3
	$favorites = array();
	foreach(array_slice($_SESSION['rating'],-3) as $favKey=>$favValue){
		$favorites[] = str_replace('tag', '', $favKey);
	}
	//get next video
	$watchedIds = array_keys($_SESSION['history']);
	//create query
	$query = 'SELECT video_id, SUM(relevance) AS video_rel FROM video_tags ';//select video_id and counter of founded
	if(count($favorites)>0 || count($watchedIds)>0) $query.= 'WHERE ';
	if(count($favorites)>0) $query.= 'tag_id IN ('.implode(',',$favorites).') ';//check tags selected by user
	if(count($favorites)>0 and count($watchedIds)>0) $query.= 'AND ';
	if(count($watchedIds)>0) $query.= 'video_id NOT IN ('.implode(',',$watchedIds).') ';//check for not seen videos
	$query.= 'GROUP BY video_id ORDER BY video_rel DESC LIMIT '.$howMany;//order by relevance and limit to 1 row
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
		$result = array();
		foreach($videos as $videoItem){
			//get first video. fuck the rest
			$v = db()->from('videos',$videoItem['video_id'])->fetch();
			//save as watched with 0 score to not show again
			if($markedAsWatched && !isset($_SESSION['history'][$v['id']])){
				$_SESSION['history'][$v['id']] = 0;
			}
			$result[] = $v;
		}
		//return video
		return ($howMany===1) ? $v : $result;
	}else{
		//no videos found
		return false;
	}
}
