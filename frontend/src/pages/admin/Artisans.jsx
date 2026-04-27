import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [formData, setFormData] = useState({ name: '', village: '', contactInfo: '', story: '' });
  const [loading, setLoading] = useState(true);

  const fetchArtisans = () => {
    fetch('http://localhost:5000/api/artisans')
      .then(res => res.json())
      .then(data => {
        setArtisans(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArtisans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/artisans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Artisan added successfully');
        setFormData({ name: '', village: '', contactInfo: '', story: '' });
        fetchArtisans();
      }
    } catch (err) {
      console.error(err);
      alert('Error adding artisan');
    }
  };

  return (
    <AdminLayout title="Manage Artisans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Artisan Form */}
        <div className="lg:col-span-1 bg-stone-50 p-6 rounded-2xl border border-stone-100">
          <h3 className="text-lg font-bold text-stone-900 mb-4">Add New Artisan</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
              <input 
                type="text" required
                className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Village/Location</label>
              <input 
                type="text" required
                className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Contact Info</label>
              <input 
                type="text" required
                className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                value={formData.contactInfo} onChange={e => setFormData({...formData, contactInfo: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Story/Bio</label>
              <textarea 
                required rows="3"
                className="w-full border-stone-300 rounded-xl px-4 py-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                value={formData.story} onChange={e => setFormData({...formData, story: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition">
              Add Artisan
            </button>
          </form>
        </div>

        {/* Artisans List */}
        <div className="lg:col-span-2">
          {loading ? (
            <p>Loading artisans...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artisans.map(artisan => (
                <div key={artisan._id} className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-lg text-stone-900">{artisan.name}</h4>
                  <p className="text-sm text-stone-500 mb-2">{artisan.village} • {artisan.contactInfo}</p>
                  <p className="text-sm text-stone-700 line-clamp-3 italic">"{artisan.story}"</p>
                </div>
              ))}
              {artisans.length === 0 && <p className="text-stone-500">No artisans found.</p>}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}

export default Artisans;
