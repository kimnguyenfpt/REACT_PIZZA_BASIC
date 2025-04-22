import Pizza from "../models/Pizzza.model"

type Props = Pizza & {
    handleChangePerson: (data: Pizza) => void
}

const ItemsPizza = ({
    id,
    name,
    desc,
    price,  
    handleChangePerson
}: Props) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{desc}</p>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={() => handleChangePerson({
                id: id,
                name: 'Kim Nguyên nè',
                desc: 'Hoc react',
                price: 100000
            })}>Change Person</button>
        </div>
    )
}

export default ItemsPizza;
