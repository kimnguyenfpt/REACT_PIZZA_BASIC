import CardPizza from '../sections/CardPizza';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { getProducts as getProductsAction, deleteProduct } from '../redux/slices/productSlice';
import { getProducts } from '../service/productService';
import Product from '../models/Product.model';

const HomePages = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.product.products);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const res = await getProducts();
                dispatch(getProductsAction(res.data));
            } catch (err) {
                console.error('❌ Lỗi khi gọi API:', err);
            }
        };
        fetchPizzas();
    }, [dispatch]);

    const handleRemovePizza = (id: string) => {
        console.log(id);
        dispatch(deleteProduct(id));
    }

    return (
        <div className="min-h-[calc(100vh-200px)] p-4 sm:p-6 lg:p-10 overflow-auto">
            <div className="grid grid-cols-1 gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    products.map((product: Product) => 
                        <CardPizza key={product.id} {...product} handleRemovePizza={handleRemovePizza} />)
                }

                {/* <ItemsPizza id={person.id} name={person.name} desc={person.desc} handleChangePerson={handleChangePerson} /> */}
            </div>
        </div>
    );
};

export default HomePages;
