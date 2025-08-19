// filepath: src/components/Header.tsx
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="bg-black text-white text-center p-2 text-sm w-full">
        Frete grátis para todo o Brasil
      </div>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Project Bolt
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-blue-600">
              Admin
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-600 hover:text-blue-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}