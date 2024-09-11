const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.get('/register', (req, res) => {
    res.render('signup');
});

router.post('/login', (req, res) => userController.login(req, res));

router.post('/register', (req, res) => userController.register(req, res));

router.get('/logout', (req, res) => userController.logout(req, res));
module.exports = router;
