<?php

require('init.php');
header('Content-Type: application/json');

$result = array(
	'result'=>'ok',
);

//set vote
if(isset($_POST['video_id']) && isset($_POST['rate'])){
	$result['updated'] = updateRating($_POST['video_id'],$_POST['rate']);
}

//get next video
$result['video'] = getNextVideo();
if($result['video']){
	$result['video']['title'] = 'test'.$result['video']['id'];
}

//show response
echo json_encode($result);