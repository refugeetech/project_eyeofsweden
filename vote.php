<?php

require('init.php');

//set vote
if(isset($_POST['video_id']) && isset($_POST['rate'])){
	$_SESSION[ $_POST['video_id'] ] = $_POST['rate'];
}

var_dump(getNextVideo());