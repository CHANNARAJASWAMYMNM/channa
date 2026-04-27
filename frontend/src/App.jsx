import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard } from 'lucide-react';

// Customer Pages
import Home from './pages/customer/Home';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageArtisans from './pages/admin/Artisans';
import ManageProducts from './pages/admin/Products';
import ManageOrders from './pages/admin/Orders';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
        {/* Simple Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-amber-700 tracking-tight">
                  Mitti<span className="text-stone-800">Market</span>
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <Link to="/admin" className="text-stone-500 hover:text-amber-700 flex items-center transition">
                  <LayoutDashboard className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
                <Link to="/cart" className="text-stone-500 hover:text-amber-700 flex items-center transition">
                  <ShoppingCart className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/artisans" element={<ManageArtisans />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-300 py-8 text-center mt-auto">
          <p>&copy; 2026 MittiMarket. Empowering local artisans.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
