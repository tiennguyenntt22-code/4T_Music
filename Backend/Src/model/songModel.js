import pool from '../common/connect.js';

export const findAll = async () => {
    const [row] = await pool.query("Select song_name from song");
    return row;
} // pool.query sẽ trả về 1-nội dung 2-tên cột .[row] lấy phần nội dung


export const create = async ({ song_name, duration }) => {
    const [result] = await pool.query("INSERT INTO song(song_name , duration) VALUES (?,?), [song_name , duration]");
   return result.insertId;
}

