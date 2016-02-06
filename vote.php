<?php

require('init.php');

//set vote
if(isset($_POST['video_id']) && isset($_POST['rate'])){
	updateRating($_POST['videoId'],$_POST['rate']);
}