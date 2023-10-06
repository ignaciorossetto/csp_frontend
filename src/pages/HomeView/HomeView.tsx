import { faEye, faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// const arr = [
//   {
//       id: 1,
//       name: 'Cemento Holcim',
//       category: 'Corralon',
//       last_price: {
//         price: 4.3,
//         date: '20/09/2023'
//       },
//       best_price: {
//         price: 3.5,
//         date: '20/09/2021'
//       },
//       avg_price: 4.0
//   },
//   {
//       id: 2,
//       name: 'Hercal Holcim',
//       category: 'Corralon',
//       last_price: {
//         price: 4.3,
//         date: '20/09/2023'
//       },
//       best_price: {
//         price: 3.5,
//         date: '20/09/2021'
//       },
//       avg_price: 4.0
//   },
//   {
//       id: 3,
//       name: 'Hierro 4.2',
//       category: 'Corralon',
//       last_price: {
//         price: 4.3,
//         date: '20/09/2023'
//       },
//       best_price: {
//         price: 3.5,
//         date: '20/09/2021'
//       },
//       avg_price: 4.0
//   },
//   {
//       id: 4,
//       name: 'Hierro 6',
//       category: 'Otros',
//       last_price: {
//         price: 4.3,
//         date: '20/09/2023'
//       },
//       best_price: {
//         price: 3.5,
//         date: '20/09/2021'
//       },
//       avg_price: 4.0
//   },
//   {
//       id: 5,
//       name: 'Hierro 8',
//       category: 'Plomeria',
//       last_price: {
//         price: 4.3,
//         date: '20/09/2023'
//       },
//       best_price: {
//         price: 3.5,
//         date: '20/09/2021'
//       },
//       avg_price: 4.0
//   },

// ]

type SupplyStat = {
  id_supply: number,
  Supply: {
    name: string,
    Category: {
      id_category: number,
      name: string
    }
  },
  avg_price: string | number,
  max_price: string | number,
  min_price: string | number,
  most_recent_dolar_price: string | number,
  date_of_max_price: string | Date,
  date_of_min_price: string ,
}

const HomeView = () => {
  const [suppliesArr, setSuppliesArr] = useState<[SupplyStat] | null>(null)
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    const fetchSuppliesStats = async() => {
      setLoading(true)
      const {data} = await axios.get('http://localhost:8000/api/v1/quotes/stats')
      setLoading(false)
      setSuppliesArr(data.message.sort((a:SupplyStat, b:SupplyStat) => a.id_supply - b.id_supply))
    }
    fetchSuppliesStats()
  }, [])



  return (
    <div>
      {
        loading ? <FontAwesomeIcon icon={faSpinner} spin className="text-center w-full my-10 text-5xl"/> : 
      
    <table className="border-collapse table-auto w-full text-md text-center mt-5">
      <thead>
        <tr 
          className="
              [&>th]:border-b
              [&>th]:dark:border-slate-600
              [&>th]:dark:text-slate-200
              [&>th]:p-4
              [&>th]:pl-8
              [&>th]:pt-0
              [&>th]:pb-3
              [&>th]:text-slate-800
              [&>th]:font-bold
              [&>th]:text-left
            "
        >
          <th>ID</th>
          <th>MATERIAL</th>
          <th>CATEGORIA</th>
          <th>ULTIMO PRECIO</th>
          <th>MEJOR PRECIO</th>
          <th>PRECIO PROMEDIO</th>
          <th>DETALLES</th>
          <th>AGREGAR REGISTRO</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800 text-black font-medium [&>tr]:duration-150">
        {
          suppliesArr &&
          suppliesArr.map((e, index)=> 
          <tr key={e?.id_supply} className={`${index%2 === 0 ? 'bg-slate-50' : 'bg-slate-200'} hover:bg-slate-400`}>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8  dark:text-slate-400">{e.id_supply}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4  dark:text-slate-400 text-left">{e.Supply.name}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400 text-left">{e.Supply.Category.name}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400">
              <div>
                ${e.most_recent_dolar_price}
              </div>
            </td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400">
            <div>
              ${e.min_price}
              </div>
              <div>
                {e.date_of_min_price.split('T')[0]}
              </div>
            </td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400">${e.avg_price}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400 ">
              <Link to={`/material/${e.id_supply}`}>
                <FontAwesomeIcon icon={faEye} size="xl" className=" hover:scale-110 active:scale-100 text-green-300 bg-slate-500 p-2 rounded-md text-center"/>
              </Link>
            </td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 dark:text-slate-400 ">
              <Link to={`/add?id=${e.id_supply}`}>
                <FontAwesomeIcon icon={faPlusSquare} size="xl" className="hover:scale-110 active:scale-100 duration-100 text-green-300 rounded-md bg-slate-500 p-2"/>
              </Link>
            </td>
          </tr>
          )
        }
      
      </tbody>
    </table>
    }
    </div>
  )
}

export default HomeView