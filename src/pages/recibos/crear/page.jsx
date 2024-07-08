import {useState} from 'react'

//componentes
import Panel from "components/panel/Panel";
import NoStatic from "components/recibos/NoStatic";

//librerias
import { useNavigate } from "react-router-dom";
//Instancia de app de antd, para usar componentes si colocar manualmente la configuración
import { App } from 'antd';

//peticiones
import { crear } from 'lib/peticiones/recibos';

const CrearRecibos = () =>{
    const navigate = useNavigate();
    //obtenemos la variable de mensaje que traemos de la instancia App
    const {message} = App.useApp();
    const [values, setValues] = useState({
        id:0,
        monto:0,
        descripcion:"",
        usuario_id:0,
        gasto_id:0
      })

      //funcion para crear los recibos, esta funcion se le pasara al formulario
      const crearRecibos = async (values) =>{
        setValues(values)
        const val = await crear(values, message, navigate)
      }
    return(
<div className="columns is-multiline is-centered is-vcentered">
      <div className="column is-10">
        <Panel title='Crear Recibos' subtitle={`Condominio Siena`}/>

        <div className="columns is-multiline">
          <div className="column is-12">
            <div className="box">
                <NoStatic setData={crearRecibos}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default CrearRecibos