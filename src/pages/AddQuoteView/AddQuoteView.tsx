import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

type formType = {
  object_id: string | number;
  id_supply: number | null;
  id_supplier: number | null;
  price: number | null;
  dolar_rate: number | null;
  supply_dolar_price: number | null;
  date: number | null;
};

type SupplyItemType = {
  id_supply: number; // Change the type to match your data type
  name: string; // Change the type to match your data type
}

type SupplierItemType = {
  id_supplier: number; // Change the type to match your data type
  name: string; // Change the type to match your data type
}


const newRow: formType = {
  object_id: Math.random(),
  id_supply: null,
  id_supplier: null,
  price: null,
  dolar_rate: null,
  supply_dolar_price: null,
  date: NaN,
};

const AddQuoteView = () => {
    const navigate = useNavigate()
  const [formRows, setFormRows] = useState<formType[]>([
    {
      object_id: Math.random(),
      id_supply: null,
      id_supplier: null,
      price: null,
      dolar_rate: null,
      supply_dolar_price: null,
      date: NaN,
    },
  ]);
  const [supplyArray, setSupplyArray] = useState<SupplyItemType[]>([]);
  const [supplierArray, setSupplierArray] = useState<SupplierItemType[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [loadingError, setLoadingError] = useState(false)

  useEffect(() => {
    const fetchSelectInfo = async () => {
      setLoadingOptions(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/info/add-quote/select`
        );
        setLoadingOptions(false);
        setSupplyArray(data.payload.supplies);
        setSupplierArray(data.payload.suppliers);
      } catch (error) {
        setLoadingOptions(false);
        setLoadingError(true)
      }
    };
    fetchSelectInfo();
  }, []);

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const obj_id = parseFloat(e.target.id.split("-")[2]);
    const index = formRows.findIndex((i) => i.object_id === obj_id);
    setFormRows((prev) => {
      const updatedFormRows = [...prev];
      updatedFormRows[index] = {
        ...updatedFormRows[index],
        [e.target.name]: e.target.value,
      };
      return updatedFormRows;
    });
  };

  const handleSubmitForm = async(event: FormEvent) => {
    event.preventDefault();
    const obj = formRows.map((e) => {
    const {object_id, ...other} = e
      other.id_supply = Number(other.id_supply);
      other.id_supplier = Number(other.id_supplier);
      other.price = Number(other.price);
      other.dolar_rate = Number(other.dolar_rate);
      other.supply_dolar_price = (other.price) / (other.dolar_rate);
      return other
    });
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes`, obj)
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Registro creado correctamente!',
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
            title: 'No se pudo crear el registro!',
        })
        setFormRows([newRow])
    }
  };

  const deleteRow = (id: number) => {
    if (formRows.length === 1) {
      return
    }
    const updatedRows = [...formRows];
    const index = formRows.findIndex((i) => i.object_id === id);
    updatedRows.splice(index, 1);
    setFormRows(updatedRows);
  };
  const addRow = () => {
    setFormRows([
      ...formRows,
      {
        object_id: Math.random(),
        id_supply: null,
        id_supplier: formRows[formRows.length-1].id_supplier || null,
        price: null,
        dolar_rate: formRows[formRows.length-1].dolar_rate || null,
        supply_dolar_price: null,
        date: formRows[formRows.length-1].date || null,
      },
    ]);
  };

  return (
    <div className="my-5">
      {loadingOptions && (
        <LoadingSpinner classes="w-full text-5xl mt-10"/>
      )}
      {!loadingOptions && (
        <>
        {
            loadingError && 
            <h1 className="font-bold text-center text-3xl mt-7">
                No se pueden cargar registros... intente mas tarde
            </h1>
        }
        {
            !loadingError && 
        
        <form onSubmit={handleSubmitForm}>
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
                <th>MATERIAL</th>
                <th>PROVEEDOR</th>
                <th>PRECIO $</th>
                <th>TC DOLAR</th>
                <th>PRECIO US$</th>
                <th>FECHA</th>
                <th>
                  <FontAwesomeIcon icon={faTrashCan} color="black" size="xl" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-cyan-900 dark:bg-slate-800 text-black font-medium [&>tr]:duration-150 ">
              {formRows?.map((row: formType, index: number) => {
                return (
                  <tr
                    key={row.object_id}
                    className={`hover:bg-slate-400 text-center `}
                  >
                    <td className="border-b border-slate-100  dark:border-slate-700 p-4 pr-8  dark:text-slate-400 w-[200px] md:w-auto text-sm lg:text-[18px]">
                      <select
                        required
                        name="id_supply"
                        className="px-2 py-3 text-center w-[100%]"
                        id={`addSupply-Supplyselect-${row.object_id}`}
                        onChange={handleInputsChange}
                      >
                        <option value="" disabled selected>
                          -
                        </option>
                        {supplyArray.map((e) => (
                          <option key={e.id_supply} value={e.id_supply}>{e.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8  dark:text-slate-400 w-[200px] md:w-auto text-sm lg:text-[18px]">
                      <select
                        required
                        defaultValue={row.id_supplier || ''}
                        name="id_supplier"
                        className="px-2 py-3 text-center w-[100%]"
                        id={`addSupply-Supplierselect-${row.object_id}`}
                        onChange={handleInputsChange}
                      >
                        <option value="" disabled selected>
                          -
                        </option>
                        {supplierArray.map((e) => (
                          <option key={e.id_supplier} value={e.id_supplier}>{e.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4  dark:text-slate-400 w-[110px] text-sm lg:text-[18px]">
                      <input
                        required
                        type="number"
                        name="price"
                        className=" text-center px-2 py-3 w-[100%]"
                        id={`addSupply-priceInput-${row.object_id}`}
                        onChange={handleInputsChange}
                        step="0.01"
                      />
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4  dark:text-slate-400 w-[110px] text-sm lg:text-[18px]">
                      <input
                        required
                        type="number"
                        value={row.dolar_rate || NaN}
                        name="dolar_rate"
                        className=" py-3 w-[80px] text-center"
                        id={`addSupply-dolarRateInput-${row.object_id}`}
                        onChange={handleInputsChange}
                        step="0.01"
                      />
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700   dark:text-slate-400 w-[110px] text-sm lg:text-[18px]">
                      <div
                        className="text-center bg-white py-3 text-[20px]"
                        id={`addSupply-supplyDolarPrice-${row.object_id}`}
                      >
                        us${" "}
                        {(
                          Number(formRows[index].price) /
                          Number(formRows[index].dolar_rate)
                        ).toFixed(3)}
                      </div>
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4  dark:text-slate-400 w-[150px] text-sm lg:text-[18px]">
                      <input
                        required
                        type="date"
                        name="date"
                        value={row.date || ""}
                        className=" p-1 py-3"
                        id={`addSupply-date-${row.object_id}`}
                        onChange={handleInputsChange}
                      />
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 dark:text-slate-400">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        color="red"
                        size="xl"
                        cursor={"pointer"}
                        onClick={() => deleteRow(Number(row.object_id))}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-center mt-10">
            <div
              className="text-center font-semibold text-3xl border-2 w-fit p-1 px-4 rounded-full border-slate-700 shadow-2xl cursor-pointer hover:-translate-y-1 hover:scale-105 duration-150 active:scale-100"
              onClick={addRow}
            >
              +
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button className="text-center font-semibold bg-teal-800 text-white text-3xl border-2 w-fit p-2 px-4 rounded-full shadow-2xl cursor-pointer  hover:scale-105 duration-150 active:scale-100">
              CONFIRMAR
            </button>
          </div>
        </form>
        }
        </>
      )}
    </div>
  );
};

export default AddQuoteView;
