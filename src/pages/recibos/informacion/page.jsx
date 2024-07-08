import { useState, useEffect } from "react";
//router-dom

//libreias
import { useParams } from "react-router-dom";
import { Badge } from 'antd';
import { Descriptions } from 'antd';

//componentes
import Panel from "components/panel/Panel"
import TableComp from "components/tabla/Tabla";

//peticiones
import { creates } from "lib/peticiones/funcionariosInformacion";
import { recibo } from "lib/peticiones/funcionariosList";


//componente para visualizar la informacion de un gasto
const InformacionGastos = () =>{
    let {cedula} = useParams('cedula')
    let {id} = useParams('id')
    const [responsablesLista, setResponsablesLista] = useState([])
    const [reciboInfo, setReciboInfo] = useState([])

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
          width:100
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
          children: reciboInfo.monto,
        },
        {
          key: '3',
          label: 'Telefono',
          children: <Badge color={reciboInfo.estado === 'por_pagar'?'#FA6F5C':'#81FAA4'} text={reciboInfo.estado === 'por_pagar'?'Por Pagar':'Pagado'}/>,
        }
      ]

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
                        <input className="input" type="text" placeholder="Datos del Pago" />
                      </div>
                    </div>
                    <button className="button is-primary is-dark is-fullwidth">Pagar</button>
                  </div>
            </div>
        </div>
    )
}

export default InformacionGastos