<?php
//just init session to save user choices later on
session_start();
?>

<!DOCTYPE html>
<html>
<html ng-app="brightlabs">
<head>
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>
    <script src="angular.js"></script>
    <script src="angular-animate.min.js"></script>
    <script src="angular-smooth-scroll.min.js"></script>
    <script src="angular-route.js"></script>
    <script src="angular-animate.min.js"></script>
    <script src="angular-translate-2.2.0/angular-translate.js"></script>
    <script src="angular-translate.js"></script>
    <script src="controllers.js"></script>
    <script src="app.js"></script>
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>
<body>
<div id="fixed-mobile-background" class="hidden-md hidden-lg"></div>
<div class="main">
    <div growl></div>
    <div ng-view class="smooth"></div>
</div>
</body>
</html>
