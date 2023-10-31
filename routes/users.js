const router = require('express').Router();

const { getUserInfo, updateUserProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/validate');

router.get('/me', getUserInfo);

router.patch('/me', validateUpdateProfile, updateUserProfile);

module.exports = router;
