# API liên quan đến Artist (25 API)

Nguồn: `Docs/API_4T_Music_chia_viec.xlsx`, sheet "Danh sách API".
Cách theo dõi: đổi `[ ]` thành `[x]` khi xong, ghi chú thêm ở cột Ghi chú.

Trạng thái: `[ ]` chưa làm · `[~]` đang làm / đã code chưa test · `[x]` xong + đã test

---

## 1. Xem nghệ sĩ (công khai) — bảng `Artist`

| Xong | Mã | Method | Endpoint | Mô tả | Người | Ưu tiên | Ghi chú |
|---|---|---|---|---|---|---|---|
| [~] | API-21 | GET | `/api/artists` | Danh sách nghệ sĩ | B | Must | Có `getAllArtists` trong controller, `artistsRoute.js` chưa gắn route |
| [~] | API-22 | GET | `/api/artists/:id` | Trang nghệ sĩ (thông tin, số người theo dõi) | B | Must | Có `getArtistById`, cần thêm `follower_count` bằng COUNT (xem mục Ghi chú chung) |
| [~] | API-23 | GET | `/api/artists/:id/songs` | Bài hát của nghệ sĩ | B | Must | Đang có ở `/api/songs/artist/:artist_id`, khác đường dẫn |
| [ ] | API-24 | GET | `/api/artists/:id/albums` | Album của nghệ sĩ | B | Must | |

## 2. Admin quản lý nghệ sĩ

| Xong | Mã | Method | Endpoint | Mô tả | Người | Ưu tiên | Ghi chú |
|---|---|---|---|---|---|---|---|
| [ ] | API-53 | POST | `/api/admin/artists` | Thêm nghệ sĩ | B | Must | `artist_name` unique → bắt `ER_DUP_ENTRY` trả 409 |
| [ ] | API-54 | PATCH | `/api/admin/artists/:id` | Sửa nghệ sĩ | B | Must | |
| [ ] | API-55 | DELETE | `/api/admin/artists/:id` | Xóa nghệ sĩ | B | Should | Nghệ sĩ còn bài/album → `ER_ROW_IS_REFERENCED_2` trả 409 |
| [ ] | API-49 | PATCH | `/api/admin/users/:id/role` | Đổi vai trò user/artist/admin | B | Should | |
| [ ] | API-62 | GET | `/api/admin/songs/pending` | Bài artist gửi lên chờ duyệt | B | Should (GĐ 2) | Song thêm cột `approval_status` |
| [ ] | API-63 | PATCH | `/api/admin/songs/:id/approval` | Duyệt / từ chối bài của artist | B | Should (GĐ 2) | |

## 3. Cổng nghệ sĩ (role `artist`, giai đoạn 2)

| Xong | Mã | Method | Endpoint | Mô tả | Người | Ưu tiên | Ghi chú |
|---|---|---|---|---|---|---|---|
| [ ] | API-67 | GET | `/api/artist/me` | Hồ sơ nghệ sĩ gắn với tài khoản | B | Could | Artist cần thêm cột `user_id` |
| [ ] | API-68 | PATCH | `/api/artist/me` | Cập nhật hồ sơ nghệ sĩ | B | Could | |
| [ ] | API-69 | POST | `/api/artist/songs` | Artist đăng bài (chờ duyệt) | B | Could | |
| [ ] | API-70 | PATCH | `/api/artist/songs/:id` | Artist sửa bài của mình | B | Could | Kiểm tra chủ sở hữu |
| [ ] | API-71 | POST | `/api/artist/albums` | Artist tạo album | B | Could | |
| [ ] | API-72 | GET | `/api/artist/stats` | Lượt nghe, thích, chia sẻ, người theo dõi | B | Could | Dùng COUNT trên ListenHistory, SongLike, ArtistFollow |

## 4. Có dùng đến Artist

| Xong | Mã | Method | Endpoint | Liên quan | Người | Ưu tiên | Ghi chú |
|---|---|---|---|---|---|---|---|
| [~] | API-39 | POST | `/api/artists/:id/follow` | Theo dõi nghệ sĩ | A | Must | Đang ở `POST /api/social/me/:artist_id/follow` |
| [~] | API-40 | DELETE | `/api/artists/:id/follow` | Bỏ theo dõi nghệ sĩ | A | Must | Đang ở `DELETE /api/social/me/:artist_id/unfollow` |
| [~] | API-41 | GET | `/api/users/me/followed-artists` | Danh sách nghệ sĩ đang theo dõi | A | Must | Đang ở `GET /api/social/me/followed-artist` |
| [ ] | API-15 | GET | `/api/songs` | Lọc bài hát theo nghệ sĩ | B | Must | |
| [ ] | API-16 | GET | `/api/songs/:id` | Chi tiết bài kèm thông tin nghệ sĩ | B | Must | |
| [ ] | API-20 | GET | `/api/search?q=&type=` | Tìm theo tên nghệ sĩ | B | Must | |
| [ ] | API-46 | GET | `/api/radio?seedArtist=` | Radio từ một nghệ sĩ | A | Could (GĐ 2) | |
| [ ] | API-73 | GET | `/api/charts/monthly` | Nghệ sĩ nghe nhiều nhất theo tháng | B | Could (GĐ 3) | |
| [ ] | API-74 | POST | `/api/playlists/generate` | Tạo playlist theo nghệ sĩ | B | Could (GĐ 3) | |

---

## Ghi chú chung

- **Số người theo dõi không lưu cột riêng.** Bảng `Artist` đã bỏ cột `follower`; đếm từ `ArtistFollow`:
  ```sql
  SELECT a.artist_id, a.artist_name, a.artist_birth,
         COUNT(af.user_id) AS follower_count
  FROM Artist a
  LEFT JOIN ArtistFollow af ON a.artist_id = af.artist_id
  WHERE a.artist_id = ?
  GROUP BY a.artist_id
  ```
  → Báo Người B khi làm API-22 và API-72.
- **Tên bảng lệch với Excel:** Excel ghi `FollowArtist`, schema đang là `ArtistFollow`. Cần thống nhất giữa 2 người.
- **Đường dẫn follow lệch với Excel:** đang dùng `/api/social/...`. Nếu giữ thì cập nhật lại Excel để frontend gọi đúng.
- **API-67 trở đi** cần thêm cột `user_id` vào `Artist` → khi JOIN nhớ ghi rõ alias (`af.user_id`, `a.user_id`) để tránh lỗi "ambiguous".
