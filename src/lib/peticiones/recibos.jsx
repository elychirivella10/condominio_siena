import axios from "axios"
import moment from "moment"
import { rutaAxios } from "helpers/variablesGoblales"


export async function crear(values, message, redirect) {
    axios.post(`${rutaAxios}recibos`, {...values})
    .then(res=>{
        message.success('Se cargado la informacion correctamente', 2)
        return  redirect('/recibos')
    })
    .catch(err=>{
        message.error('Ups... Ha ocurrido un error, intente mas tarde', 2)
        return false
    })
}

export async function update(values, message, redirect) {
    values.estado ='pagado'
    values.fecha_pago = moment().format("YYYY/MM/DD")
    axios.post(`${rutaAxios}recibos`, {...values})
    .then(res=>{
        message.success('Se cargado la informacion correctamente', 2)
        return  redirect('/recibos')
    })
    .catch(err=>{
        message.error('Ups... Ha ocurrido un error, intente mas tarde', 2)
        return false
    })
}

