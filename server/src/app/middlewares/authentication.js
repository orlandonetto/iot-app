const tokenService = require('../services/tokenService');

module.exports = {
    authenticate(req, res, next) {
        try {
            const {authorization: token} = req.headers;

            if (!token)
                return res.status(403).json({ok: false, message: "Fail to authenticate, because token not informed."});

            tokenService.verify(token)
                .then(resolve => {
                    req.userId = resolve.data;

                    next();
                })
                .catch(reject => {
                    return res.status(403).json({ok: false, message: 'Fail to authenticate. Error: ' + reject.message})
                })
        } catch (err) {
            res.status(403).json({ok: false, message: "Fail to authenticate."})
        }
    }
};
