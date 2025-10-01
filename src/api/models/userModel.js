const db = require("../../config/database");

const findUserByEmail = async (email) => {
    try{
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0]||null;


    }catch (error){
        console.error("Error finding user by email:", error);
        throw error;
    }
};

const createUser = async (userData) =>{
    const { user_id, email, username, full_name, bio } = userData;

    try{
        const sql = `
            INSERT INTO Users (user_id, email, username, full_name, bio, role)
            VALUES (?, ?, ?, ?, ?, 'user')
        `;
        await db.execute(sql, [user_id, email, username, full_name, bio]);

        const [rows] = await db.execute('SELECT * FROM Users WHERE user_id = ?', [user_id]);

        return rows[0];
    }catch (error){
        console.error("Error creating user:", error);
        throw error;
    }
}

module.exports ={
    findUserByEmail,
    createUser
}