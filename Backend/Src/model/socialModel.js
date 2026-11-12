import pool from "../common/connect.js";

export const likeSong = async (user_id, song_id) => {
    const [result] = await pool.query(`
        INSERT INTO SongLike (user_id, song_id)
        VALUES (? , ?)
        `, [user_id, song_id]);
    return result.affectedRows;
} // API-23 (Người A)

export const unlikeSong = async (user_id, song_id) => {
    const [result] = await pool.query(`
        DELETE FROM SongLike 
        WHERE user_id = ? AND song_id = ?
        `, [user_id, song_id]);
    return result.affectedRows;
} // API-24 (Người A)

export const findLikedSong = async (user_id) => {
    const [rows] = await pool.query(`
        SELECT s.song_id, s.song_name, s.duration  
        FROM SongLike sl 
        JOIN Song s ON sl.song_id = s.song_id 
        WHERE sl.user_id = ?
        `, [user_id]);
    return rows;
}// API-25 (Người A)

export const followArtist = async (user_id, artist_id) => {
    const [result] = await pool.query(`
        INSERT INTO ArtistFollow (user_id, artist_id)
        VALUES (? , ?)
        `, [user_id, artist_id]);
    return result.affectedRows;
} // API-26 (Người A)

export const unfollowArtist = async (user_id, artist_id) => {
    const [result] = await pool.query(`
        DELETE FROM ArtistFollow 
        WHERE user_id = ? AND artist_id = ?
        `, [user_id, artist_id]);
    return result.affectedRows;
} // API-27 (Người A)

export const findFollowedArtist = async (user_id) => {
    const [rows] = await pool.query(`
        SELECT a.artist_id, a.artist_name, a.artist_birth 
        FROM ArtistFollow af 
        JOIN Artist a ON a.artist_id = af.artist_id   
        WHERE af.user_id = ?
        `, [user_id]);
    return rows;
}// API-28 (Người A)




