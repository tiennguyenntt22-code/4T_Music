import pool from "../common/connect.js";

export const findAllArtist = async () => {
  const [rows] = await pool.query(`SELECT * FROM Artist`);
  return rows;
}; // API-6 (Người B)

export const findArtistPage = async (artist_id) => {
  const [result] = await pool.query(`
  SELECT a.artist_id, a.artist_name, a.artist_birth, COUNT(af.user_id) AS follower_count
  FROM Artist a
  LEFT JOIN ArtistFollow af ON a.artist_id = af.artist_id
  WHERE a.artist_id = ?
  GROUP BY a.artist_id 
  `, [artist_id])
  return result[0];
} // API-7 (Người B)

export const findArtistSong = async (artist_id) => {
  const [rows] = await pool.query(`
    SELECT song_id, song_name, duration 
    FROM Song 
    WHERE artist_id = ?
    `, [artist_id]);
  return rows;
} // API-8 (Người B)

export const findArtistAlbum = async (artist_id) => {
  const [rows] = await pool.query(`
  SELECT album_id , album_name 
  FROM Album 
  WHERE artist_id = ?
  `, [artist_id])
  return rows;
} // API-9 (Người B)

/// Admin quản lý nghệ sĩ

export const addArtist = async (artist_name, artist_birth) => {
  const [result] = await pool.query(`
    INSERT INTO Artist (artist_name, artist_birth)
    VALUES (? , ?)
    `, [artist_name, artist_birth]);
  return result.insertId;
} // API 17

export const changeArtist = async (artist_name, artist_birth, artist_id) => {
  const [result] = await pool.query(`
     UPDATE Artist
     SET artist_name = ? , artist_birth = ?
     WHERE artist_id = ?
    `, [artist_name, artist_birth, artist_id]);
  return result.affectedRows;
} // API 19

export const removeArtist = async (artist_id) => {

  await pool.query(`
  UPDATE Song 
  SET artist_id = NULL
  WHERE artist_id = ?
    `, [artist_id]);

  await pool.query(`
  UPDATE Album 
  SET artist_id = NULL
  WHERE artist_id = ?
    `, [artist_id]);

  const [result] = await pool.query(`
    DELETE FROM Artist 
    WHERE artist_id = ?
    `, [artist_id]);
  return result.affectedRows;
} // API 19 

