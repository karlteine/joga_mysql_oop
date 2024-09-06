const AuthorModel = require('../models/author');
const ArticleModel = require('../models/article');

const authorModel = new AuthorModel();
const articleModel = new ArticleModel();

class AuthorController {
    constructor() {
        this.authors = [];
    }

    async getAuthById(req, res) {
        try {
            const author = await authorModel.findById(req.params.id);
            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }

            const articles = await authorModel.findArticlesByAuthor(author.id);
            author['articles'] = articles;

            res.status(200).json({ author: author });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = AuthorController;
