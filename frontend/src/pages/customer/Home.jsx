import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-stone-500">Loading products...</div>;

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">Authentic Handcrafted Pottery</h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Direct from the artisans to your home. Every piece tells a story.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <Link key={product._id} to={`/product/${product._id}`} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-stone-100">
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{product.name}</h3>
                <p className="text-stone-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-stone-900">₹{product.sellingPrice}</span>
                  <span className="text-sm text-stone-500 font-medium">By {product.artisan?.name}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
