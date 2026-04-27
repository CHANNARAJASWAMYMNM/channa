import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingBag } from 'lucide-react';

function AdminLayout({ children, title }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
    { name: 'Artisans', path: '/admin/artisans', icon: <Users className="w-5 h-5 mr-3" /> },
    { name: 'Products', path: '/admin/products', icon: <Package className="w-5 h-5 mr-3" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag className="w-5 h-5 mr-3" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 sticky top-24">
          <h2 className="text-xl font-bold text-stone-900 mb-6 px-4">Admin Panel</h2>
          <nav className="space-y-2">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition ${
                  isActive(item.path) 
                    ? 'bg-stone-900 text-white font-medium shadow-md' 
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 min-h-full">
          <h1 className="text-2xl font-bold text-stone-900 mb-8">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
