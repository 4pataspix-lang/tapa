// filepath: src/components/Header.tsx


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';


export function Header() {
  const { items } = useCart();
  const cartItemCount = (items ?? []).reduce((sum, item) => sum + item.quantity, 0);
  const { settings } = useStore();



  // Banner dinâmico: usa o header_banner_url se existir, senão banner_url, senão fallback
  const bannerUrl = settings?.header_banner_url || settings?.banner_url || '/banner.jpg';
  // Logo dinâmica: usa logo_url das configurações, senão fallback
  const logoUrl = settings?.logo_url || '/logo.png';

  // Estado de carregamento do banner
  const [bannerLoaded, setBannerLoaded] = useState(false);

  return (
    <>
      {/* Banner dinâmico da loja */}
      <div className="w-full m-0 p-0" style={{margin:0,padding:0,lineHeight:0}}>
        {!bannerLoaded && (
          <div className="w-full flex items-center justify-center bg-gray-100 animate-pulse" style={{height:80,minHeight:80}}>
            <span className="text-xs text-gray-400">Carregando banner...</span>
          </div>
        )}
        <img
          src={bannerUrl}
          alt="Banner da loja"
          className="w-full max-h-40 sm:max-h-56 md:max-h-72 lg:max-h-80 xl:max-h-96 object-contain object-top m-0 p-0 border-0"
          style={{ minHeight: 80, width: '100%', margin: 0, padding: 0, display: 'block', position:'relative', top:0, left:0, zIndex:2 }}
          onLoad={()=>setBannerLoaded(true)}
          onError={()=>setBannerLoaded(true)}
        />
      </div>
      <header className="bg-white shadow-md sticky top-0 z-40 m-0 p-0" style={{margin:0,padding:0}}>
        <div className="container mx-auto px-0 py-4 flex justify-between items-center m-0 p-0" style={{margin:0,padding:0}}>
          {/* Logo da loja */}
          <Link to="/" className="flex items-center">
            <img src={logoUrl} alt="Logo" className="h-10 w-auto mr-2" />
            {/* Se quiser texto junto da logo, descomente a linha abaixo */}
            {/* <span className="text-2xl font-bold text-gray-800">Sua Loja</span> */}
          </Link>
          <nav className="flex items-center space-x-6">
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