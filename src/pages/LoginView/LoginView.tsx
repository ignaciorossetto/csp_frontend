import {useState} from 'react'

const LoginView = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password:''
  })
  return (
    <div className='w-full flex justify-center p-10'>
      <form action="" className='flex flex-col gap-5 p-10 text-[20px] font-[700] shadow-2xl border-[1.5px] border-teal-900 rounded-xl [&>label]:p-3 [&>label]:text-[25px] [&>input]:p-5 [&>input]:border-[2px] [&>input]:border-black'>
        <label htmlFor="">E-mail</label>
        <input type="email" />
        <label htmlFor="">Password</label>
        <input type="password" />
        <button className='px-10 p-5 bg-teal-900 text-white duration-150 hover:scale-110 '>
          Login
        </button>
        <div className='font-medium text-md'>Olvidaste la contraseña? <span className='font-bold cursor-pointer underline'>Click aqui</span></div>
      </form>

    </div>
  )
}

export default LoginView