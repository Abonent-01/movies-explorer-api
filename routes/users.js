const router = require('express').Router();
const { validateUpdateProfile } = require('../middlewares/validate');
const { getUserInfo, updateUserProfile } = require("../controllers/users");

router.get('/me', getUserInfo);
router.patch('/me', validateUpdateProfile, updateUserProfile);

module.exports = router;