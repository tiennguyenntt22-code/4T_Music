import pool from "../common/connect.js";

export const findAllArtist = async () => {
  const [rows] = await pool.query(`SELECT * FROM Artist`);
  return rows;
}; // API 21: lấy all nghệ sĩ

export const findArtistPage = async (artist_id) => {
  const [result] = await pool.query(`
  SELECT a.artist_id, a.artist_name, a.artist_birth, COUNT(af.user_id) AS follower_count
  FROM Artist a
  LEFT JOIN ArtistFollow af ON a.artist_id = af.artist_id
  WHERE a.artist_id = ?
  GROUP BY a.artist_id 
  `, [artist_id])
  return result[0];
} // API 22: Trang nghệ sĩ, thông tin và follower

export const findArtistSong = async (artist_id) => {
  const [rows] = await pool.query(`
    SELECT song_id, song_name, duration 
    FROM Song 
    WHERE artist_id = ?
    `, [artist_id]);
  return rows;
} // API 23: Lấy tất cả bài hát của nghệ sĩ

export const findArtistAlbum = async (artist_id) => {
  const [rows] = await pool.query(`
  SELECT album_id , album_name 
  FROM Album 
  WHERE artist_id = ?
  `, [artist_id])
  return rows;
} // API 24: lấy all Album của nghệ sĩ.

/// Admin quản lý nghệ sĩ


