<?php

require('init.php');
header('Content-Type: application/json');

$result = array(
	'result'=>'ok',
);

//set vote
$req = isset($_GET['video_id']) ? $_GET : $_POST;
if(isset($req['video_id']) && isset($req['rate'])){
	$result['updated'] = updateRating($req['video_id'],$_POST['rate']);
}

//get next video
$result['video'] = getNextVideo(true,1);
if($result['video']){
	$result['video']['title'] = 'test'.$result['video']['id'];
	$videoTagsIds = array_keys(db()->from('video_tags')->where('video_id = ?',$result['video']['id'])->fetchAll('tag_id'));
	$result['video']['tags'] = db()->from('tags')->where('id',$videoTagsIds)->fetchAll();
}

//show response
echo json_encode($result);