import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const FoodCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, 1);
  };

  return (
    <div className="group relative rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-xl leading-tight truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{product.vendor?.name || 'Local Vendor'}</p>
          </div>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-transparent">
            {product.category}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mt-3 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center rounded-full p-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
