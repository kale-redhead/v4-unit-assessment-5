create table helo_users(
    id serial primary key,
    username varchar(20) not null,
    password varchar(20) not null,
    profile_pic text
);

create table helo_posts(
    id serial primary key,
    title varchar(45) not null,
    content text,
    img text,
    author_id integer references helo_users (id),
    date_created timestamp 
);