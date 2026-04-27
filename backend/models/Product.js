const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Decor', 'Kitchen', 'Garden', 'Festival'], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true },
  basePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  stockQuantity: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
