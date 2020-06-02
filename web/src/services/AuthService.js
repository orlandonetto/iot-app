const axios = require('axios');

module.exports = {
    async authenticate(data) {
        return await new Promise(async (resolve, reject) => {
            try {
                const url = "http://localhost:3000/user/auth";
                await axios
                    .post(url, data)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(rej => {
                        if (!rej.response)
                            return reject('Fail to connect with Api. Try again later.');

                        return reject(rej.response.data.message || 'Authentication failed! Try again.');
                    });
            } catch (err) {
                return reject(err.message);
            }
        })
    },
    async loadSession() {
        return await new Promise(async (resolve, reject) => {
            try {
                const url = "http://localhost:3000/user/load-session";
                await axios
                    .get(url)
                    .then(res => {
                        const {token, user} = res.data;

                        resolve({token, user});
                    })
                    .catch(rej => {
                        if (!rej.response)
                            return reject('Fail to connect with Api. Try again later.');

                        return reject(rej.response.data.message || 'Load failed! Try again.');
                    });
            } catch (err) {
                return reject(err.message);
            }
        });
    }
};
