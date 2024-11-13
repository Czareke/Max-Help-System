const mongoose = require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Enter Product name']
    },
    description:{
        type: String,
        required: [true,'Enter Product description']
    },
    price:{
        type: Number,
        required: [true,'Enter Product price']
    },
    catalog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog',
        required: [true,'Product must belong to a catalog']
    },
    sku:{
        type: String,
        required: [true,'Enter Product SKU']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    inventoryStatus:{
        type: String,
        enum: ['active', 'inactive','low stock'],
        default: 'active'
    },
    labels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CustomLabel'
    }]
})
module.exports = mongoose.model('Product', productSchema);