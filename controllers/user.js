const bcrypt = require('bcrypt');
const userDbModel = require('../models/user');
const userModel = new userDbModel();

class UserController {
    async register(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const registeredId = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });

            if (registeredId) {
                const userData = await userModel.findById(registeredId);

                req.session.user = {
                    username: userData.username,
                    user_id: userData.id
                };

                res.json({
                    message: 'New user is registered',
                    user_session: req.session.user
                });
            } else {
                res.status(400).json({ message: 'User registration failed' });
            }
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new UserController();
