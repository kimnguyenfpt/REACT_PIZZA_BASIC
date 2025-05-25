import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import Product from '../models/Product.model';

interface CardPizzaProps extends Product {
  handleRemovePizza: (id: string) => void;
}

const CardPizza: React.FC<CardPizzaProps> = ({
  id,
  name,
  description,
  price,
  image,
  handleRemovePizza
}) => {
  return (
    <div className="relative bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      {/* Ảnh Pizza */}
      <div className="w-full h-40 bg-gray-100 dark:bg-[#2c2c2c] flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="object-contain h-full transition-transform group-hover:scale-105"
        />
      </div>

      {/* Nội dung */}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold text-[#14274e] dark:text-white truncate">{name}</h3>
        <p className="text-sm text-gray-600 truncate dark:text-gray-300">{description}</p>
        <p className="mt-2 text-base font-semibold text-red-500">{price.toLocaleString()}₫</p>
      </div>

      {/* Nút xoá */}
      <button
        onClick={() => handleRemovePizza(id)}
        className="absolute p-2 text-white bg-red-500 rounded-full shadow-md top-2 right-2 hover:bg-red-600"
        name="Xoá"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CardPizza;
