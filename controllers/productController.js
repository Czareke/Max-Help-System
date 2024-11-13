    const Product = require('../Model/productModel');
    const catchAsync = require('../utils/catchAsync');
    const AppError = require('../utils/appError');

    // Get all products
    exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    res.json(products);
    });

    // Get product by ID
    exports.getProductById = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }
    res.json(product);
    });

    // Create a new product
    exports.createProduct = catchAsync(async (req, res, next) => {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
    });

    // Update a product
    exports.updateProduct = catchAsync(async (req, res, next) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, // Ensures data integrity
    });

    if (!updatedProduct) {
        return next(new AppError('Product not found', 404));
    }
    res.json(updatedProduct);
    });

    // Delete a product
    exports.deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new AppError('Product not found', 404));
    }
    res.status(204).json({ message: 'Product deleted successfully' });
    });