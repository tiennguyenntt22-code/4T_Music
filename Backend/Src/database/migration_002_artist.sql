-- =====================================================================
-- Migration 002: thêm cột cho bảng Artist (nối tài khoản, ảnh, giới thiệu)
-- Chạy 1 lần vào DB THE4TMUSIC đang có (không cần xóa DB tạo lại).
-- DB tạo mới từ 4TMusic_Database.sql đã có sẵn các cột này, KHÔNG chạy lại.
-- =====================================================================

use THE4TMUSIC ;

alter table Artist
  add column user_id int null unique,         -- tài khoản của nghệ sĩ (null = admin thêm, chưa có tài khoản)
  add column avatar_url text default null,
  add column bio text default null,
  add column created_at timestamp default current_timestamp,
  add foreign key (user_id) references User(user_id) on delete set null;
