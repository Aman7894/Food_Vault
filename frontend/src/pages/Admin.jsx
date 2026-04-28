import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { PackageSearch, Users, ShoppingBag, Plus } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', category: 'Main Course', image: ''
  });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        axios.get('http://localhost:5000/api/v1/products'),
        axios.get('http://localhost:5000/api/v1/orders')
      ]);
      setProducts(prodRes.data.data);
      setOrders(ordRes.data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/products', newProduct);
      setShowAddForm(false);
      setNewProduct({ name: '', description: '', price: '', category: 'Main Course', image: '' });
      fetchAdminData();
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/orders/${orderId}/status`, { status });
      fetchAdminData();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage products, orders, and users</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-medium transition-colors ${
            activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <PackageSearch className="h-5 w-5" />
          <span>Products</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-medium transition-colors ${
            activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Orders</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Manage Products</h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </div>

          {showAddForm && (
            <div className="glass p-6 rounded-2xl mb-8 border border-primary/20">
              <h3 className="text-lg font-bold mb-4">Add New Product</h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  placeholder="Name" required className="p-3 rounded-lg bg-secondary/50 border border-border"
                  value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
                <input 
                  type="number" placeholder="Price" required className="p-3 rounded-lg bg-secondary/50 border border-border"
                  value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                />
                <input 
                  placeholder="Image URL" className="p-3 rounded-lg bg-secondary/50 border border-border"
                  value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                />
                <select 
                  className="p-3 rounded-lg bg-secondary/50 border border-border"
                  value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                >
                  {['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Snack', 'Vegan', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <textarea 
                  placeholder="Description" required className="col-span-1 md:col-span-2 p-3 rounded-lg bg-secondary/50 border border-border"
                  value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
                <button type="submit" className="col-span-1 md:col-span-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold">
                  Save Product
                </button>
              </form>
            </div>
          )}

          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/30 text-muted-foreground">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Vendor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-medium flex items-center space-x-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span>{product.name}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-secondary px-2.5 py-0.5 rounded-full text-xs">{product.category}</span>
                      </td>
                      <td className="p-4 font-bold">${product.price.toFixed(2)}</td>
                      <td className="p-4 text-muted-foreground">{product.vendor?.name || 'Admin'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2 className="text-xl font-bold mb-6">Manage Orders</h2>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/30 text-muted-foreground">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-medium">#{order._id.substring(0, 8)}</td>
                      <td className="p-4">{order.user?.name}</td>
                      <td className="p-4 font-bold">${order.totalPrice.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select 
                          className="bg-background border border-border rounded px-2 py-1 text-sm"
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        >
                          {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
