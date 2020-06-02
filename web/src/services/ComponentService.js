const axios = require('axios');
const {host} = require('../http');

module.exports = {
    async create(data) {
        return await new Promise(async (resolve, reject) => {
            try {
                const url = host + "/component";
                await axios
                    .post(url, data)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(rej => {
                        if (!rej.response)
                            return reject('Fail to connect with Api. Try again later.');

                        return reject(rej.response.data.message || 'Fail to create component! Try again.');
                    });
            } catch (err) {
                return reject(err.message);
            }
        })
    },
    async update(data) {
        return await new Promise(async (resolve, reject) => {
            try {
                const url = host + "/component";
                await axios
                    .put(url, data)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(rej => {
                        if (!rej.response)
                            return reject('Fail to connect with Api. Try again later.');

                        return reject(rej.response.data.message || 'Fail to update component! Try again.');
                    });
            } catch (err) {
                return reject(err.message);
            }
        })
    },
    async get() {
        return await new Promise(async (resolve, reject) => {
            try {
                const url = host + "/component";
                await axios
                    .get(url)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(rej => {
                        if (!rej.response)
                            return reject('Fail to connect with Api. Try again later.');

                        return reject(rej.response.data.message || 'Fail to get components! Try again.');
                    });
            } catch (err) {
                return reject(err.message);
            }
        })
    },
    async delete(id) {
        return await new Promise(async (resolve, reject) => {
            try {
                const url = host + "/component/" + id;
                await axios
                    .delete(url)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(rej => {
                        if (!rej.response)
                            return reject('Fail to connect with Api. Try again later.');

                        return reject(rej.response.data.message || 'Fail to get components! Try again.');
                    });
            } catch (err) {
                return reject(err.message);
            }
        })
    },
};
