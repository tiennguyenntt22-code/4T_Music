-- =====================================================================
-- Migration 001: bảng Like / Comment / Follow + dọn cột cũ
-- Chạy 1 lần vào DB THE4TMUSIC đang có (không cần xóa DB tạo lại).
-- Chạy xong: cập nhật 4TMusic_Database.sql cho khớp với DB mới.
-- =====================================================================

use THE4TMUSIC ;

-- 1--------------------------------------------------------------------
-- ---------------    bảng relation user-song (Like)     --------------
-- ---------------------------------------------------------------------
create table if not exists SongLike (
user_id int,
song_id int,
created_at timestamp default current_timestamp,
primary key (user_id, song_id),               -- 1 người chỉ like 1 bài 1 lần
foreign key (user_id) references User(user_id) on delete cascade,
foreign key (song_id) references Song(song_id) on delete cascade
);

-- 2--------------------------------------------------------------------
-- ---------------          Bảng Comment                 --------------
-- ---------------------------------------------------------------------
create table if not exists Comment (
comment_id int auto_increment primary key,
user_id int not null,
song_id int not null,
content text not null,
created_at timestamp default current_timestamp,
foreign key (user_id) references User(user_id) on delete cascade,
foreign key (song_id) references Song(song_id) on delete cascade
);

-- 3--------------------------------------------------------------------
-- ---------------  bảng relation user-artist (Follow)   --------------
-- ---------------------------------------------------------------------
create table if not exists ArtistFollow (
user_id int,
artist_id int,
created_at timestamp default current_timestamp,
primary key (user_id, artist_id),             -- 1 người chỉ follow 1 nghệ sĩ 1 lần
foreign key (user_id) references User(user_id) on delete cascade,
foreign key (artist_id) references Artist(artist_id) on delete cascade
);

-- 4--------------------------------------------------------------------
-- ---------------  Khóa ngoại RefreshToken -> User     ----------------
-- ---------------------------------------------------------------------
-- Xóa token của user không còn tồn tại (nếu có), nếu không thêm khóa ngoại sẽ lỗi
delete from RefreshToken where user_id not in (select user_id from User);

alter table RefreshToken
add constraint refreshtoken_user_fk
foreign key (user_id) references User(user_id) on delete cascade;

-- 5--------------------------------------------------------------------
-- ---------------  Xóa cột đếm cũ (đã thay bằng COUNT)  ---------------
-- ---------------------------------------------------------------------
alter table Artist drop column follower;
alter table Song drop column likes, drop column comments;

-- 6--------------------------------------------------------------------
-- ---------------  Index cho tìm kiếm theo tên (API-20) ---------------
-- ---------------------------------------------------------------------
-- user_name đã có index nhờ unique, không cần thêm
create index idx_song_name on Song(song_name);
create index idx_album_name on Album(album_name);
