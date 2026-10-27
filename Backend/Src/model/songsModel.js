import pool from "../common/connect.js";

export const findAll = async () => {
  const [row] = await pool.query(`Select song_name from song`);
  return row;
}; // pool.query sẽ trả về 1-nội dung 2-tên cột .[row] lấy phần nội dung

export const findSongById = async (song_id) => {
  const [row] = await pool.query(
    `Select song_name , song_id , duration from song where song_id = ?`,
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

export const findSongByArtistId = async (artist_id) => {
  const [row] = await pool.query(
    `Select song_name , song_id , duration from song where artist_id = ?`,
    [artist_id],
  );
  return row; // trả về nhiều bài
};

export const create = async ({ song_name, duration }) => {
  const [result] = await pool.query(
    `INSERT INTO song(song_name , duration) VALUES (?,?)`,
    [song_name, duration],
  );
  return result.insertId;
};

export const xoa = async (song_id) => {
  const [result] = await pool.query(`DELETE FROM song where song_id = ?`, [
    song_id,
  ]);
  return result.affectedRows;
};
