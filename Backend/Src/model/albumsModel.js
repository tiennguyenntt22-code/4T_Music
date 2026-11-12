import pool from "../common/connect.js";



export const findAlbumDetail = async (album_id) => {
    const [row] = await pool.query(`
    SELECT al.album_id, al.album_name, al.artist_id, s.song_id, s.song_name, s.duration, s.release_date, s.shares
    FROM album al
    LEFT JOIN Song s ON al.album_id = s.album_id
    WHERE al.album_id = ? 
    `, [album_id]);
    return row; // return về album kể cả khi album chưa có bài nào
} // API-10 (Người B)

export const findAlbumbyName = async (album_name) => {
    const [row] = await pool.query(`
        SELECT * FROM Album
        WHERE album_name LIKE ?
        `, [`%${album_name}%`]);
    return row[0];
}

export const addSongToAlbum = async (album_id, song_id) => {
    const [result] = await pool.query(`
        UPDATE Song
        SET album_id = ?
        WHERE song_id = ?
        `, [album_id, song_id]);
    return result.affectedRows;
}

export const addAlbum = async (album_name, artist_id) => {
    const [result] = await pool.query(`
    INSERT INTO Album(album_name, artist_id) 
    VALUES (? , ?)
        `, [album_name, artist_id]);
    return result.insertId;
} // API-20 (Người B)

export const fixAlbum = async (album_name, artist_id, album_id) => {
    const [result] = await pool.query(`
        UPDATE Album 
        SET album_name = ?,
        artist_id = ?
        WHERE album_id = ?
        `, [album_name, artist_id, album_id]);
    return result.affectedRows;
} // API-21 (Người B)

export const removeAlbum = async (album_id) => {

    await pool.query(`
        UPDATE Song
        SET album_id = NULL 
        WHERE album_id = ?
        `, [album_id]);

    const [result] = await pool.query(`
        DELETE FROM Album
        WHERE album_id = ?
        `, [album_id]);
    return result.affectedRows;
} // API-22 (Người B)

