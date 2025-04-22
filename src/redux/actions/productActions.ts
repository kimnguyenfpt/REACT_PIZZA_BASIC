import Pizza from '../../models/Pizzza.model';

export const GET_PIZZA = 'GET_PIZZA';
export const ADD_PIZZA = 'ADD_PIZZA';
export const UPDATE_PIZZA = 'UPDATE_PIZZA';
export const REMOVE_PIZZA = 'REMOVE_PIZZA';

export const getPizzas = (data: Pizza[]) => ({
  type: GET_PIZZA,
  payload: data,
});

export const addPizza = (pizza: Pizza) => ({
  type: ADD_PIZZA,
  payload: pizza,
});

export const updatePizza = (pizza: Pizza) => ({
  type: UPDATE_PIZZA,
  payload: pizza,
});

export const removePizza = (id: number) => ({
  type: REMOVE_PIZZA,
  payload: id,
});
