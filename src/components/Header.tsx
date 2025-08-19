import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Store, Phone, Mail, Truck, Shield, Clock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';

export const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const { settings } = useStore();
  const itemCount = getItemCount();

  return (
    <>
      {/* Banner acima do header */}
      {settings?.header_banner_url && (
        <div className="w-full sticky top-0 z-50 bg-gray-100">
          <img
            src={settings.header_banner_url}
            alt="Banner"
            className="w-full h-auto max-h-[60px] sm:max-h-[80px] md:max-h-[100px] object-contain"
          />
        </div>
      )}

      <header className="shadow-md z-40 sticky top-0" style={{ backgroundColor: settings?.background_color || '#ffffff' }}>
      {/* Top bar com informações de contato */}
      {(settings?.contact_phone || settings?.contact_email) && (
        <div className="border-b" style={{ backgroundColor: settings?.primary_color || '#3b82f6' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-8 text-sm text-white">
              <div className="flex items-center space-x-4">
                {settings?.contact_phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>{settings.contact_phone}</span>
                  </div>
                )}
                {settings?.contact_email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{settings.contact_email}</span>
                  </div>
                )}
              </div>
              <div className="hidden md:block">
                <span>{settings?.store_slogan}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2">
            {settings?.logo_url ? (
              <img
                src={settings.logo_url} 
                alt={settings.store_name}
                className="h-8 sm:h-12 w-auto max-w-32 sm:max-w-48 object-contain"
              />
            ) : (
              <Store className="h-8 sm:h-12 w-8 sm:w-12" style={{ color: settings?.primary_color || '#3b82f6' }} />
            )}
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {settings?.store_name}
            </span>
          </Link>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-2 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart 
                className="h-6 w-6" 
              />
              <span 
                className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                style={{ backgroundColor: settings?.primary_color || '#3b82f6' }}
              >
                {itemCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
      </header>
    </>
  );
};