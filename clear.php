<?php
session_start();
$_SESSION['rates'] = array();
$_SESSION['history'] = array();
echo 'history cleared.';