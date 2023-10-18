import axios from 'axios'
import {useEffect, useState} from 'react'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'

type userType = {
    id_user: number,
    username: string,
    email: string,
    password: string ,
    address: string | null,
    active: boolean | null,
    createdAt: string,
    updatedAt: string,
    id_userType: number,
}


const UsersView = () => {
    const [loading, setLoading] = useState(false)
    const [usersArr, setUsersArr] = useState<userType[]>([])
    const [errorMsg, setErrorMsg] = useState('')

    const fetchNotActiveUsers = async() => {
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/not-active`)
            setUsersArr(response.data.payload)
            setLoading(false)
        } catch (error) {
        setLoading(false)
        setErrorMsg('No se pudo cargar...Probar mas tarde')
        }
    }

    useEffect(()=> {
        fetchNotActiveUsers()
    },[])

    const handleConfirmClick = async(id:number) => {
        setLoading(true)
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/activate/${id}`)
            await fetchNotActiveUsers()
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const handleDeleteClick = async(id:number) => {
        setLoading(true)
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/activate/${id}?del=true`)
            await fetchNotActiveUsers()
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }



    return (
      <div className='w-full flex justify-center gap-5 mt-10'>
        {loading && 
        <LoadingSpinner classes='mt-10 text-[50px]'/>
        }
        {!loading && !errorMsg && 
            <>
        { usersArr.length > 0 ?
            usersArr.map((e:userType)=> 
            <div key={e.id_user} className='p-10 bg-teal-100 rounded-xl'>
                <div>{e.username}</div>
                <div>{e.email}</div>
                <div className='flex gap-5 mt-5'>
                    <button onClick={()=> handleConfirmClick(e.id_user)} className='p-5 bg-green-400 rounded-lg'>Confirmar</button>
                    <button onClick={()=> handleDeleteClick(e.id_user)} className='p-5 bg-red-400 rounded-lg '>Eliminar</button>
                </div>
            </div>
            ) : 
            <p className='text-center mt-10 font-[600] text-[30px]'>No hay usuarios por confirmar</p>
        }
        </>
            }
        {!loading && errorMsg && <p className='text-center mt-10 font-[600] text-[30px]'>{errorMsg}</p>}
      </div>
  )
}

export default UsersView