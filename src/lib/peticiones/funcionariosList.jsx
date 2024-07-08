import axios from "axios"
import { rutaAxios } from "helpers/variablesGoblales"

export async function creates(getRole, getUser) {
    const respuesta = await axios.get(`${rutaAxios}recibos`)
    if (getRole==='administrador') {
        return respuesta.data.body
    }else{
        return respuesta.data.body.filter(r => r.usuario_id == getUser)
    }
    
}

export async function recibo(id, setData) {
    const respuesta = await axios.get(`${rutaAxios}recibos/${id}`)
    setData(respuesta.data.body[0])
}
export async function propietarios() {
    const respuesta = await axios.get(`${rutaAxios}usuarios`)
    return respuesta.data.body
}
export async function propietariosEliminar(id, usuario) {
    axios.put(`${rutaAxios}unidades`,{id:id}).then(res=>{
        axios.put(`${rutaAxios}usuarios`,{id:usuario}).then(ress=>{
            return ress.data.body
        })
    })
    //return respuesta.data.body
}