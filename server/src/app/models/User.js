const {Schema, model} = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    components: [{
        type: Schema.Types.ObjectID,
        required: true,
        ref: 'Component',
    }]
}, {versionKey: false});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

module.exports = model('User', UserSchema);
