import { faBuilding } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

type dolarBlueType = { value_avg: number, value_sell: number, value_buy: number }


const Header = () => {
    const {pathname} = useLocation()
    const [urlPath, setUrlPath] = useState('')
    const [dolarPrice, setDolarPrice] = useState<dolarBlueType | null>(null)
    const [dolarPriceError, setdolarPriceError] = useState<string | null>(null)
    const [loadingDolarPerDay, setLoadingDolarPerDay] = useState(false)
    const [dolarPerDayDate, setDolarPerDayDate] = useState('')
    const [dolarPerDatePrice, setDolarPerDatePrice] = useState<dolarBlueType | null>(null)

    useEffect(()=> {
        const fetchDolarPrice = async():Promise<object> => {
            try {
                const {data: {blue}} = await axios.get('https://api.bluelytics.com.ar/v2/latest')
                setDolarPrice(blue)
                return blue        
            } catch (error) {
                setdolarPriceError('No se pudo cargar el precio del dolar')
                return {message: 'No se pudo cargar el precio del dolar'}
            }
        }
        fetchDolarPrice()
        
    },[])

    useEffect(()=> {
        setUrlPath(pathname)
    },[pathname])

    const handleDolarPerDayClick = async() => {
        setLoadingDolarPerDay(true)
        try {
            const response = await axios.get(`https://api.bluelytics.com.ar/v2/historical?day=${dolarPerDayDate}`)
            setDolarPerDatePrice(response.data.blue)
            setLoadingDolarPerDay(false)
        } catch (error) {
            setLoadingDolarPerDay(false)
            
        }
    }

  return (
    <>
    <div className="flex justify-between items-center h-[100px]">
        <Link to={'/'} className='text-3xl'>
            <FontAwesomeIcon icon={faBuilding}/> C S P
        </Link>
        <div className="flex gap-5 [&>a]:bg-cyan-700 [&>a]:text-white [&>a]:font-[600] [&>a]:text-[20px] [&>a]:p-2 [&>a:hover]:scale-110 [&>a]:cursor-pointer [&>a]:rounded-lg [&>a]:duration-200">
            <Link to={'/add'}>
                Nuevo presupuesto
            </Link>
            <Link to={'/'}>
                Comparar
            </Link>
            <Link to={'/login'}>
                Login
            </Link>
        </div>
    </div>
    <div className="flex gap-5 p-5 items-center justify-center bg-cyan-800 bg-opacity-50">
        <div className="text-xl font-bold">
            DOLAR BLUE
        </div>
        {
            dolarPriceError ? <div>{dolarPriceError}</div> : 
        <div className='text-xl font-medium'>
            {dolarPrice ? `$${dolarPrice?.value_sell} - $${dolarPrice.value_buy}` : <FontAwesomeIcon icon={faSpinner} spin/>}
        </div>

        }
    </div>
    {
        urlPath === '/' &&
    
    <div className="flex gap-5 p-5 items-center justify-center bg-opacity-50">
        <div>
            <label htmlFor="" className='font-bold text-xl border-2 rounded-lg p-3 shadow-xl'>
                Material: 
                <input type='text' className='p-2 text-lg focus:outline-none mx-2'/>
            </label>
        </div>
        <div>
            <label htmlFor="" className='font-bold text-xl border-2 rounded-lg p-3 shadow-xl'>
                Orden:
                <select className='focus:outline-none mx-2 p-2'>
                    <option value="">-</option>
                    <option value="">Fecha ascendente</option>
                    <option value="">Fecha descendente</option>
                </select>
            </label>
        </div>
    </div>
    }
    {
        urlPath === '/add' &&
        <>
            <div className='h-[75px] bg-teal-600 mt-5 flex items-center justify-center gap-5'>
                <div className='font-bold text-[20px]'>
                    Dolar blue por fecha:
                </div>
                <input onChange={(e)=>setDolarPerDayDate(e.target.value)} type="date" name="" id="" className='px-5 py-1'/>
                <button onClick={handleDolarPerDayClick} className='px-5 py-2 bg-teal-900 rounded-xl hover:scale-110 duration-150 active:scale-100 text-lg font-semibold text-white'>
                    Buscar
                </button>
            </div>
            <div>
                {
                    dolarPerDatePrice && 
                    <>
                {
                    loadingDolarPerDay ? <FontAwesomeIcon icon={faSpinner} spin size='2xl' className='text-center w-full mt-5'/> : 
                    <div className='w-full mt-5 flex gap-7 justify-center'>
                        <div className='p-3 w-[150px] text-center bg-slate-50 font-semibold text-[18px] shadow-2xl rounded-2xl'>
                            <div>Dolar compra</div>    
                            <div>us$ {dolarPerDatePrice.value_sell}</div>
                        </div>
                        <div className='p-3 w-[150px] text-center bg-slate-50 font-semibold text-[18px] shadow-2xl rounded-2xl'>
                            <div>Dolar prom</div>    
                            <div>us$ {dolarPerDatePrice.value_avg}</div>
                        </div>
                        <div className='p-3 w-[150px] text-center bg-slate-50 font-semibold text-[18px]  shadow-2xl rounded-2xl'>
                            <div>Dolar venta</div>    
                            <div>us$ {dolarPerDatePrice.value_buy}</div>
                        </div>
                    </div>
                }
                        </>
                    }
            </div>
        </>
    }
    </>
  )
}

export default Header