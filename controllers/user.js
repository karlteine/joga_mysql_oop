const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const userModel = new UserModel();

class UserController {
    async register(req, res) {
        const { username, email, password } = req.body;

        const existingUser = await userModel.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must include uppercase, lowercase, number, and special character' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            username,
            email,
            password: hashedPassword
        };
        const registeredId = await userModel.create(userData);

        if (registeredId) {
            const user = await userModel.findById(registeredId);
            req.session.user = {
                username: user.username,
                user_id: user.id
            };
            res.json({
                message: 'New user is registered',
                user_session: req.session.user
            });
        }
    }
}

module.exports = new UserController();
