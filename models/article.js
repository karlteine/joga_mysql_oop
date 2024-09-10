const BaseSQLModel = require('./base')

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article')
    } 

    async findAll() {
        const articles = await super.findAll()
        return articles
    }
    
    async findOne(slug) {
        const article = await super.findOne('slug', slug)
        return article
    }
    
    async findMany(authorId) {
        const articles = await super.findMany('author_id', authorId)
        return articles
    }
    
    async create(article) {
        const createdArticleId = await super.create(article)
        return createdArticleId
    }
    async updateArticle(id, articleData) {
        await super.update(id, articleData);
    }
    async deleteArticle(id) {
        const affectedRows = await super.delete(id);
        return affectedRows;
    } 
} 

module.exports = ArticleModel