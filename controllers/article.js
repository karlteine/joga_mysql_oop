const articleDbModel = require('../models/article')
const articleModel = new articleDbModel()

class articleController {
    constructor(){
        const articles = [] 
    } 
    
    async getAllArticles(req, res) {
        this.articles = await articleModel.findAll()
        res.status(201).json({articles: this.articles})
    } 
    
    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug)
        res.status(201).json({article: article})
    } 
} 

module.exports = new articleController()