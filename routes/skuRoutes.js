const express = require('express');
const skuController = require('../controllers/skuController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, skuController.getAllSkus)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    skuController.createSku
  );

router
  .route('/:id')
  .get(authController.protect, skuController.getSkuById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    skuController.updateSku
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    skuController.deleteSku
  );

module.exports = router;
