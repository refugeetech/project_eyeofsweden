<?php

require('init.php');

header('Content-Type: application/json');

$related = getNextVideo(false,6);
if(is_array($related)){
	foreach($related as $rk=>$rv){
		$related[$rk]['title'] = 'title'.$rv['id'];
	}
}

$result = array(
	'result'=>'ok',
	'related'=>$related,
);

echo json_encode($result);