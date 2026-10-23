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

## 9. Quy trình từng bước cho một người: từ pull code đến merge vào main

Áp dụng cho mỗi nhóm API. Các lệnh chạy ở thư mục gốc dự án (thư mục chứa `Backend/`, `Docs/`, `Frontend/`).

### Bước 0: Chuẩn bị máy (làm một lần)

1. Clone repo: `git clone https://github.com/tiennguyenntt22-code/4T_Music.git`, rồi `cd 4T_Music`.
2. Cài dependencies: `cd Backend`, chạy `npm install`.
3. Tạo file `Backend/.env` (file này không được commit, đã nằm trong `.gitignore`):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=<mật khẩu MySQL của bạn>
   DB_NAME=the4tmusic
   ```
4. Tạo DB: chạy file `Docs/4TMusic_Database.sql` trong MySQL (tạo DB `the4tmusic` và các bảng).
5. Chạy thử: `npm run dev`, thấy log "server bắt đầu trên cổng 5001" là đạt.

### Bước 1: Lấy code mới nhất từ main

```bash
git switch main
git pull
```

Nếu `package.json` có thay đổi, chạy lại `npm install` trong `Backend/`.

### Bước 2: Tạo nhánh cho nhiệm vụ

```bash
git switch -c feature/<nhóm-API>      # ví dụ: feature/auth
```

Mỗi nhiệm vụ một nhánh, tạo từ `main`. Không làm việc trực tiếp trên `main`.

### Bước 3: Làm nhiệm vụ

1. Viết code theo đúng cấu trúc: `Backend/Src/routes`, `Backend/Src/controllers`, dùng chung `Backend/Src/common/connect.js` để truy cập DB.
2. Dùng `import`/`export` (dự án có `"type": "module"`), không dùng `require`/`module.exports`.
3. Cài thêm package nếu cần: `npm install <tên-package>` (trong `Backend/`), và nhớ commit cả `package.json` lẫn `package-lock.json`.
4. Chạy thử bằng `npm run dev` và Postman trước khi commit.

### Bước 4: Commit

```bash
git status                  # kiểm tra: không có .env, không có node_modules
git add <các file đã sửa>   # hạn chế dùng "git add ." khi chưa xem git status
git commit -m "API-03: đăng ký tài khoản"
```

Commit nhỏ, thường xuyên. Message ghi mã API.

### Bước 5: Cập nhật nhánh theo main rồi push

```bash
git pull origin main        # lấy thay đổi mới của main; có xung đột thì sửa, git add, git commit
git push -u origin feature/<nhóm-API>     # lần đầu; các lần sau chỉ cần git push
```

### Bước 6: Mở Pull Request

1. Mở link GitHub in ra sau khi push, hoặc vào tab Pull requests, bấm New pull request.
2. Base chọn `main`, compare chọn nhánh của bạn.
3. Điền theo mẫu ở mục 7. Trong mục "Cần người kia chú ý" ghi rõ nếu có package mới, biến `.env` mới hoặc đổi schema.
4. Xem tab Files changed lần cuối: không có `.env`, mật khẩu hay `node_modules`.
5. Báo người kia vào review.

### Bước 7: Review (người kia làm)

1. `git fetch`, `git switch <nhánh>`, `npm install`, `npm run dev` để chạy thử.
2. Đọc code ở tab Files changed, góp ý nếu cần.
3. Bấm Review changes, chọn Approve rồi Submit review. Không để PR tồn qua đêm.
4. Nếu có góp ý: tác giả sửa trên cùng nhánh, commit, `git push`. PR tự cập nhật, sau đó báo review lại.

### Bước 8: Merge vào main

Điều kiện: có 1 approval và không có xung đột.

1. Trên PR, bấm Merge pull request, rồi Confirm merge.
2. Bấm Delete branch (tự động nếu đã bật "Automatically delete head branches").

### Bước 9: Dọn dẹp trên máy

```bash
git switch main
git pull
git branch -d feature/<nhóm-API>
```

Nếu dùng Squash and merge và git báo nhánh chưa merge, dùng `git branch -D feature/<nhóm-API>` (code đã nằm trong `main`).

Sau đó báo người kia `git pull` (và `npm install` nếu có package mới). Quay lại Bước 1 cho nhiệm vụ tiếp theo.

### Lỗi thường gặp

| Hiện tượng | Nguyên nhân và cách xử lý |
|---|---|
| Chuyển sang `main` thì mất file của mình | File chỉ nằm trên nhánh feature, chưa merge. `git switch <nhánh-feature>` để xem lại. |
| `fatal: pathspec '...' did not match any files` | Đang đứng trong thư mục con nên đường dẫn bị lệch. Về thư mục gốc dự án rồi chạy lại. |
| `ERR_MODULE_NOT_FOUND` khi chạy server | Chưa `npm install`, hoặc thiếu package trong `package.json`. |
| `require is not defined in ES module scope` | Đang dùng `require`/`module.exports` trong dự án ES module. Đổi sang `import`/`export`. |
| `Access denied` hoặc `Unknown database` | `.env` sai mật khẩu hoặc chưa tạo DB `the4tmusic`. |
| `.env` hiện trong `git status` | Không `git add` file đó. Kiểm tra `.gitignore` có dòng `.env`. |
| Đã lỡ commit `.env` hoặc mật khẩu | Báo cả nhóm và đổi mật khẩu ngay, vì xóa file ở commit sau không xóa được lịch sử. |
