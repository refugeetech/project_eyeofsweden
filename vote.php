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
$result['video'] = getNextVideo();
if($result['video']){
	$result['video']['title'] = 'test'.$result['video']['id'];
}

//show response
echo json_encode($result);