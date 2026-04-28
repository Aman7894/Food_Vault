import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { CheckCircle2, Clock, Truck, PackageCheck, AlertCircle } from 'lucide-react';

const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/orders/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        setError('Order not found or you are not authorized to view it.');
      }
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="p-6 bg-destructive/10 rounded-full mb-6 text-destructive">
          <AlertCircle className="h-16 w-16" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Oops!</h2>
        <p className="text-muted-foreground mb-8 text-center">{error}</p>
        <Link to="/dashboard" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  const steps = [
    { status: 'Pending', icon: Clock, label: 'Order Placed' },
    { status: 'Processing', icon: PackageCheck, label: 'Preparing Food' },
    { status: 'Shipped', icon: Truck, label: 'Out for Delivery' },
    { status: 'Delivered', icon: CheckCircle2, label: 'Delivered' },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass p-8 rounded-3xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-green-500/10 text-green-500 rounded-full mb-4">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">Order #{order._id}</p>
        <p className="text-muted-foreground text-sm mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <div className="glass p-8 rounded-3xl mb-8">
        <h2 className="text-xl font-bold mb-8">Order Status</h2>
        
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/50"></div>
          
          <div className="space-y-8 relative">
            {steps.map((step, index) => {
              const isCompleted = currentStepIndex >= index;
              const isCurrent = currentStepIndex === index;
              const Icon = step.icon;
              
              return (
                <div key={step.status} className="flex items-center space-x-6 relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-colors duration-500
                    ${isCompleted ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-secondary text-muted-foreground'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </h3>
                    {isCurrent && (
                      <p className="text-sm text-primary font-medium animate-pulse">
                        Current Status
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
          <p className="text-muted-foreground">{order.deliveryAddress}</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.qty}x {item.name}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-border/50 flex justify-between font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
