import pool from "../common/connect.js";

export const findAll = async () => {
  const [rows] = await pool.query(`SELECT * FROM artist`);
  return rows;
};

export const findById = async (artist_id) => {
  const [rows] = await pool.query(`SELECT * FROM artist WHERE artist_id = ?`, [
    artist_id,
  ]);
  return rows[0];
};
