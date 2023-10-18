import axios from 'axios'
import {useState, ChangeEvent, FormEvent, useContext} from 'react'
import { AuthContext } from '../../context/authContext'
import { LoginProcess } from '../../types/types'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const LoginView = () => {
  const navigate = useNavigate()
  const {dispatch, loading} = useContext(AuthContext)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password:''
  })

const handleLoginSubmitBtn = async(e: FormEvent) => {
  dispatch({type: LoginProcess.START, payload:null})
  e.preventDefault()
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, loginForm);
    dispatch({type: LoginProcess.SUCCESS, payload:response.data.payload})
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'success',
      title: `Bienvenido ${response.data.payload.username}!`,
  })
  navigate('/')
  } catch (error) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'error',
      title: 'No se pudo iniciar sesión!',
  })
  dispatch({type: LoginProcess.FAILED, payload:null})
  }
}

const handleLoginFormInputs = (e:ChangeEvent<HTMLInputElement>) => {
  const {name,value} = e.target
  setLoginForm({...loginForm, [name]: value})
}

  return (
    <div className='w-full flex justify-center p-10'>
      <form onSubmit={handleLoginSubmitBtn} action="" className='flex flex-col gap-5 p-10 text-[20px] font-[700] shadow-2xl border-[1.5px] border-teal-900 rounded-xl [&>label]:p-3 [&>label]:text-[25px] [&>input]:p-5 [&>input]:border-[2px] [&>input]:border-black'>
        {loading && 
        <LoadingSpinner classes='text-4xl text-center mt-10'/>
        }
        {!loading && <>
        <label htmlFor="">E-mail</label>
        <input name='email' type="email" onChange={handleLoginFormInputs}/>
        <label htmlFor="">Password</label>
        <input name='password' type="password" onChange={handleLoginFormInputs}/>
        <button className='px-10 p-5 bg-teal-900 text-white duration-150 hover:scale-110 '>
          Login
        </button>
        <div className='font-medium text-md'>Olvidaste la contraseña? <span className='font-bold cursor-pointer underline'>Click aqui</span></div>
        </>}
      </form>

    </div>
  )
}

export default LoginView