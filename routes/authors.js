const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/author');

const authorController = new AuthorController();

router.get('/:id', (req, res) => authorController.getAuthById(req, res));

module.exports = router;
