import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Package, MapPin, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/orders/myorders');
        setOrders(res.data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-4 bg-primary/10 text-primary rounded-xl">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <p className="text-muted-foreground font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold">{orders.length}</h3>
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-4 bg-primary/10 text-primary rounded-xl">
            <MapPin className="h-8 w-8" />
          </div>
          <div>
            <p className="text-muted-foreground font-medium">Saved Address</p>
            <h3 className="text-lg font-semibold truncate max-w-[200px]">
              {user?.address || 'No address saved'}
            </h3>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center space-x-4 cursor-pointer hover:bg-secondary/50 transition-colors">
          <div className="p-4 bg-primary/10 text-primary rounded-xl">
            <Settings className="h-8 w-8" />
          </div>
          <div>
            <p className="text-muted-foreground font-medium">Account</p>
            <h3 className="text-lg font-semibold">Settings</h3>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No orders found. Time to grab a bite!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-secondary/30 text-muted-foreground">
                <tr>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium">#{order._id.substring(0, 8)}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold">${order.totalPrice.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
