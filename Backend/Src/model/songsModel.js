import pool from "../common/connect.js";

export const findAll = async () => {
  const [rows] = await pool.query(`SELECT * FROM song`);
  return rows;
};

export const findById = async (song_id) => {
  const [rows] = await pool.query(`SELECT * FROM song Where song_id = ?`, [
    song_id,
  ]);
  return rows[0];
};

export const create = async ({ song_name, duration }) => {
  const [result] = await pool.query(
    "INSERT INTO song(song_name , duration) VALUES (?,?)",
    [song_name, duration],
  );
  return result.insertId;
};
