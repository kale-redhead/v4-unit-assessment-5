insert into helo_users
(username, password, profile_pic)
values
('redhead', 'carrot', 'https://i.pinimg.com/originals/f1/c3/ec/f1c3ecd3292b60753bbae321600e0cc6.png')
returning *;

