import pool from "mysql2";

export const registerUser = async ({ user_name, user_account, user_password, user_email, user_date_of_birth }) => {
    const [result] = await pool.query(`
            INSERT INTO User(user_name, user_account, user_password, user_email, user_date_of_birth)
            VALUES (?, ?, ?, ?, ?);
    `, [user_name, user_account, user_password, user_email, user_date_of_birth]);
    return result.insertId;
};



export const signInUser = async ({ }) => {
    const [result] = await pool.query(`
    `, []);
    return result.insertId;
};


export const signOutUser = async ({ }) => {
    const [result] = await pool.query(`
    `, []);
    return result.insertId;
};

export const refreshAccessToken = async ({ }) => {
    const [result] = await pool.query(`
    `, []);
    return result.insertId;
};

export const identifyEmaliUser = async ({ }) => {
    const [result] = await pool.query(`
    `, []);
    return result.insertId;
};
