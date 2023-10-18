import { Link, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import LineChart from '../../components/Chart/LineChart'
import axios from 'axios'
import Swal from 'sweetalert2'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

type supplyType = {
    id_quote: number,
    price: number,
    dolar_rate: number,
    supply_dolar_price: string | number,
    date: string,
    Supply:{
        name:string,
        Category:{
            id_category: number,
            name: string,
        }
    },
    Supplier: {
        name:string
    }
}

type supplyStatsType = {
    id_supply: number,
    min_price: string | number,
    date_of_min_price: string,
    avg_price: string,
    max_price: string | number,
    date_of_max_price: string,
    most_recent_dolar_price: string | number,
}


const DetailsView = () => {
    const {id} = useParams()
    const [supplyArr, setSupplyArr] = useState<[supplyType] | null>(null)
    const [suppliesDate,  setSuppliesDate] = useState<[]>([])
    const [suppliesPrice, setsuppliesPrice] = useState([])
    const [supplyStats, setSupplyStats] = useState<[supplyStatsType] | null>(null)
    const [loading, setLoading] = useState(false)

    const handleDeleteRecordClick = async(quoteId:number) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Borrar un registro es irreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                setLoading(true)
                try {
                    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes/${quoteId}`)
                    if (response) {
                        fetchSupplyStats()
                    }
                    setLoading(false)
                    Swal.fire(
                      'Registro Borrado!',
                      'El registro se elimino correctamente.',
                      'success'
                    )
                } catch (error) {
                    setLoading(false)
                    Swal.fire(
                        'Intenta mas tarde...',
                        'No pudimos eliminar el registro!!',
                        'error'
                      )
                }
            }
          })
    }

    const fetchSupplyStats = async() => {
      setLoading(true)
      const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes/find/${id}`)
      setLoading(false)
      setSupplyArr(data.payload)
      setSupplyStats(data?.stats)
      setSuppliesDate(data.payload.map((e: supplyType)=>e.date.split('T')[0]).reverse())
      setsuppliesPrice(data.payload.map((e: supplyType)=>e.supply_dolar_price).reverse())
    }
    useEffect(()=> {
        fetchSupplyStats()
      }, [])


  return (
    <div className='flex flex-col '>
        {
            loading ? 
            <LoadingSpinner classes='text-5xl w-full text-center mt-7'/>
            : 
            <>
        
            {supplyArr && 
                <div className=' flex gap-5 items-center justify-center text-xl p-3 bg-teal-700 text-white my-3 w-full'>
                        <div className='underline underline-offset-4'>{supplyArr[0]?.Supply?.name}</div>
                        <div>-</div>
                        <div>{supplyArr[0]?.Supply?.Category.name}</div>
                        <div>-</div>
                        <Link to={'/add'} className='px-3 py-2 bg-emerald-200 rounded-xl cursor-pointer hover:scale-110 duration-150 font-semibold text-black'>Agregar registro</Link>
                </div>
            }
            {
                supplyStats && 
            
        <div className='flex gap-3 justify-around my-5'>
            <div className='p-3 bg-teal-500 text-white rounded-lg shadow-2xl'>
                <div className='font-bold text-xl'>
                    Precio bajo
                </div>
                <div className='text-lg font-semibold my-2'>
                    us$ {supplyStats[0]?.min_price}
                </div>
                <div className='font-medium text-lg'>
                {supplyStats[0]?.date_of_min_price.split('T')[0]}
                </div>
            </div>
            <div className='p-3 bg-teal-900 text-white rounded-lg shadow-2xl'>
                <div className='font-bold text-xl'>
                    Precio promedio
                </div>
                <div className='text-lg font-semibold my-2'>
                    us$ {parseFloat(supplyStats[0]?.avg_price).toFixed(2)}
                </div>
            </div>
            <div className='p-3 bg-red-900 text-white rounded-lg shadow-2xl'>
                <div className='font-bold text-xl'>
                    Precio alto
                </div>
                <div className='text-lg font-semibold my-2'>
                    us$ {supplyStats[0]?.max_price}
                </div>
                <div className='font-medium text-lg'>
                {supplyStats[0]?.date_of_max_price.split('T')[0]}
                </div>
            </div>
            
        </div>
        }
        <div className='my-5'>
        <table className="border-collapse table-auto w-full text-md text-center mt-5 my-3">
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
              [&>th]:text-center
            "
        >
          <th>
            <p>FECHA</p>
            <p>yyyy-mm-dd</p>
          </th>
          <th>PROVEEDOR</th>
          <th>PRECIO $</th>
          <th>TC DOLAR</th>
          <th>PRECIO US$</th>
          <th>MODIFICAR</th>
          <th>ELIMINAR</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800 text-black font-medium [&>tr]:duration-150 ">
        {
          supplyArr?.map((e, index)=> 
          <tr key={index} className={`${index%2 === 0 ? 'bg-slate-50' : 'bg-slate-200'} hover:bg-slate-400 text-center`}>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8  dark:text-slate-400 ">{e.date.split('T')[0]}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4  dark:text-slate-400 ">{e.Supplier.name}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400 ">$ {e.price}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400">us$ {e.dolar_rate}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400">us$ {e.supply_dolar_price}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400">
                <FontAwesomeIcon icon={faEdit} size='xl' className='cursor-pointer hover:scale-110 duration-100 text-blue-500'/>
            </td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400 ">
                <FontAwesomeIcon icon={faTrashCan} size='xl' className='cursor-pointer hover:scale-110 duration-100 text-red-500' onClick={()=> handleDeleteRecordClick(e.id_quote)}/>
            </td>
          </tr>
          )
        }
      
            </tbody>
            </table>
        </div>
        {
            supplyArr &&
         <div className='my-5 mb-5'>
             <LineChart suppliesDate={suppliesDate}  suppliesPrice={suppliesPrice} name={supplyArr[0]?.Supply.name}/>
         </div>
        }
        </>

        }
    </div>
  )
}

export default DetailsView