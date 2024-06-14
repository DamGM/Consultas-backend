const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, getAdminData } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/Registrarse').post(registerUser);
router.route('/Acceder').post(loginUser);
router.route('/TuArea').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/PanelAdmin').get(protect, admin, getAdminData);

module.exports = router;
