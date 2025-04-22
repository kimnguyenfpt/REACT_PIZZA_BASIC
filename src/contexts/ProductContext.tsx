import React, { createContext, useContext, useState, ReactNode } from 'react';
import Pizza from '../models/Pizzza.model';

const ProductContext = createContext<{
    pizzas: Pizza[];
    removePizza: (id: number) => void;
}>({
    pizzas: [],
    removePizza: () => {},
});

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);

    const removePizza = (id: number) => {
        setPizzas(prev => prev.filter(pizza => pizza.id !== id));
    };

    return (
        <ProductContext.Provider value={{ pizzas, removePizza }}>
            {children}
        </ProductContext.Provider>
    );
};
