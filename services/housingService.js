const Housing = require('../models/housing');

async function getAll(search) {
    const query = {};
    if (search) {
        query.type = new RegExp(search, 'i');
    }
    return Housing.find(query).lean();
};

async function getById(id) {
    return Housing.findById(id).populate('renters', 'name').lean();
};

async function create(data) {
    return await Housing.create(data);
};

async function update(id, data) {
    const existing = await Housing.findById(id);
    Object.assign(existing, data);
    return existing.save();
};

async function deleteByid(id) {
    return Housing.findByIdAndDelete(id);
};

async function rent(id, userId) {
    const housing = await Housing.findById(id);
    housing.renters.push(userId);
    housing.available--;
    return housing.save();
};

module.exports = { getAll, getById, create, update, deleteByid, rent };