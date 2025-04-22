import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import AppProviders from './contexts/AppProviders';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Provider store={store}>
          <Router />
        </Provider>
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;

