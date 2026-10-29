import pool from "../common/connect.js";

export const findAllPlaylist = async () => {
    const [row] = await pool.query(`
    SELECT playlist_id, playlist_name
    FROM playlist
    `)
    return row;
} // Admin dùng, lấy tất cả các playlist có trong database.

export const findAllPlaylistByUser = async (user_id) => {
    const [row] = await pool.query(`
        SELECT playlist_id, playlist_name, playlist_description
        FROM playlist 
        WHERE user_id = ?
        `, [user_id]);
    return row;
} // User dùng để xem các playlist của họ. API-28

export const createPlaylist = async (playlist_name, playlist_description, user_id) => {
    const [result] = await pool.query(`
    INSERT INTO playlist (playlist_name , playlist_description, user_id)
    VALUES (? , ?, ?) 
    `, [playlist_name, playlist_description, user_id])
    return result.insertId; // insertID -> id tự điền, tự tăng.
} // API-29. 

export const playlistDetail = async (playlist_id) => {
    const [row] = await pool.query(`
        SELECT playlist_id , playlist_name , playlist_description , created_at, user_id
        FROM playlist 
        WHERE playlist_id = ?
        `, [playlist_id]);
    return row[0];
} // API-30
// Hàm này lấy các thông tin của playlist (các bài hát thuộc playlist được sử lí ở hàm file findSongByPlaylist)
// controller sẽ sử lí cả 2 hàm playlistDetail và findSongByPlaylist.

export const changePlaylist = async (playlist_name, playlist_description, playlist_id) => {
    const [result] = await pool.query(`
    UPDATE playlist
    SET playlist_name = ? , playlist_description = ?
    WHERE playlist_id = ?
    `, [playlist_name, playlist_description, playlist_id]);
    return result.affectedRows;
}// API-31. User chỉnh sửa tên, mô tả playlist

export const deletePlaylist = async (playlist_id) => {
    const [result] = await pool.query(`
        DELETE FROM playlist WHERE playlist_id = ?        
        `, [playlist_id]);
    return result.affectedRows;
} // API-32. User xóa playlist.

export const addSongToPlaylist = async (playlist_id, song_id) => {
    const [result] = await pool.query(`
        INSERT INTO playlist_song (playlist_id, song_id) VALUE (?, ?) 
        `, [playlist_id, song_id]);
    return result.affectedRows;
}// API-33. User Thêm bài hát vào playlist

export const deleteSongFromPlaylist = async (playlist_id, song_id) => {
    const [result] = await pool.query(`
    DELETE FROM playlist_song 
    WHERE playlist_id = ? AND song_id = ?
        `, [playlist_id, song_id]);
    return result.affectedRows;
}// API-34. User xóa bài hát ra khỏi playlist

export const arrangeSongByName = async (playlist_id, song_id) => {
    const [row] = await pool.query(`
    SELECT s.song_id, s.song_name, s.duration
    FROM playlist_song ps
    JOIN song s ON ps.song_id = s.song_id
    WHERE ps.playlist_id = ? 
    ORDER BY s.song_name
    `, [playlist_id, song_id]);
    return row;
}// API-35. User hiển thị nhạc trong playlist theo tên.
