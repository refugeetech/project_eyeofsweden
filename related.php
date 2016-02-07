<?php

require('init.php');

header('Content-Type: application/json');

$related = getNextVideo(false,6);

$result = array(
	'result'=>'ok',
	'related'=>$related,
);

echo json_encode($result);