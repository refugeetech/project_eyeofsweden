<?php

require('init.php');
header('Content-Type: application/json');

$result = array(
	'result'=>'ok',
);

//set vote
if(isset($_POST['video_id']) && isset($_POST['rate'])){
	$result['updated'] = updateRating($_POST['videoId'],$_POST['rate']);
}

//get next video
$result['video'] = getNextVideo();

//show response
echo json_encode($result);