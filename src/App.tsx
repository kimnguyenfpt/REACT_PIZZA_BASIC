import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import AppProviders from './contexts/AppProviders';

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Router />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
