import { Link } from "react-router-dom"

const SettingsView = () => {
  return (
    <div className="
            flex gap-5 justify-center mt-10
            [&>a]:px-10 [&>a]:py-5 [&>a]:rounded-xl 
            [&>a]:font-[600] [&>a]:text-[20px] [&>a]:bg-teal-400
            [&>a]:cursor-pointer [&>a:hover]:scale-105 [&>a:active]:scale-100 [&>a]:duration-150
            ">
        <Link to={'/private/settings/materials'} className="active:scale-100">
            Materiales
        </Link>
        <Link to={'/private/settings/suppliers'}>
            Proveedores
        </Link>
        <Link to={'/private/settings/users'}>
            Confirmar usuarios
        </Link>
    </div>
  )
}

export default SettingsView