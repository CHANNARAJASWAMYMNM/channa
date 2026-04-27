import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Packed': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800';
      case 'Delivered': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <AdminLayout title="Manage Orders">
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-stone-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h3>
                  <p className="text-sm text-stone-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <select 
                    className="border-stone-300 rounded-xl text-sm focus:ring-amber-500 px-3 py-2"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 border-b border-stone-100 pb-2">Customer Details</h4>
                  <p className="text-sm text-stone-700"><span className="font-medium">Name:</span> {order.customerName}</p>
                  <p className="text-sm text-stone-700"><span className="font-medium">Email:</span> {order.customerEmail}</p>
                  <p className="text-sm text-stone-700"><span className="font-medium">Address:</span> {order.customerAddress}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 border-b border-stone-100 pb-2">Order Items</h4>
                  <ul className="space-y-3">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          {item.product?.imageUrl && (
                            <img src={item.product.imageUrl} alt="product" className="w-8 h-8 rounded object-cover mr-3" />
                          )}
                          <span className="text-stone-800">{item.product?.name || 'Unknown Product'} <span className="text-stone-500">x {item.quantity}</span></span>
                        </div>
                        <span className="font-medium">₹{item.sellingPrice * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center">
                    <span className="font-bold text-stone-900">Total Amount</span>
                    <span className="text-xl font-black text-amber-700">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100">
              <p className="text-stone-500">No orders placed yet.</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}

export default Orders;
