import axios, { AxiosError } from "axios";
import { FormEvent, useRef, RefObject, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

type SignUpFormErros = {
  password: string | null;
  confirmPassword: string | null;
  email: string | null;
};

const SignUpView = () => {
  const pswd: RefObject<HTMLInputElement> = useRef(null);
  const confPswd: RefObject<HTMLInputElement> = useRef(null);
  const email: RefObject<HTMLInputElement> = useRef(null);
  const user: RefObject<HTMLInputElement> = useRef(null);

  const navigate = useNavigate();

  const [error, setError] = useState<SignUpFormErros>({
    password: null,
    confirmPassword: null,
    email: null,
  });

  const [loading, setLoading] = useState(false);

  const checkPswd = () => {
    if (pswd.current?.value === confPswd.current?.value) {
      setError({ ...error, password: null });
      return true;
    }
    setError({ ...error, password: "Las contraseñas no son iguales" });
    return false;
  };

  const handleSignUpSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!checkPswd()) return;
    const obj = {
      username: user.current?.value,
      email: email.current?.value,
      password: confPswd.current?.value,
    };
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/sign-up`, obj);
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Usuario creado correctamente!",
      });
      setLoading(false);
      navigate('/')
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
          if (error.code === "ERR_NETWORK") {
            Swal.fire({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              icon: "error",
              title: "No se pudo crear el usuario... Intenta mas tarde!",
            });
            setLoading(false);
            return;
          } else if (error.response && error.response.status === 404) {
            setLoading(false);
            return setError((prev) => ({ ...prev, email: "Email ya existe..." }));
          }
      }
      else {
       return Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: "No se pudo crear el usuario... Intenta mas tarde!",
          });
      }
      
    }
  };

  const handlePswdChange = () => {
    checkPswd();
  };

  return (
    <div className="flex justify-center ">
      <form
        onSubmit={handleSignUpSubmit}
        className="w-[400px] flex flex-col shadow-2xl p-10 gap-7 my-5 min-h-[400px]
                [&>input]:px-5 
                [&>input]:py-2 
                [&>input]:bg-slate-200
                [&>input]:text-xl
                [&>label]:text-xl"
      >
        {loading && (
          <LoadingSpinner classes="text-5xl self-center"/>
        )}
        {!loading && (
          <>
            <h1 className="text-4xl text-center font-semibold mb-5">
              Registro
            </h1>
            <label htmlFor="">Nombre completo</label>
            <input type="text" ref={user} />
            <label htmlFor="">Email</label>
            <input type="email" ref={email} />
            {error.email && (
              <p className="text-red-400 font-semibold">{error.email}</p>
            )}
            <label htmlFor="">Password</label>
            <input minLength={5} type="password" name="" id="" ref={pswd} />
            <label htmlFor="">Confirm password</label>
            <input
              minLength={5}
              type="password"
              name="password"
              id=""
              ref={confPswd}
              onChange={handlePswdChange}
            />
            {error.password && (
              <p className="text-red-400 font-semibold">{error.password}</p>
            )}
            <button className="p-5 rounded-full bg-teal-800 text-white text-xl hover:scale-110 active:scale-100 duration-150">
              Registrar
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUpView;
