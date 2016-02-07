<?php

require('init.php');

header('Content-Type: application/json');

$related = array();
for($i=0;$i<6;$i++){
	$related[] = getNextVideo(false);
}

$result = array(
	'result'=>'ok',
	'related'=>$related,
);

echo json_encode($result);