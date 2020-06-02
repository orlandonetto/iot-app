const service = require('../services/user-service');

module.exports = {
    async create(req, res) {
        const user = req.body;

        await service.create(user)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
    async auth(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        await service.auth(username, password)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
    async findAll(req, res) {
        await service.findAll()
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
    async loadSession(req, res) {
        await service.loadSession(req.userId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
};
