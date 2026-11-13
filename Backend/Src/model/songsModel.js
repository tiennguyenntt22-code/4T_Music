import pool from "../common/connect.js";

export const findAll = async () => {
  const [row] = await pool.query(`Select song_name from song`);
  return row;
}; // pool.query sẽ trả về 1-nội dung 2-tên cột .[row] lấy phần nội dung

export const findSongById = async (song_id) => {
  const [row] = await pool.query(
    `Select
     s.song_name , s.song_id , s.duration,
     a.artist_id, a.artist_name   
     al.album_id, al.album_name
     FROM Song s
     LEFT JOIN Artist a ON a.artist_id = s.artist_id
     LEFT JOIN Album al ON al.album_id = s.album_id
     WHERE song_id = ?
     `,
    [song_id],
  );
  return row[0];
};

export const findSongBySongName = async (song_name) => {
  const [row] = await pool.query(
    `Select song_name , song_id, duration from song where song_name like ? `,
    [`%${song_name}%`],
  );
  return row;
};



export const findSongByArtistName = async (artist_name) => {
  const [row] = await pool.query(
    `SELECT s.* FROM song s 
        JOIN artist a ON s.artist_id = a.artist_id 
        WHERE a.artist_name like ?`, [`%${artist_name}%`]);
  return row; // trả về nhiều bài
}

export const findSongByAlbumId = async (album_id) => {
  const [row] = await pool.query(`
      SELECT song_name, song_id, duration 
      FROM song 
      WHERE album_id = ?        
        `, [album_id]);
  return row;
}

export const findSongByAlbumName = async (album_name) => {
  const [row] = await pool.query(
    `SELECT s.song_id, s.song_name , s.duration 
        FROM song s 
        JOIN album a ON s.album_id = a.album_id
        WHERE a.album_name LIKE ? 
        `, [`%${album_name}%`]
  );
  return row;
}


export const create = async ({ song_name, duration }) => {
  const [result] = await pool.query(
    `INSERT INTO song(song_name , duration) VALUES (?,?)`,
    [song_name, duration],
  );
  return result.insertId;
};

export const changeSong = async (song_name, duration, song_id) => {
  const [result] = await pool.query(`
    UPDATE Song 
    SET song_name = ? , duration = ?
    WHERE song_id = ?
    `, [song_name, duration, song_id]);
  return result.affectedRows;
}

export const removeSongById = async (song_id) => {
  const [result] = await pool.query(`DELETE FROM song where song_id = ?`, [
    song_id,
  ]);
  return result.affectedRows;
};

