    const SKU = require('../Model/skuModel');
    const catchAsync = require('../utils/catchAsync');
    const AppError = require('../utils/appError');

    // Get all SKUs
    exports.getAllSkus = catchAsync(async (req, res, next) => {
    const skus = await SKU.find();

    res.status(200).json({
        status: 'success',
        results: skus.length,
        data: {
        skus
        }
    });
    });

    // Get a specific SKU by ID
    exports.getSkuById = catchAsync(async (req, res, next) => {
    const sku = await SKU.findById(req.params.id);

    if (!sku) {
        return next(new AppError('No SKU found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
        sku
        }
    });
    });

    // Create a new SKU
    exports.createSku = catchAsync(async (req, res, next) => {
    const newSku = await SKU.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
        sku: newSku
        }
    });
    });

    // Update an existing SKU
    exports.updateSku = catchAsync(async (req, res, next) => {
    const sku = await SKU.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!sku) {
        return next(new AppError('No SKU found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
        sku
        }
    });
    });

    // Delete an SKU
    exports.deleteSku = catchAsync(async (req, res, next) => {
    const sku = await SKU.findByIdAndDelete(req.params.id);

    if (!sku) {
        return next(new AppError('No SKU found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
    });
