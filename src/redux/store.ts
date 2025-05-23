import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  auth: authReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
