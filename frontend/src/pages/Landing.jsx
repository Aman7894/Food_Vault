import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import Loader from '../components/Loader';
import { Search } from 'lucide-react';

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['All', 'Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Snack', 'Vegan', 'Other'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = [];
        if (keyword) queryParams.push(`keyword=${keyword}`);
        if (category && category !== 'All') queryParams.push(`category=${category}`);
        
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const res = await axios.get(`http://localhost:5000/api/v1/products${queryString}`);
        setProducts(res.data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [keyword, category]);

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="relative bg-secondary/30 py-24 mb-12 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-rose-400">Food Meal Locker</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Discover and order from the best local chefs and restaurants. 
              Premium quality food delivered right to your door.
            </p>
            
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search for food..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-background border-2 border-border focus:border-primary focus:ring-primary shadow-lg outline-none transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                (category === c || (c === 'All' && !category))
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <FoodCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-muted-foreground">No food items found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
