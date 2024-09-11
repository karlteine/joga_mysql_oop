const express = require('express')
const router = express.Router()
const articleAdminController = require('../controllers/admin/admin')
const checkUser = require('../utils/userCheck')

router.post('/admin/article/create', checkUser('admin'), (req, res) => articleAdminController.createNewArticle(req, res));
router.put('/admin/article/edit/:id', checkUser('admin'), (req, res) => articleAdminController.updateArticle(req, res));
router.delete('/admin/article/delete/:id', checkUser('admin'), (req, res) => articleAdminController.deleteArticle(req, res));

module.exports = router
