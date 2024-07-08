import axios from "axios"
import { rutaAxios } from "helpers/variablesGoblales"

export async function creates(id, setData) {
    const respuesta = await axios.get(`${rutaAxios}gastos/${id}`)
    setData(respuesta.data.body)
}

export async function usuario(id, setData) {
    const respuesta = await axios.get(`${rutaAxios}usuarios/${id}`)
    return respuesta.data.body
}
export async function encuesta(id, setData) {
    const respuesta = await axios.get(`${rutaAxios}encuesta/byPresFunc/2/${id}/1/100`)
    const array = respuesta.data.EncuestaFiltroPregFuncs
    let arr = []
      for (let index = 0; index < array.length; index++) {
        arr.push({
            title:array[index].pregunta,
            description:array[index].respuesta
        })
        
      }
    setData(arr)
}