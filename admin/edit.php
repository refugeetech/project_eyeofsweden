<?php

    require("../init.php");

    function getVideo($pdo){
        $videoId = $_GET['videoId'];
        if (!$videoId) {
            return;
        }

        $query = $pdo->query("
            select v.id, v.link, t.id, t.title from videos v
            JOIN video_tags vt on vt.video_id = v.id
            JOIN tags t on t.id = vt.tag_id
            where v.id = "+ $videoId);

        if (!$query) {
            return;
        }

        return $query->fetchAll();
    }


    function getTags($pdo){
        $videoId = $_GET['videoId'];
        if (!$videoId) {
            return;
        }

        $query = $pdo->query("
            select v.id videoId, t.id tagId, t.title from videos v
            JOIN video_tags vt on vt.video_id = v.id
            JOIN tags t on t.id = vt.tag_id
            where v.id = "+ $videoId);

        if (!$query) {
            return;
        }

        return $query->fetchAll();
    }

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
        <?php
        $rows = getTags($pdo);

        foreach($rows as $row) {
        ?>
        <form class="form-inline">
            <input type="hidden" id="videoId" value="<?= $row['videoId'] ?>">
            <input type="hidden" id="tagId" value="<?= $row['tagId'] ?>">
            <div class="form-group">
                <label class="sr-only" for="videoTag">Tag</label>
                <input type="text" class="form-control" id="videoTag" placeholder="Tag">
            </div>
            <button type="submit" class="btn btn-default">Update</button>
            <button type="submit" class="btn btn-danger">Delete</button>
        </form>
        <?php
        }
        ?>
    </div>
    <div class="col-md-1"></div>
</div>
</body>
</html>