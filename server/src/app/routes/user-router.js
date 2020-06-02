const router = require('express').Router();
const controller = require('../controllers/user-controller');
const {authenticate} = require('../middlewares/authentication');

router.post('/', controller.create);
router.post('/auth', controller.auth);
router.get('/load-session', authenticate, controller.loadSession);
router.get('/', authenticate, controller.findAll);

module.exports = router;
