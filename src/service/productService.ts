import axios from 'axios';
import Pizza from '../models/Pizzza.model';

const BASE_URL = 'https://68075345e81df7060eb9b8af.mockapi.io/products';

export const getPizzas = () => axios.get<Pizza[]>(BASE_URL);
export const addPizza = (pizza: Omit<Pizza, 'id'>) => axios.post(BASE_URL, pizza);
export const updatePizza = (pizza: Pizza) => axios.put(`${BASE_URL}/${pizza.id}`, pizza);
export const deletePizza = (id: string) => axios.delete(`${BASE_URL}/${id}`);
