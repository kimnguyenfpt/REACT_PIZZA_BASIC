import { ThemeProvider } from './ThemeContext';
import { ProductProvider } from '../contexts/ProductContext';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
