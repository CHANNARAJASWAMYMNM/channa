const mongoose = require('mongoose');
require('dotenv').config();
const Artisan = require('./models/Artisan');
const Product = require('./models/Product');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pottery-marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const artisansData = [
  {
    name: 'Ramu Kaka',
    village: 'Kumhartoli',
    contactInfo: '9876543210',
    story: 'Ramu has been crafting traditional clay pots for over 40 years. He uses local mud from the riverbanks and a traditional hand-spun wheel.'
  },
  {
    name: 'Sita Devi',
    village: 'Shilpgram',
    contactInfo: '9876543211',
    story: 'Sita specializes in terracotta home decor and festive diyas. Her intricate designs are inspired by local folklore.'
  }
];

const seedDB = async () => {
  try {
    await Artisan.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    console.log('Cleared existing data.');

    const createdArtisans = await Artisan.insertMany(artisansData);
    console.log('Inserted Artisans.');

    const productsData = [
      {
        name: 'Handpainted Terracotta Vase',
        category: 'Decor',
        description: 'A beautiful vase with intricate tribal art patterns.',
        imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
        artisan: createdArtisans[1]._id, // Sita Devi
        basePrice: 400,
        sellingPrice: 899,
        stockQuantity: 15
      },
      {
        name: 'Traditional Clay Water Jug (Surahi)',
        category: 'Kitchen',
        description: 'Keeps water naturally cool during hot summers. Pure clay, unglazed.',
        imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800',
        artisan: createdArtisans[0]._id, // Ramu Kaka
        basePrice: 200,
        sellingPrice: 499,
        stockQuantity: 30
      },
      {
        name: 'Garden Planter Set',
        category: 'Garden',
        description: 'Set of 3 rustic planters for your indoor and outdoor plants.',
        imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
        artisan: createdArtisans[0]._id, // Ramu Kaka
        basePrice: 500,
        sellingPrice: 1199,
        stockQuantity: 10
      }
    ];

    await Product.insertMany(productsData);
    console.log('Inserted Products.');

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
