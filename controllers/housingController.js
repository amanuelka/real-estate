const { isOwner } = require('../middlewares/guards');
const { parseError } = require('../middlewares/parsers');
const preload = require('../middlewares/preloader');
const { create, getById, update, rent, deleteByid } = require('../services/housingService');

const housingController = require('express').Router();

housingController.get('/create', (req, res) => {
    res.render('create');
});

housingController.post('/create', async (req, res) => {
    const data = { ...req.body, owner: req.user._id };

    try {
        if (Object.values(data).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await create(data);
        res.redirect('/');
    } catch (err) {
        res.render('create', { errors: parseError(err), ...data });
    }
});

housingController.get('/:id', async (req, res) => {
    const housing = await getById(req.params.id);

    housing.isOwner = housing.owner == req.user._id;
    housing.hasAvailable = housing.available > 0;
    housing.hasRented = housing.renters.some(u => u._id == req.user._id);
    const rentersNames = housing.renters.map(r => r.name).join(', ');

    res.render('details', { ...housing, rentersNames });
});

housingController.get('/:id/delete', preload(), isOwner(), async (req, res) => {
    await deleteByid(req.params.id);
    res.redirect('/housings');
});

housingController.get('/:id/edit', preload(), isOwner(), async (req, res) => {
    const housing = res.locals.housing;
    res.render('edit', { ...housing });
});

housingController.post('/:id/edit', preload(), isOwner(), async (req, res) => {

    try {
        await update(req.params.id, { ...req.body, _id: req.params.id });
        res.redirect(`/housing/${req.params.id}`);
    } catch (error) {
        res.render('edit', { errors: parseError(error), ...req.body });
    }
});

housingController.get('/:id/rent', preload(), async (req, res) => {
    const housing = res.locals.housing;
    if (housing.owner != req.user._id && housing.renters.some(u => u._id == req.user._id) == false) {        
        await rent(req.params.id, req.user._id);
    }
    res.redirect(`/housing/${req.params.id}`);
});

module.exports = housingController;