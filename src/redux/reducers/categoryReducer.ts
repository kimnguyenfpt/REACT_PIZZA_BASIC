import Category from "../../models/Category.model";
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  GET_CATEGORIES,
} from "../actions/categoryActions";

type CategoryState = {
  categories: Category[];
};

const initialState: CategoryState = {
  categories: [],
};

const categoryReducer = (state = initialState, action: any): CategoryState => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };
    default:
      return state;
  }
};

export default categoryReducer; 