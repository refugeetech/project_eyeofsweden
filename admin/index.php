<?php

require("libs/FluentPDO/FluentPDO.php");
$pdo = new PDO("mysql:host=176.10.154.200;dbname=eyeofsweden", "root", "reftec1234");
$fpdo = new FluentPDO($pdo);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Page</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>
<body>
<div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-10">
        <table class="table table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Link</th>
                <th>Tags</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-1"></div>
</div>
</body>
</html>