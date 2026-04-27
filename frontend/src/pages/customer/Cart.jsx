import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.product._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.sellingPrice * item.quantity), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert('Cart is empty!');

    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerAddress: formData.address,
      items: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        sellingPrice: item.product.sellingPrice
      })),
      totalAmount
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        setCartItems([]);
        navigate('/');
      } else {
        alert('Failed to place order');
      }
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-stone-900 mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-6">
          {cartItems.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center border border-stone-100 shadow-sm">
              <p className="text-stone-500 mb-4">Your cart is empty.</p>
              <button onClick={() => navigate('/')} className="text-amber-700 font-bold hover:underline">Continue Shopping</button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.product._id} className="bg-white p-6 rounded-2xl flex items-center shadow-sm border border-stone-100 gap-6">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-stone-900">{item.product.name}</h3>
                  <p className="text-stone-500 text-sm">Qty: {item.quantity}</p>
                  <p className="text-lg font-bold text-stone-900 mt-1">₹{item.product.sellingPrice * item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product._id)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-full transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Form */}
        <div className="lg:w-1/3">
          <div className="bg-stone-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-8 pb-6 border-b border-stone-700">
              <span className="text-stone-300">Total Amount</span>
              <span className="text-2xl font-bold">₹{totalAmount}</span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-1">Full Name</label>
                <input 
                  type="text" required
                  className="w-full bg-stone-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-1">Email</label>
                <input 
                  type="email" required
                  className="w-full bg-stone-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-1">Shipping Address</label>
                <textarea 
                  required rows="3"
                  className="w-full bg-stone-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500"
                  value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" disabled={cartItems.length === 0}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-xl mt-4 transition flex items-center justify-center disabled:opacity-50"
              >
                Place Order <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
