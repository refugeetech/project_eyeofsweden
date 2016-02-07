<?php

require("../init.php");

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
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Id</th>
                <th>Link</th>
                <th>Tags</th>
            </tr>
            </thead>
            <tbody>
            <?php
            $rows = videoList($pdo);
            foreach($rows as $row) {
            ?>
            <tr>
                <td><a href=""><?= $row['id'] ?></a></td>
                <td><a href=""><?= $row['link'] ?></a></td>
                <td><a href=""><?= $row['tags'] ?></a></td>
            </tr>
            <?php
            }
            ?>
            </tbody>
        </table>
    </div>
    <div class="col-md-1"></div>
</div>
</body>
</html>