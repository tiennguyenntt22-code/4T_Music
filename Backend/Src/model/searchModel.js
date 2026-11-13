import pool from "../common/connect.js";

export const searchSong = async (song_name) => {
    const [row] = await pool.query(`
    SELECT  song_id, song_name, duration
    FROM Song
    WHERE song_name LIKE ?
    `, [`%${song_name}%`])
    return row;
}

export const searchArtist = async (artist_name) => {
    const [row] = await pool.query(`
    SELECT  artist_id, artist_name 
    FROM Artist
    WHERE artist_name LIKE ?
    `, [`%${artist_name}%`])
    return row;
}

export const searchAlbum = async (album_name) => {
    const [row] = await pool.query(`
    SELECT  album_id, album_name
    FROM Album
    WHERE album_name LIKE ?
    `, [`%${album_name}%`])
    return row;
}
