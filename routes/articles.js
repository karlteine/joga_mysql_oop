const express = require('express')
const router = express.Router()
const articleControllerClass = require('../controllers/article')

const articleController = new articleControllerClass()

router.get('/', (req, res) => articleController.getAllArticles(req, res))
router.get('/article/:slug', (req, res) => articleController.getAllArticleBySlug(req, res));
router.post('/article/create', (req, res) => articleController.createNewArticle(req, res))

router.put('/article/edit/:id', articleController.updateArticle);

module.exports = router