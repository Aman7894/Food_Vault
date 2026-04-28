import React from 'react';
import { ChefHat } from 'lucide-react';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
        <img src="/food_logo.png" alt="Logo" className="h-20 w-20 rounded-full object-cover border-4 border-primary/30 shadow-xl animate-bounce relative z-10" />
        <p className="mt-4 text-xl font-semibold text-foreground animate-pulse">Food Meal Locker</p>
      </div>
    </div>
  );
};

export default Loader;
