const axios = require('axios');

module.exports = {
    async register(data) {
        return await new Promise(async (resolve, reject) => {
            try {
                const url = "http://localhost:3000/user";
                await axios.post(url, data)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(rej => {
                        if (!rej.response)
                            return reject('Fail to connect with Api. Try again later.');

                        return reject(rej.response.data.message || 'Fail to register! Try again.');
                    });
            } catch (err) {
                return reject(err.message);
            }
        })
    },
    async getUserData() {
        return await new Promise(async (resolve, reject) => {
            try {
                const url = "http://localhost:3000/user";
                await axios.get(url)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(rej => {
                        if (!rej.response)
                            return reject('Fail to connect with Api. Try again later.');

                        return reject(rej.response.data.message || 'Fail to get user! Try again.');
                    });
            } catch (err) {
                return reject(err.message);
            }
        });
    }
};
