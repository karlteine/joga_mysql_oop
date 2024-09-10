const BaseSQLModel = require('./base');
const ArticleModel = require('./article');

class AuthorModel extends BaseSQLModel {
    constructor() {
        super('author');
        this.articleModel = new ArticleModel();
    }

    async findAllAuthors() {
        const authors = await super.findAll();
        return authors;
    }

    async findById(id) {
        const author = await super.findById(id);
        return author;
    }

    async findArticlesByAuthor(authorId) {
        const articles = await this.articleModel.findMany(authorId);
        return articles;
    }
}

module.exports = AuthorModel;
