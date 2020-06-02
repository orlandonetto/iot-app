const router = require('express').Router();
const controller = require('../controllers/component-controller');
const {authenticate} = require('../middlewares/authentication');
const {identifier, value} = require('../middlewares/component-middleware');

router.post('/', authenticate, controller.create);
router.put('/', authenticate, controller.update);
router.delete('/:id', authenticate, controller.delete);
router.get('/', authenticate, controller.get);

router.get('/digital/:id', identifier, controller.getDigitalData);
router.put('/digital/:id', identifier, value, controller.setDigitalData);
router.get('/analog/:id', identifier, controller.getAnalogData);
router.put('/analog/:id', identifier, value, controller.setAnalogData);

module.exports = router;

