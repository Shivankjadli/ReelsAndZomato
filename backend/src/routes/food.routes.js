const express = require('express');
const foodController = require('../controllers/food.controller');
const authFoodPartnerMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage(), });

router.post('/', authFoodPartnerMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);
module.exports = router;