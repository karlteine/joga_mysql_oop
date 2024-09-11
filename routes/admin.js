const express = require('express');
const router = express.Router();
const articleAdminController = require('../controllers/admin/admin');
const checkUser = require('../utils/userCheck');

router.get('/admin', checkUser('admin'), async (req, res) => {
    try {
        const articles = await articleAdminController.getAllArticles();
        res.render('admin', { articles });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.get('/admin/article/create', checkUser('admin'), (req, res) => {
    res.render('createArticle');
});

router.post('/admin/article/create', checkUser('admin'), (req, res) => articleAdminController.createNewArticle(req, res));

router.get('/admin/article/edit/:id', checkUser('admin'), async (req, res) => {
    try {
        const article = await articleAdminController.getArticleById(req.params.id);
        res.render('editArticle', { article });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.post('/admin/article/edit/:id', checkUser('admin'), (req, res) => articleAdminController.updateArticle(req, res));

router.post('/admin/article/delete/:id', checkUser('admin'), (req, res) => articleAdminController.deleteArticle(req, res));

module.exports = router;
