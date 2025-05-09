
import CardPizza from '../sections/CardPizza';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { getPizzas as getPizzasAction, removePizza } from '../redux/actions/productActions';
import { getPizzas } from '../service/productService';

const HomePages = () => {
    const dispatch = useDispatch();
    const pizzas = useSelector((state: RootState) => state.product.pizzas);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const res = await getPizzas();
                dispatch(getPizzasAction(res.data));
            } catch (err) {
                console.error('❌ Lỗi khi gọi API:', err);
            }
        };
        fetchPizzas();
    }, [dispatch]);

    const handleRemovePizza = (id: string) => {
        console.log(id);
        dispatch(removePizza(id));
    }

    return (
        <div className="min-h-[calc(100vh-200px)] p-4 sm:p-6 lg:p-10 overflow-auto">
            <div className="grid grid-cols-1 gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    pizzas.map(pizza => 
                        <CardPizza key={pizza.id} {...pizza} handleRemovePizza={handleRemovePizza} />)
                }

                {/* <ItemsPizza id={person.id} name={person.name} desc={person.desc} handleChangePerson={handleChangePerson} /> */}
            </div>
        </div>
    );
};

export default HomePages;
