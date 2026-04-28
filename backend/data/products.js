const products = [
  // Appetizers
  {
    name: 'Crispy Bruschetta',
    description: 'Toasted sourdough topped with fresh tomatoes, garlic, basil and a drizzle of extra virgin olive oil.',
    price: 8.99,
    category: 'Appetizer',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&q=80',
  },
  {
    name: 'Spinach Artichoke Dip',
    description: 'Creamy warm dip with spinach, artichoke hearts, and melted parmesan, served with tortilla chips.',
    price: 10.99,
    category: 'Appetizer',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&q=80',
  },
  {
    name: 'Loaded Potato Skins',
    description: 'Crispy potato skins loaded with cheddar cheese, bacon bits, sour cream and green onions.',
    price: 9.49,
    category: 'Appetizer',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=500&q=80',
  },
  // Main Course
  {
    name: 'Grilled Chicken Tikka Masala',
    description: 'Tender grilled chicken in a rich, aromatic tomato-cream sauce with fragrant spices. Served with basmati rice.',
    price: 18.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80',
  },
  {
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with guanciale, eggs, Pecorino Romano, and black pepper – no cream added.',
    price: 16.49,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&q=80',
  },
  {
    name: 'BBQ Beef Burger',
    description: 'Juicy 8oz beef patty with smoky BBQ sauce, crispy onion rings, cheddar and brioche bun.',
    price: 14.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
  },
  {
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon fillet pan-seared to perfection with lemon butter sauce and seasonal vegetables.',
    price: 22.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80',
  },
  {
    name: 'Butter Chicken Curry',
    description: 'Slow-cooked chicken in a velvety tomato and butter sauce with Indian spices. A comfort food classic.',
    price: 17.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80',
  },
  {
    name: 'Margherita Pizza',
    description: 'Wood-fired pizza with San Marzano tomato sauce, fresh mozzarella, and basil on a thin crispy crust.',
    price: 15.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
  },
  // Desserts
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm dark chocolate cake with a gooey molten center, served with vanilla bean ice cream.',
    price: 9.99,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80',
  },
  {
    name: 'Classic Tiramisu',
    description: 'Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with fine cocoa powder.',
    price: 8.49,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80',
  },
  {
    name: 'New York Cheesecake',
    description: 'Rich and creamy New York-style cheesecake on a graham cracker crust with fresh berry compote.',
    price: 7.99,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500&q=80',
  },
  // Beverages
  {
    name: 'Tropical Mango Smoothie',
    description: 'Blended fresh mango, pineapple, coconut milk and a squeeze of lime. Refreshingly tropical.',
    price: 6.49,
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&q=80',
  },
  {
    name: 'Artisan Cold Brew Coffee',
    description: 'Steeped for 24 hours, our signature cold brew is smooth, bold and served over hand-carved ice.',
    price: 5.99,
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80',
  },
  {
    name: 'Fresh Lemonade',
    description: 'Hand-squeezed lemonade with a hint of mint and honey. Perfectly balanced sweet and tart.',
    price: 4.49,
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&q=80',
  },
  // Snacks
  {
    name: 'Truffle Parmesan Fries',
    description: 'Golden crispy fries tossed with truffle oil, freshly grated Parmesan, and herbs.',
    price: 7.99,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80',
  },
  {
    name: 'Chicken Wings (8 pcs)',
    description: 'Crispy chicken wings tossed in your choice of Buffalo, Honey Garlic, or BBQ sauce.',
    price: 13.99,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&q=80',
  },
  // Vegan
  {
    name: 'Vegan Buddha Bowl',
    description: 'Quinoa, roasted sweet potato, avocado, chickpeas, kale, and tahini dressing. Nourishing and vibrant.',
    price: 14.99,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
  },
  {
    name: 'Plant-Based Burger',
    description: 'Juicy plant-based patty with all the fixings on a whole wheat bun. You won\'t miss the meat.',
    price: 13.49,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80',
  },
  {
    name: 'Roasted Veggie Wrap',
    description: 'Seasonal roasted vegetables, hummus, feta (optional), and arugula in a spinach tortilla.',
    price: 11.99,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80',
  },
];

module.exports = products;
