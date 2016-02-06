<?php

require('init.php');

//set vote
if(isset($_POST['video_id']) && isset($_POST['rate'])){
	$result = updateRating($_POST['videoId'],$_POST['rate']);
	echo ($result) ? '1' : '0';
}