    const Catalog = require('../Model/catalogueModel');
    const catchAsync = require('../utils/catchAsync');
    const AppError = require('../utils/appError');

    // Get all catalogs
    exports.getAllCatalogs = catchAsync(async (req, res, next) => {
    const catalogs = await Catalog.find();
    res.json(catalogs);
    });

    // Get catalog by ID
    exports.getCatalogById = catchAsync(async (req, res, next) => {
    const catalog = await Catalog.findById(req.params.id);
    if (!catalog) {
        return next(new AppError('Catalog not found', 404));
    }
    res.json(catalog);
    });

    // Create a new catalog
    exports.createCatalog = catchAsync(async (req, res, next) => {
    const catalog = new Catalog(req.body);
    const newCatalog = await catalog.save();
    res.status(201).json(newCatalog);
    });

    // Update a catalog
    exports.updateCatalog = catchAsync(async (req, res, next) => {
    const updatedCatalog = await Catalog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, // Ensures data integrity
    });

    if (!updatedCatalog) {
        return next(new AppError('Catalog not found', 404));
    }
    res.json(updatedCatalog);
    });

    // Delete a catalog
    exports.deleteCatalog = catchAsync(async (req, res, next) => {
    const catalog = await Catalog.findByIdAndDelete(req.params.id);

    if (!catalog) {
        return next(new AppError('Catalog not found', 404));
    }
    res.status(204).json({ message: 'Catalog deleted successfully' });
    });
