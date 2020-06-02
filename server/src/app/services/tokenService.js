const jwt = require('jsonwebtoken');
const {SECRET} = require('../../config');

module.exports = {
    generate(data) {
        return jwt.sign({
            data: data
        }, SECRET, {expiresIn: '10h'});
    },
    verify(token) {
        return new Promise((resolve, reject) => {
            try {
                const decoded = jwt.verify(token, SECRET);

                resolve({ok: true, data: decoded.data})
            } catch (err) {
                reject({ok: false, message: err.message});
            }
        })
    }
};
