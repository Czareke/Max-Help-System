const Catalog = require('../Model/catalogueModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCatalogs = catchAsync(async (req, res, next) => {
    const catalogs = await Catalog.find();
    res.status(200).json({ status: 'success', data: { catalogs } });
});

exports.createCatalog = catchAsync(async (req, res, next) => {
    const newCatalog = await Catalog.create(req.body);
    res.status(201).json({ status: 'success', data: { catalog: newCatalog } });
});

exports.updateCatalog = catchAsync(async (req, res, next) => {
    const catalog = await Catalog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!catalog) return next(new AppError('No catalog found with that ID', 404));

    res.status(200).json({ status: 'success', data: { catalog } });
});

exports.deleteCatalog = catchAsync(async (req, res, next) => {
    await Catalog.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
});
