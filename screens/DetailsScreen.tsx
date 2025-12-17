
import React, { useState } from 'react';
import { Product } from '../types';
import QuantitySelector from '../components/QuantitySelector';
import ThemeToggle from '../components/ThemeToggle';

interface DetailsScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ product, onBack, onAddToCart, isFavorite, onToggleFavorite }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };
  
  const handleFavoriteClick = () => {
    onToggleFavorite(product.id);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1C1C1E]">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary-darker/20 dark:bg-primary-darker/10 rounded-full blur-[100px] z-0" style={{ pointerEvents: 'none' }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[200px] h-[200px] bg-primary-darker/10 dark:bg-primary-darker/5 rounded-full blur-[80px] z-0" style={{ pointerEvents: 'none' }}></div>

        <header className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-6 pt-8">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-gray-800 dark:text-white transition-opacity hover:opacity-75">
                <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
        </header>

                <div className="relative flex-1 flex flex-col items-center justify-center z-10 pt-16 pb-8">
                        <div className="relative w-56 h-56">
                            <img alt={product.name} className="w-full h-full object-cover drop-shadow-2xl rounded-3xl" src={product.image} />
                            <button
                                onClick={handleFavoriteClick}
                                className="w-8 h-8 flex items-center justify-center text-red-500 bg-white dark:bg-[#23243a] rounded-full shadow-lg transition-opacity hover:opacity-75 border border-gray-200 dark:border-gray-700 absolute left-1/2 -translate-x-1/2 -top-3"
                                style={{ zIndex: 20 }}
                                aria-label="Favoritar"
                            >
                                <span
                                    className="material-symbols-outlined text-lg"
                                    style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
                                >
                                    favorite
                                </span>
                            </button>
                        </div>
                </div>
        
        <div className="relative z-20 bg-white/80 dark:bg-[#1C1C1E]/95 backdrop-blur-xl rounded-t-3xl p-5 pb-7 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/20 dark:border-white/5 flex flex-col gap-4">
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-2 opacity-50"></div>
            <div className="flex justify-between items-start gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight flex-1">
                    {product.name}
                </h1>
                <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                {product.longDescription}
            </p>
            
            <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => <span key={i} className="material-symbols-outlined text-primary-darker text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-base">star</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(4.5)</span>
            </div>
            
            <div className="mt-auto pt-4 flex items-center justify-between gap-1">
                <div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                </div>
                <button onClick={handleAddToCart} className="group relative overflow-hidden bg-primary-darker text-gray-900 px-2 py-4 rounded-t-2xl rounded-b-3xl rounded-tl-none font-bold text-base shadow-lg shadow-primary-darker/30 active:scale-95 transition-all min-w-[180px] flex items-center justify-center gap-3 ml-2 sm:ml-4">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span>Adicionar ao carrinho</span>
                    <span className="bg-white/30 p-0.5 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm font-bold">shopping_bag</span>
                    </span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default DetailsScreen;
