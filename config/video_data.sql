
insert into tags (title) values ('people');
insert into tags (title) values ('hospital');
insert into tags (title) values ('gaming');
insert into tags (title) values ('general');
insert into tags (title) values ('consultant');
insert into tags (title) values ('phd');
insert into tags (title) values ('swedish');
insert into tags (title) values ('healthcare');
insert into tags (title) values ('school');
insert into tags (title) values ('nurse');
insert into tags (title) values ('health');
insert into tags (title) values ('everyday');
insert into tags (title) values ('doctor');
insert into tags (title) values ('university');
insert into tags (title) values ('3d');
insert into tags (title) values ('jobs');
insert into tags (title) values ('radiology');
insert into tags (title) values ('student');
insert into tags (title) values ('teaching');
insert into tags (title) values ('nursing');
insert into tags (title) values ('language');
insert into tags (title) values ('technology');
insert into tags (title) values ('doctoral');
insert into tags (title) values ('games');
insert into tags (title) values ('study');
insert into tags (title) values ('education');
insert into tags (title) values ('lifestyle');
insert into tags (title) values ('career');
insert into tags (title) values ('telecom');

insert into videos (link) values ('https://www.youtube.com/embed/nPJm6Hbtwrg');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'phd');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'university');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'doctoral');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'education');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'doctor');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'student');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/mhxcpaJE_j4');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'education');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'school');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'everyday');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/FofjbSdsgq4');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'education');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'teaching');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'school');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'teaching');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/ImytBfwJbkA');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'education');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'student');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'school');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'university');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/yfpxTCGO4PY');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'education');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'teaching');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'school');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/FBz89wMTfZg');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'nursing');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'nurse');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'healthcare');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'health');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/JGykf6seYSU');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'health');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'nurse');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'nursing');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/Ca376aTNLTU');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'health');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'hospital');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/qc5YYEi7d0c');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'health');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'hospital');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/9X90X22d3UA');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'health');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'hospital');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'radiology');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/waQ0XDg1kSg');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'health');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'hospital');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'radiology');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/Uta6C-kY4SE');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'technology');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like '3d');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'gaming');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'games');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/Zkbytj80s80');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'technology');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'telecom');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/X4AmEC5NB0c');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'technology');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like '3d');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'gaming');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'games');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/EMCUgaoy8vc');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'general');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'people');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'lifestyle');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/IaW4uCHBNkE');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'general');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'career');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'jobs');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'consultant');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);


insert into videos (link) values ('https://www.youtube.com/embed/Kt92JsWtwBo');
SET @video_id=(select max(id) from videos);
SET @tag_id=(select id from tags where title like 'general');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'education');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'career');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'jobs');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
SET @tag_id=(select id from tags where title like 'study');
insert into video_tags (video_id, tag_id) values (@video_id, @tag_id);
