# Git Workflow – GitHub Flow cho nhóm 2 người (A và B)

Timeline tính theo ngày làm việc, chưa gắn ngày lịch. Mã API (API-01…API-74) lấy từ file `API_4T_Music_chia_viec.xlsx`.

## 1. Quy tắc GitHub Flow

1. `main` luôn chạy được.
2. Mỗi việc nhỏ tạo một nhánh từ `main`.
3. Commit và push thường xuyên.
4. Mở Pull Request (PR), người kia review.
5. Duyệt xong thì Merge vào `main`, rồi xóa nhánh.

Nhánh nên sống 1 đến 3 ngày. Không có nhánh `develop` hay `release`. Không push thẳng lên `main`.

## 2. Ngày 0: cài đặt (làm một lần)

Trên GitHub, vào Settings → Branches, thêm rule cho `main`:

- Bật "Require a pull request before merging".
- Bật "Require approvals", chọn 1 người duyệt.
- Trong Settings → General, bật "Automatically delete head branches".

Mời người còn lại làm collaborator.

## 3. Quy ước đặt tên

- Nhánh: `feature/<nhóm-API>`, ví dụ `feature/auth`. Việc phụ: `chore/...`, `db/...`.
- Commit ghi mã API, ví dụ: `API-03: đăng ký tài khoản`.

## 4. Timeline

### Tuần 1: nền móng

| Ngày | Người A | Người B |
|---|---|---|
| 1 | `chore/project-structure`: cấu trúc project, định dạng JSON, mã lỗi → PR → B duyệt → merge | Cùng A thống nhất, viết schema bảng mới: `db/new-tables` (Genre, FavoriteSong, FollowArtist, ListenHistory, cột `file_url`…) → PR → A duyệt → merge |
| 2 | Cả hai `git pull origin main`, mỗi người tạo nhánh riêng cho phần mình | |
| 2–3 | `feature/core-middleware`: API-01, 02 (kết nối DB, JWT, phân quyền). **PR nhỏ, merge sớm nhất có thể** | `feature/songs-read`: API-15, 16, 17 |
| 4–5 | `feature/auth`: API-03→06 | `feature/songs-plays`: API-18, rồi `feature/browse-artists`: API-21→24 |

**Mốc:** `main` có middleware, đăng nhập được, xem được danh sách bài hát.

### Tuần 2: phần đọc công khai và Auth

| Người A | Người B |
|---|---|
| `feature/auth-email`: API-07→10 | `feature/browse-search`: API-20, 25, 26, 27 |
| `feature/profile`: API-11→14 | `feature/admin-users`: API-47→49 (cần middleware của A đã merge) |
| `feature/playlist`: bắt đầu API-28→32 | `feature/admin-songs`: API-50→52 |

**Mốc:** xong Auth, hồ sơ, toàn bộ đọc công khai và quản trị người dùng.

### Tuần 3: hoàn tất giai đoạn 1

| Người A | Người B |
|---|---|
| `feature/playlist` (tiếp): API-33→35 | `feature/admin-artists-albums`: API-53→58 |
| `feature/like-follow`: API-36→41 | `feature/admin-genres`: API-59→61 |
| `feature/player-state`: API-42, 43 | Thử lại toàn bộ API của mình bằng Postman |

**Mốc:** xong giai đoạn 1.

### Tuần 4: giai đoạn 2 và 3

| Người A | Người B |
|---|---|
| `feature/history-recommend`: API-44→46 | `feature/lyrics-approval`: API-19, 62, 63 |
| `feature/offline`: API-64→66 | `feature/artist-portal`: API-67→72 |
| | `feature/stats`: API-73, 74 |

**Mốc:** xong toàn bộ, thử lại hết trước khi nộp.

## 5. Nhịp làm việc mỗi ngày

| Thời điểm | Việc cần làm |
|---|---|
| Sáng | `git switch main`, `git pull`, rồi `git switch feature/...` và `git merge main` để cập nhật nhánh |
| Trong ngày | Commit nhỏ, ghi mã API trong message. `git push` cuối buổi |
| Khi xong một nhóm API | Mở PR vào `main` |
| Review | Người kia duyệt trong ngày, không để PR tồn qua đêm |
| Sau merge | Xóa nhánh, `git pull` ở `main`, báo người kia nếu thay đổi ảnh hưởng đến họ |

## 6. Lệnh thường dùng

```bash
# Bắt đầu một nhóm API mới
git switch main
git pull
git switch -c feature/auth

# Trong lúc làm
git add .
git commit -m "API-03: đăng ký tài khoản"
git push -u origin feature/auth     # lần đầu; sau đó chỉ cần git push

# Cập nhật nhánh theo main
git pull origin main

# Sau khi PR đã merge
git switch main
git pull
git branch -d feature/auth
```

Khi gặp xung đột: mở file, tìm các dấu `<<<<<<<`, `=======`, `>>>>>>>`, giữ đoạn đúng, xóa các dấu, rồi `git add <file>` và `git commit`. Không chắc nên giữ đoạn nào thì hỏi người viết đoạn đó.

## 7. Mẫu Pull Request

```
Tiêu đề: API-03, API-04: đăng ký và đăng nhập

- Làm gì: ...
- Cách thử: gọi POST /api/auth/register với {...}
- Bảng DB bị ảnh hưởng: User
- Cần người kia chú ý: (nếu có)
```

## 8. Lưu ý

- **Thứ tự bắt buộc:** PR `core-middleware` của A phải merge trước khi B bắt đầu `admin-*`. Tuần 1 B làm phần đọc công khai nên không phải chờ.
- **Schema dùng chung (`4TMusic_Database.sql`):** mỗi lần sửa làm trên nhánh `db/...` nhỏ, merge ngay rồi báo người kia `git pull`. Không để thay đổi schema nằm lâu trong nhánh tính năng.
- **File xlsx:** là file nhị phân, Git không gộp được. Chỉ một người cập nhật cột Trạng thái, hoặc cập nhật qua PR riêng rồi merge ngay.
- **Code dùng chung** (kết nối DB, middleware, định dạng lỗi): do Người A sở hữu. Nếu B cần sửa thì báo A hoặc làm trong PR riêng, tránh hai người cùng sửa một file.
