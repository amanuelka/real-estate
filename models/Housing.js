const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /https?:\/\/./i;

const housingSchema = new Schema({
    name: { type: String, required: true, minlength: [6, 'Housing name must be at least 6 characters long'] },
    type: { type: String, required: true, enum: ['Apartment', 'Villa', 'House'] },
    year: { type: Number, required: true, min: 1850, max: 2021 },
    city: { type: String, required: true, minlength: [4, 'City name must be at least 4 characters long'] },
    imageUrl: { type: String, required: true, match: [URL_PATTERN, 'Invalid image URL'] },
    description: { type: String, required: true, maxlength: [60, 'Description cannot be more than 60 characters long'] },
    available: { type: Number, required: true, min: 0, max: 10 },
    renters: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User' }
});

const Housing = model('Housing', housingSchema);
module.exports = Housing;