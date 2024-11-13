const express = require('express');
const catalogueController = require('../controllers/catalogueController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(catalogueController.getAllCatalogs)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    catalogueController.createCatalog
  );

router
  .route('/:id')
  .get(catalogueController.getCatalogById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    catalogueController.updateCatalog
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    catalogueController.deleteCatalog
  );

module.exports = router;
