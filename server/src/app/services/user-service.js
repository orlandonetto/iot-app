const User = require('../models/User');
const bcrypt = require('bcryptjs');
const tokenService = require('./tokenService');

module.exports = {
    async create(user) {
        return new Promise(async (resolve, reject) => {
            try {
                await User.create(user);
                resolve({success: true, message: "User saved successfully."});
            } catch (e) {
                reject({success: false, message: e.message});
            }
        });
    },
    async auth(username = "", password = "") {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({username}, {password: 1});

                if (user === null)
                    return reject({success: false, message: "Fail to authenticate, because username not found."});

                bcrypt.compare(password, user.password)
                    .then(async res => {
                        if (!res)
                            return reject({
                                success: false,
                                message: "Fail to authenticate, because password is wrong."
                            });

                        const userResponse = await User.findOne({username});
                        const token = await tokenService.generate(userResponse._id);
                        resolve({
                            success: true,
                            message: "Authentication success.",
                            token: token,
                            user: userResponse
                        })
                    })
                    .catch(err => {
                        reject({success: false, message: "Fail to authenticate, error: " + err.message});
                        console.log(err.message)
                    });
            } catch (e) {
                reject({success: false, message: e.message});
            }
        });
    },
    async findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.find();

                resolve({success: true, message: "User found.", user});
            } catch (e) {
                reject({success: false, message: e.message});
            }
        });
    },
    async loadSession(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({_id: userId});
                const token = tokenService.generate(user._id);

                resolve({
                    success: true,
                    message: "Loaded successfully.",
                    token: token,
                    user: user
                })
                resolve({success: true, message: "User loaded.", user});
            } catch (e) {
                reject({success: false, message: e.message});
            }
        });
    }
};
