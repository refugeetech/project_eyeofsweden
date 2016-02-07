<?php

require("../init.php");

function videoList($pdo){
    $query = $pdo->query("
		select v.id, v.link link, group_concat(t.title SEPARATOR ', ') tags
		from videos v
		  join video_tags vt on vt.video_id = v.id
		  join tags t on t.id = vt.tag_id
		group by v.id");

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
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Id</th>
                <th>Link</th>
                <th>Tags</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <?php
            $rows = videoList($pdo);
            foreach($rows as $row) {
            ?>
            <tr>
                <td><?= $row['id'] ?></td>
                <td><a href="<?= $row['link'] ?>" target="_blank"><?= $row['link'] ?></a></td>
                <td><?= $row['tags'] ?></a></td>
                <td><a href="edit.php?videoId=<?= $row['id'] ?>" class="btn btn-primary btn-sm active">Edit</a> <a href="admin/delete.php?videoId=<?= $row['id'] ?>" class="btn btn-danger btn-sm active">Delete</a></td>
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