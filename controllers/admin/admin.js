const articleDbModel = require('../../models/article')
const ArticleController = require('../article')
const articleModel = new articleDbModel()

class articleAdminController extends ArticleController{

    async getAllArticles() {
        return await articleModel.findAll(); 
    }
    async getArticleById(id) {
        return await articleModel.findById(id); 
    }
    async createNewArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        } 
        const articleId = await articleModel.create(newArticle)
        res.status(201).json({
            message: `created article with id ${articleId}`,
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

module.exports = new articleAdminController()
