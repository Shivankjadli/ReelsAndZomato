const express = require('express');
const foodController = require('../controllers/food.controller');
const authFoodPartnerMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/', authFoodPartnerMiddleware.authFoodPartnerMiddleware, foodController.createFood);
module.exports = router;