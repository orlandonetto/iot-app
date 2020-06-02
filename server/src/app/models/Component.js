const {Schema, model} = require('../../database');

const ComponentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    digitalData: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    analogData: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

module.exports = model('Component', ComponentSchema);
