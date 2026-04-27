import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

function Products() {
  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '', category: 'Decor', description: '', imageUrl: '', artisan: '', basePrice: '', sellingPrice: '', stockQuantity: ''
  });

  const fetchData = () => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/artisans').then(res => res.json())
    ]).then(([productsData, artisansData]) => {
      setProducts(productsData);
      setArtisans(artisansData);
      if (artisansData.length > 0 && !formData.artisan) {
        setFormData(prev => ({ ...prev, artisan: artisansData[0]._id }));
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Product added successfully');
        setFormData({ ...formData, name: '', description: '', imageUrl: '', basePrice: '', sellingPrice: '', stockQuantity: '' });
        fetchData();
      }
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <AdminLayout title="Manage Products">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Product Form */}
        <div className="lg:col-span-1 bg-stone-50 p-6 rounded-2xl border border-stone-100 h-fit">
          <h3 className="text-lg font-bold text-stone-900 mb-4">Add New Product</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Product Name</label>
              <input 
                type="text" required
                className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
              <select 
                className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500"
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Decor">Decor</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Garden">Garden</option>
                <option value="Festival">Festival</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Artisan</label>
              <select 
                required className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500"
                value={formData.artisan} onChange={e => setFormData({...formData, artisan: e.target.value})}
              >
                <option value="">Select Artisan</option>
                {artisans.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
              <input 
                type="url" required placeholder="https://..."
                className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500"
                value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Base Price (₹)</label>
                <input 
                  type="number" required min="0"
                  className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500"
                  value={formData.basePrice} onChange={e => setFormData({...formData, basePrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Selling Price (₹)</label>
                <input 
                  type="number" required min="0"
                  className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500"
                  value={formData.sellingPrice} onChange={e => setFormData({...formData, sellingPrice: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Stock Qty</label>
                <input 
                  type="number" required min="0"
                  className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500"
                  value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
              <textarea 
                required rows="2"
                className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition">
              Add Product
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="lg:col-span-2">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <thead className="bg-stone-100 text-stone-700">
                  <tr>
                    <th className="p-4 font-semibold">Product</th>
                    <th className="p-4 font-semibold">Artisan</th>
                    <th className="p-4 font-semibold text-right">Base/Sell (Margin)</th>
                    <th className="p-4 font-semibold text-right">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map(product => {
                    const margin = product.sellingPrice - product.basePrice;
                    return (
                      <tr key={product._id} className="hover:bg-stone-50 transition">
                        <td className="p-4 flex items-center">
                          <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover mr-4" />
                          <div>
                            <p className="font-bold text-stone-900">{product.name}</p>
                            <p className="text-xs text-stone-500">{product.category}</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{product.artisan?.name}</td>
                        <td className="p-4 text-sm text-right">
                          <span className="text-stone-500">₹{product.basePrice}</span> / <span className="font-bold">₹{product.sellingPrice}</span>
                          <div className="text-emerald-600 font-medium text-xs mt-1">+₹{margin}</div>
                        </td>
                        <td className="p-4 text-right font-medium text-stone-900">{product.stockQuantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {products.length === 0 && <p className="text-stone-500 mt-4">No products found.</p>}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}

export default Products;
