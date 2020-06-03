const service = require('../services/component-service');

module.exports = {
    async create(req, res) {
        await service.create(req.body, req.userId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
    async update(req, res) {
        await service.update(req.body, req.userId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
    async delete(req, res) {
        await service.delete(req.params.id, req.userId)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
    async get(req, res) {
        await service.get({id: req.body.id, userId: req.userId})
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },

    async getById(req, res) {
        const request = {
            id: req.id
        }
        await service.getById(request)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },

    async getDigitalData(req, res) {
        const request = {
            id: req.id
        }
        await service.getDigitalData(request)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },

    async setDigitalData(req, res) {
        const request = {
            id: req.id,
            digitalData: Number(req.query.value),
        }
        if (request.digitalData < 0 || request.digitalData > 1)
            return res.status(400).json('request invalid value.');

        await service.setDigitalData(request)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },

    async getAnalogData(req, res) {
        const request = {
            id: req.id
        }
        await service.getAnalogData(request)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },

    async setAnalogData(req, res) {
        const request = {
            id: req.id,
            analogData: Number(req.query.value),
        }
        if (request.analogData < 0 || request.analogData > 100)
            return res.status(400).json('request invalid value.');

        await service.setAnalogData(request)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },

};
