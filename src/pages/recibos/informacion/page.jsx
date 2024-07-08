import { useState, useEffect, Fragment } from "react";
//router-dom

//libreias
import { useParams } from "react-router-dom";
import { Badge } from 'antd';
import { Descriptions, Popconfirm, Result } from 'antd';
import { useNavigate } from "react-router-dom";

//Instancia de app de antd, para usar componentes si colocar manualmente la configuración
import { App } from 'antd';

//componentes
import Panel from "components/panel/Panel"
import TableComp from "components/tabla/Tabla";

//peticiones y configuraciones
import { creates } from "lib/peticiones/funcionariosInformacion";
import { recibo } from "lib/peticiones/funcionariosList";
import { update } from "lib/peticiones/recibos";
import { validateNumber } from "helpers/validator/validateNumber"


//componente para visualizar la informacion de un gasto
const InformacionGastos = () =>{
  const navigate = useNavigate();
  //obtenemos la variable de mensaje que traemos de la instancia App
  const {message} = App.useApp();
    let {cedula} = useParams('cedula')
    let {id} = useParams('id')
    const [responsablesLista, setResponsablesLista] = useState([])
    const [reciboInfo, setReciboInfo] = useState({
      descripcion: "",
      estado: "",
      fecha_pago: "",
      gasto_id: 0,
      id: cedula,
      monto: 0,
      ref_pago: "",
      usuario_id: 0
    })


    const numberChange = (e) =>{
      const valid = validateNumber(e.target.value, 15, message)
      if (valid) {
          setReciboInfo({
              ...reciboInfo,
              [e.target.name]:e.target.value,
          })
      }
    }

      //deficion de columnas para la tabla de gastos
      const Columns = [
        {
          width:28,
          render: (text, record) => <Badge color={'#5068B5'}/>,
        },
        {
          title:'Descripción Gasto',
          dataIndex:'descripcion'
        },
        {
          title:'Monto',
          dataIndex:'monto',
          width:100,
          render: (text, record) => text + ' ' +'Bs',
        }
      ];

      const items = [
        {
          key: '1',
          label: 'Descripcion',
          children: reciboInfo.descripcion,
        },
        {
          key: '2',
          label: 'Monto',
          children: reciboInfo.monto + ' ' +'Bs',
        },
        {
          key: '3',
          label: 'Estatus',
          children: <Badge color={reciboInfo.estado === 'por_pagar'?'#FA6F5C':'#81FAA4'} text={reciboInfo.estado === 'por_pagar'?'Por Pagar':'Pagado'}/>,
        }
      ]

      const handleSubmit =  async (e) =>{
        e.preventDefault()
        const val = await update(reciboInfo, message, navigate)
      }

      useEffect(() => {

        // al inicial el componente se hacen las peticiones necesarias para que el componente inicie
        creates(id,setResponsablesLista)
        recibo(cedula, setReciboInfo)
      }, [id, cedula])

      
    
    return(
        <div className="columns is-multiline is-centered">
            <div className="column is-12">
                <Panel title={'Información Recibo Nro '+cedula} subtitle={`Fecha: 20/06/2024`}/>
            </div>
            
            <div className="column is-9">
              <div className="columns is-multiline">     
                <div className="column is-12">
                  <div className="box">
                    <Descriptions title="Informacion del Recibo" items={items} />
                  </div>
                </div>
                <div className="column is-12">
                  <div className="box">
                    <p className = "text-anchor has-text-weight-bold">Gastos</p>
                    <TableComp columns={Columns} data={responsablesLista} pagination={{ defaultPageSize: 10, pageSizeOptions: ['5', '7', '10', '20', '30'] }}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-3">
                  <div className="box">
                    {reciboInfo.estado == 'por_pagar'?
                      <Fragment>
                        <p className = "text-anchor has-text-weight-bold">Pagar Recibo</p>
                        <div className="field mt-2">
                          <div className="control is-loading">
                            <input
                              className="input "
                              type="text"
                              placeholder="Datos Propietario"
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control is-loading">
                            <input className="input" type="number" placeholder="Datos del Pago"  value={reciboInfo.ref_pago} name="ref_pago" onChange={numberChange}/>
                          </div>
                        </div>
                        <Popconfirm
                          title="Pagar"
                          description="Esta seguro que quiere anexar un pago?"
                          okText="Si"
                          onConfirm={handleSubmit}
                          cancelText="No"
                        >
                          <button className="button is-primary is-dark is-fullwidth">Pagar</button>
                        </Popconfirm>
                      </Fragment>
                    :
                    <Result
                        status="success"
                        title="Recibo Pagado"
                        subTitle={"Ya se ha adjuntado un pago para este recibo con REF: "+reciboInfo.ref_pago}
                      />
                    }
                    
                  </div>
            </div>
        </div>
    )
}

export default InformacionGastos