const { getAll } = require('../services/housingService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const housings = await getAll();
    res.render('home', { housings });
});

homeController.get('/housings', async (req, res) => {
    const housings = await getAll();
    res.render('housings', { housings });
});

homeController.get('/housings/search', async (req, res) => {
    const housings = await getAll(req.query.search);
    res.render('search', { housings, search: req.query.search });
});

module.exports = homeController;