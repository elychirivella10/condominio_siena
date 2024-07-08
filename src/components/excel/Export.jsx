import { useEffect, useState } from "react"
import {CSVLink} from "react-csv"

const Export = ({data, dataFiltrada, nombre}) =>{
    const [val, setVal] = useState([])
    useEffect(() => {
        let customHeadings = []

        if (nombre ==='recibo') {
          if (dataFiltrada.length >0) {
            customHeadings = dataFiltrada.map(item=>({
              "Nro Recibo": 'Nro. '+item.id,
              "Descripcion": item.descripcion,
              "Estado": item.estado,
              "monto": item.monto,
              "Referencia de Pago": item.ref_pago,
              }))
        }else{
            customHeadings = data.map(item=>({
              "Nro Recibo": 'Nro. '+item.id,
              "Descripcion": item.descripcion,
              "Estado": item.estado,
              "monto": item.monto,
              "Referencia de Pago": item.ref_pago,
              }))
        }
        }else{
          if (dataFiltrada.length >0) {
            customHeadings = dataFiltrada.map(item=>({
              "Nombre": item.nombre,
              "Apellido": item.apellido,
              "Cedula": item.cedula,
              "Alicuota": item.alicuota,
              "Email": item.email,
              "Telefono": item.telefono,
              "Unidad": item.tipo_unidad,
              "Piso": item.piso,
              "Clasificador Unidad": item.numero,
              }))
        }else{
            customHeadings = data.map(item=>({
              "Nombre": item.nombre,
              "Apellido": item.apellido,
              "Cedula": item.cedula,
              "Alicuota": item.alicuota,
              "Email": item.email,
              "Telefono": item.telefono,
              "Unidad": item.tipo_unidad,
              "Piso": item.piso,
              "Clasificador Unidad": item.numero,
              }))
        }
        }
        
            
        setVal(customHeadings)
    }, [dataFiltrada, data])
    
    return(
        data.length>0?
        <CSVLink
        filename={nombre+".csv"}
        separator={","}
        data={val}
        className="button is-primary"
      >
        
        Exportar Data Excel
      </CSVLink>
        :<button className="button is-primary" disabled>Exportar Data Excel</button>
        
    )
}

export default Export