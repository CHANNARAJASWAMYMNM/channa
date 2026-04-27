import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden border border-stone-100">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 relative h-96 md:h-auto bg-stone-100">
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow hover:bg-white transition z-10">
            <ArrowLeft className="w-5 h-5 text-stone-700" />
          </button>
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-sm font-semibold text-amber-600 tracking-widest uppercase mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-stone-800 mb-6">₹{product.sellingPrice}</p>
          
          <p className="text-stone-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-stone-50 p-6 rounded-2xl mb-8 border border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 mb-2 uppercase tracking-wide">Meet the Artisan</h3>
            <p className="font-semibold text-amber-800 mb-1">{product.artisan?.name} — {product.artisan?.village}</p>
            <p className="text-stone-600 text-sm italic">"{product.artisan?.story}"</p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={addToCart}
              className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 px-6 rounded-xl transition flex items-center justify-center shadow-lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button className="bg-stone-100 hover:bg-stone-200 text-stone-900 p-4 rounded-xl transition flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
