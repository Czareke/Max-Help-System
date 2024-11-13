
    const mongoose = require('mongoose');

    const skuSchema = new mongoose.Schema({
    skuCode: { type: String, required: true, unique: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
    });
    module.exports = mongoose.model('SKU', skuSchema);