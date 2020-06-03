const User = require('../models/User');
const Component = require('../models/Component');
const _ = require('lodash');

module.exports = {
    async create(request, userId) {
        return await new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({_id: userId}).populate('components');
                if (user == null)
                    return reject({message: 'User not found'});

                if (user.components.map(e => e.name).includes(request.name))
                    return reject({message: 'Component name already exists.'});

                const component = await Component.create(request);
                if (component == null)
                    return reject({message: "Fail to save component"});

                await User.updateOne({_id: userId}, {$push: {components: component}});

                resolve({message: "Component saved successfully."});
            } catch (e) {
                reject({message: e.message});
            }
        });
    },
    async update(request, userId) {
        return await new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({_id: userId}).populate('components');
                if (user == null)
                    return reject({message: 'User not found'});

                if (!user.components.map(e => e._id).includes(request.id))
                    return reject({message: 'Component not owner a this user.'});

                const component = {};

                if (request.name)
                    component.name = request.name;

                if (request.digitalData !== undefined)
                    component.digitalData = request.digitalData;

                if (request.analogData !== undefined)
                    component.analogData = request.analogData;

                const response = await Component.findOneAndUpdate({_id: request.id}, {$set: component});

                if (response == null)
                    return reject({message: 'Component not found.'});

                resolve({message: "Component saved successfully."});
            } catch (e) {
                reject({message: e.message});
            }
        });
    },
    async delete(id, userId) {
        return await new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOneAndUpdate(
                    {_id: userId, 'components': id},
                    {$pull: {components: id}});

                if (user == null)
                    return reject({message: 'Delete failed, because User or Component not found.'});

                await Component.deleteOne({_id: id});

                resolve({message: "Deleted successfully."});
            } catch (e) {
                reject({message: e.message});
            }
        });
    },
    async get({id, userId}) {
        return await new Promise(async (resolve, reject) => {
            try {
                const query = {_id: userId}
                if (id)
                    query.components._id = id;

                const {components} = await User.findOne(query).populate('components');
                resolve(_.orderBy(components, 'createdAt', 'desc'));
            } catch (e) {
                reject({message: e.message});
            }
        });
    },
    async getById({id}) {
        return await new Promise(async (resolve, reject) => {
            try {
                const response = await Component.findOne({_id: id});
                resolve(response);
            } catch (e) {
                reject({message: e.message});
            }
        });
    },
    async getDigitalData({id}) {
        return await new Promise(async (resolve, reject) => {
            try {
                const component = await Component.findOne({_id: id}, {digitalData: 1});
                resolve(Number(component.digitalData || 0));
            } catch (e) {
                reject('get digital data failed.');
            }
        });
    },
    async setDigitalData({id, digitalData}) {
        return await new Promise(async (resolve, reject) => {
            try {
                await Component.updateOne({_id: id}, {$set: {digitalData}});

                resolve("update digital data success");
            } catch (e) {
                reject("update digital data failed");
            }
        });
    },
    async getAnalogData({id}) {
        return await new Promise(async (resolve, reject) => {
            try {
                const component = await Component.findOne({_id: id}, {analogData: 1});
                console.log(component);
                resolve(Number(component.analogData || 0));
            } catch (e) {
                reject('get analog data failed.');
            }
        });
    },
    async setAnalogData({id, analogData}) {
        return await new Promise(async (resolve, reject) => {
            try {
                await Component.updateOne({_id: id}, {$set: {analogData}});

                resolve("update analog data success");
            } catch (e) {
                reject("update analog data failed");
            }
        });
    }
};
