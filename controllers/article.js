const articleDbModel = require('../models/article')
const articleModel = new articleDbModel()
const AuthorModel = require('../models/author');
const authorModel = new AuthorModel();

class articleController {
    constructor(){
        const articles = [] 
    } 
    
    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
            res.render('index', { articles });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } 
    
    async getArticleBySlug(req, res) {
        try {
            const article = await articleModel.findOne(req.params.slug);
            if (article) {
                const author = await authorModel.findById(article.author_id);
                article.author_name = author ? author.name : 'Unknown Author';
                
                res.render('article', { article });
            } else {
                res.status(404).send('Article not found');
            }
        } catch (error) {
            console.error('Error fetching article or author:', error);
            res.status(500).send('Server Error');
        }
    }
    
    async createNewArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.name,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        }
        const articleId = await articleModel.create(newArticle)
        res.status(201).json({
            message: `created article with id ${newArticle}`,
            article: {id: articleId, ...newArticle} 
        })
    }
    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            const articleData = req.body;

            await articleModel.updateArticle(articleId, articleData);

            res.status(200).json({
                message: `Article with ID ${articleId} updated successfully.`,
                article: { id: articleId, ...articleData }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async deleteArticle(req, res) {
        try {
            const articleId = req.params.id;

            const affectedRows = await articleModel.deleteArticle(articleId);

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Article not found' });
            }

            res.status(200).json({
                message: `Article with ID ${articleId} deleted successfully.`
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } 
} 

module.exports = articleController