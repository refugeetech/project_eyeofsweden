CREATE TABLE tags
(
    id INT(11) PRIMARY KEY NOT NULL,
    title VARCHAR(100),
    icon VARCHAR(100),
    `order` INT(11) DEFAULT '0'
);
CREATE TABLE video_tags
(
    video_id INT(11),
    tag_id INT(11),
    relevance VARCHAR(255) DEFAULT '1' NOT NULL
);
CREATE TABLE videos
(
    id INT(11) PRIMARY KEY NOT NULL,
    link TEXT
);