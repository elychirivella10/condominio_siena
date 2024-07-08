import axios from "axios"
import { rutaAxios } from "helpers/variablesGoblales"


export async function crear(values, message, redirect, unidades) {
    delete unidades.alicuota1
    delete unidades.alicuota2
    axios.post(`${rutaAxios}usuarios`, {...values})
    .then(res=>{
        unidades.usuario_id = res.data.body
        axios.post(`${rutaAxios}unidades`, {...unidades})
        .then(ress=>{
            message.success('Se cargado la informacion correctamente', 2)
            return  redirect('/propietarios')
        })
        
    })
    .catch(err=>{
        message.error('Ups... Ha ocurrido un error, intente mas tarde', 2)
        return false
    })
}


