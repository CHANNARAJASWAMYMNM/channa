import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { IndianRupee, ShoppingBag, Package, TrendingUp } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProfit: 0,
    totalOrders: 0,
    totalProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an aggregation endpoint.
    // For MVP, we'll fetch all data and calculate.
    Promise.all([
      fetch('/api/orders').then(res => res.json()),
      fetch('/api/products').then(res => res.json())
    ]).then(([ordersData, productsData]) => {
      let sales = 0;
      let profit = 0;
      
      ordersData.forEach(order => {
        if (order.status !== 'Pending') {
          sales += order.totalAmount;
          // Calculate profit: sellingPrice - basePrice for each item
          // Need to handle the fact that items might be populated or just IDs.
          order.items.forEach(item => {
            if (item.product && item.product.basePrice) {
               profit += (item.sellingPrice - item.product.basePrice) * item.quantity;
            }
          });
        }
      });

      setStats({
        totalSales: sales,
        totalProfit: profit,
        totalOrders: ordersData.length,
        totalProducts: productsData.length
      });
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`p-6 rounded-2xl ${color} text-white flex items-center justify-between shadow-lg`}>
      <div>
        <p className="text-white/80 font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className="bg-white/20 p-4 rounded-xl">
        {icon}
      </div>
    </div>
  );

  if (loading) return <AdminLayout title="Dashboard">Loading...</AdminLayout>;

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value={`₹${stats.totalSales}`} 
          icon={<IndianRupee className="w-8 h-8" />}
          color="bg-amber-600"
        />
        <StatCard 
          title="Platform Margin" 
          value={`₹${stats.totalProfit}`} 
          icon={<TrendingUp className="w-8 h-8" />}
          color="bg-emerald-600"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon={<ShoppingBag className="w-8 h-8" />}
          color="bg-indigo-600"
        />
        <StatCard 
          title="Active Products" 
          value={stats.totalProducts} 
          icon={<Package className="w-8 h-8" />}
          color="bg-stone-800"
        />
      </div>

      <div className="mt-12 bg-stone-50 rounded-2xl p-8 border border-stone-100">
        <h3 className="text-lg font-bold text-stone-900 mb-4">Quick Actions</h3>
        <p className="text-stone-600 mb-6">
          Manage your marketplace using the sidebar links. Add new artisans, list products they have provided, and fulfill customer orders.
        </p>
        <ul className="list-disc list-inside text-stone-500 space-y-2">
          <li>Ensure Artisan base prices are accurate to calculate margins correctly.</li>
          <li>Update Order statuses to "Packed" or "Shipped" to trigger profit calculations.</li>
        </ul>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
