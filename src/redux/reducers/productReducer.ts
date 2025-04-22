import Pizza from "../../models/Pizzza.model";
import {
  ADD_PIZZA,
  UPDATE_PIZZA,
  REMOVE_PIZZA,
  GET_PIZZA,
} from "../actions/productActions";

type ProductState = {
  pizzas: Pizza[];
};

const initialState: ProductState = {
  pizzas: [],
};

const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case GET_PIZZA:
      return { ...state, pizzas: action.payload };

    case ADD_PIZZA:
      return { ...state, pizzas: [...state.pizzas, action.payload] };
    case UPDATE_PIZZA:
      return {
        ...state,
        pizzas: state.pizzas.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case REMOVE_PIZZA:
      return {
        ...state,
        pizzas: state.pizzas.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;
