import pizzaImg from '../assets/img/pizza.png';
import pizzaImg2 from '../assets/img/pizza-hai-san.png';
import CardPizza from '../sections/CardPizza';
import { useEffect, useState } from 'react';
import Pizza from '../models/Pizzza.model';
import {getPizzas} from '../service/productService'


const HomePages = () => {

    const[pizzas, setPizzas]  = useState<Pizza[]>([]);

    useEffect(() => {
        const fetchPizzas = async () => {
          try {
            const res = await getPizzas();
            setPizzas(res.data);
          } catch (err) {
            console.error('❌ Lỗi khi gọi API:', err);
          }
        };
        fetchPizzas();
      }, []);

    const handleRemovePizza = (id: number) => {
        console.log(id);
        const newPizzas = pizzas.filter(pizza => pizza.id !== id)
        setPizzas(newPizzas)
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
