import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, User, LogOut, Sun, Moon, ChefHat } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearCart();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-6">
            <Link to="/" className="hidden md:flex items-center space-x-3">
              <img src="/food_logo.png" alt="Food Meal Locker Logo" className="h-10 w-10 rounded-full object-cover border-2 border-primary/20 shadow-sm" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-rose-400">
                Food Meal Locker
              </span>
            </Link>
            <Link to="/" className="md:hidden flex items-center">
              <img src="/food_logo.png" alt="Food Meal Locker Logo" className="h-10 w-10 rounded-full object-cover border-2 border-primary/20 shadow-sm" />
            </Link>
            <Link
              to="/contact"
              className="hidden sm:block font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user && (
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-secondary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="font-medium hover:text-primary transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
