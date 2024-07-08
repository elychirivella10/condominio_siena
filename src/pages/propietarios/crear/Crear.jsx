import {useState} from 'react'

//componentes
import Panel from "components/panel/Panel";
import NoStatic from "components/funcionario/NoEstatico";

//librerias
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//peticiones
import { crear } from 'lib/peticiones/funcionariosCrear';


//Instancia de app de antd, para usar componentes si colocar manualmente la configuración
import { App } from 'antd';
const Form =()=> {
   const navigate = useNavigate();

    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();
    
  const [values, setValues] = useState({
    id:0,
    cedula: "",
    nombre: "",
    telefono: "",
    email: "x@gmail.com",
    apellido: "",
    usuario: "",
    password: "",
    rol: "",
    activo:1
  })

  const crearFuncionario = async (values) =>{
    setValues(values)
    const val = await crear(values, message, navigate)
  }

  return (
    <div className="container mt-4">
      <div className="columns is-multiline is-centered">
        <div className="column is-10">
          <Panel title='Registrar Usuarios' subtitle={`Condominio Siena`}/>
        </div>        
        <div className="column is-10">
          <div className="box">
            <NoStatic setData={crearFuncionario} data={values}/>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Form
