const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel {
    constructor() {
        super('users');
    }

    async create(userData) {
        const query = `INSERT INTO ${this.tableName} (username, email, password) VALUES (?, ?, ?)`;
        const result = await this.executeQuery(query, [
            userData.username,
            userData.email,
            userData.password
        ]);
        return result.insertId;
    }

    async findById(userId) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const [user] = await this.executeQuery(query, [userId]);
        return user;
    }
    async findByUsername(username) {
        const query = `SELECT * FROM ${this.tableName} WHERE username = ?`;
        const [user] = await this.executeQuery(query, [username]);
        return user;
    }
}

module.exports = UserModel;
