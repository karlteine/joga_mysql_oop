// controllers/author.js
const AuthorModel = require('../models/author');
const authorModel = new AuthorModel();

class AuthorController {
    async getAuthById(req, res) {
        try {
            const author = await authorModel.findById(req.params.id);
            if (!author) {
                return res.status(404).send('Author not found');
            }

            const articles = await authorModel.findArticlesByAuthor(author.id);

            res.render('author', {
                author: author,
                articles: articles
            });
        } catch (error) {
            console.error('Error fetching author or articles:', error);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = AuthorController;
