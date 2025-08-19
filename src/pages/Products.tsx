// filepath: src/pages/Product.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../lib/supabase';
import { Product as ProductType } from '../types/Product';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

export function Products() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addProduct } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const data = await getProductById(id);
        setProduct(data);
        if (data && data.imageUrl) {
          setSelectedImage(data.imageUrl);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addProduct(product);
      toast.success(`${product.name} foi adicionado ao carrinho!`);
    }
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  const imageGallery = [
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
  ].filter(Boolean) as string[];

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Coluna da Galeria de Imagens */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={selectedImage || ''}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {imageGallery.map((img, index) => (
              <div
                key={index}
                className={`aspect-square bg-gray-100 rounded-md cursor-pointer overflow-hidden border-2 ${
                  selectedImage === img ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Coluna de Informações do Produto */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-blue-600 mb-6">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}