const artisans = [
  {
    _id: '1',
    name: 'Ramu Kaka',
    village: 'Kumhartoli',
    contactInfo: '9876543210',
    story: 'Ramu has been crafting traditional clay pots for over 40 years. He uses local mud from the riverbanks and a traditional hand-spun wheel.',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Sita Devi',
    village: 'Shilpgram',
    contactInfo: '9876543211',
    story: 'Sita specializes in terracotta home decor and festive diyas. Her intricate designs are inspired by local folklore.',
    createdAt: new Date().toISOString()
  }
];

const products = [
  {
    _id: '101',
    name: 'Handpainted Terracotta Vase',
    category: 'Decor',
    description: 'A beautiful vase with intricate tribal art patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    artisan: '2', // Sita Devi
    basePrice: 400,
    sellingPrice: 899,
    stockQuantity: 15,
    createdAt: new Date().toISOString()
  },
  {
    _id: '102',
    name: 'Traditional Clay Water Jug (Surahi)',
    category: 'Kitchen',
    description: 'Keeps water naturally cool during hot summers. Pure clay, unglazed.',
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800',
    artisan: '1', // Ramu Kaka
    basePrice: 200,
    sellingPrice: 499,
    stockQuantity: 30,
    createdAt: new Date().toISOString()
  },
  {
    _id: '103',
    name: 'Garden Planter Set',
    category: 'Garden',
    description: 'Set of 3 rustic planters for your indoor and outdoor plants.',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
    artisan: '1', // Ramu Kaka
    basePrice: 500,
    sellingPrice: 1199,
    stockQuantity: 10,
    createdAt: new Date().toISOString()
  }
];

const orders = [];

module.exports = {
  artisans,
  products,
  orders
};
