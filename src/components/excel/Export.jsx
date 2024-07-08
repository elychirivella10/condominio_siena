import { useEffect, useState } from "react"
import {CSVLink} from "react-csv"

const Export = ({data, dataFiltrada}) =>{
    const [val, setVal] = useState([])
    useEffect(() => {
        let customHeadings = []
        if (dataFiltrada.length >0) {
            customHeadings = dataFiltrada.map(item=>({
                "Identificacion": item.cedula,
                "Nombres y Apellidos": item.apellidos_nombres,
                "Estado": item.estado,
                "Estatus": item.estatus,
                "Entidad": item.entidad_adscripcion,
                "Jefe1x10": item.cantidad_responsable,
                "1x10": item.porcentaje+'%',
              }))
        }else{
            customHeadings = data.map(item=>({
                "Identificacion": item.cedula,
                "Nombres y Apellidos": item.apellidos_nombres,
                "Estado": item.estado,
                "Estatus": item.estatus,
                "Entidad": item.entidad_adscripcion,
                "Jefe1x10": item.cantidad_responsable,
                "1x10": item.porcentaje+'%',
              }))
            }
            
            setVal(customHeadings)
    }, [dataFiltrada, data])
    
    return(
        data.length>0?
        <CSVLink
        filename={"funcionarios.csv"}
        separator={";"}
        data={val}
        className="button is-primary"
      >
        
        Exportar Data Excel
      </CSVLink>
        :<button className="button is-primary" disabled>Exportar Data Excel</button>
        
    )
}

export default Export