
create database if not exists  THE4TMUSIC 
character set utf8mb4
collate utf8mb4_unicode_ci;

use THE4TMUSIC ; 
-- 1-------------------------------------------------------------------
-- --------------              Bảng User            -------------------
-- --------------------------------------------------------------------
create table User (
user_id int auto_increment primary key, 
user_name varchar(50) not null unique , 
user_date_of_birth date not null,
user_account varchar(100) not null,
user_password varchar(100) not null ,
user_language varchar(20) not null  default 'english',
avatar_url text default null,
role enum('admin' , 'user' , 'artist') default 'user' , 
status enum('active','banned') default 'active',
user_email varchar(150), 
is_email_verified bool default false,
created_at timestamp default current_timestamp
); 
-- 2-------------------------------------------------------------------
-- --------------              Bảng Artist           ------------------
-- --------------------------------------------------------------------
create table Artist (
artist_id int auto_increment primary key, 
artist_name varchar(150) not null unique,
artist_birth date default '2001/01/01',
follower int default 0
);
-- 3-------------------------------------------------------------------
-- --------------              Bảng Playlist        -------------------
-- --------------------------------------------------------------------
create table Playlist (
playlist_id int auto_increment primary key, 
playlist_name varchar(150),
playlist_description text ,
created_at timestamp default current_timestamp,
user_id int,
foreign key (user_id) references User(user_id)

); 
-- 4-------------------------------------------------------------------
-- --------------              Bảng Album           -------------------
-- --------------------------------------------------------------------
create table Album (
album_id int auto_increment primary key, 
album_name varchar(50) default 'Unnamed Album',
artist_id int,
foreign key (artist_id) references Artist(artist_id)
);
-- 5-------------------------------------------------------------------
-- --------------              Bảng Song           -------------------
-- --------------------------------------------------------------------
create table Song (
song_name varchar(100) not null default 'ECNHQ',
song_id int auto_increment primary key, 
release_date date not null default '2001/01/01',
duration int not null default 0,
likes int default 0,
shares int default 0,
comments int default 0,
album_id int ,
foreign key (album_id) references Album(album_id),
artist_id int,
foreign key (artist_id) references Artist(artist_id)
);
-- 6--------------------------------------------------------------------
-- ---------------        bảng relation song-playlist     --------------
-- ---------------------------------------------------------------------
create table Playlist_song (
song_id int ,
playlist_id int ,
primary key (song_id , playlist_id), 
foreign key (playlist_id) references Playlist(playlist_id) on delete cascade,
foreign key (song_id) references Song(song_id) on delete cascade,
created_at timestamp default current_timestamp );


-- Index_user
create index idx_user_name on User(user_name) ;

-- Index_song
create index idx_song_name on song(song_name) ;

-- Index_album
create index idx_album_name on album(album_name);
