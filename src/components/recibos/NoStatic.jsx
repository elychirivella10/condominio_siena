import { Fragment, useState, useEffect } from "react"

import { App } from "antd"

import { validateLetter } from "helpers/validator/validateForm"

import { propietarios } from "lib/peticiones/funcionariosList";

import { validarEmpty } from "helpers/validator/validateEmpty";

const NoStatic = ({setData, data}) => {

    const {message} = App.useApp();
    
    const [values, setValues] = useState({
        id:0,
        monto:0,
        descripcion:"",
        usuario_id:0,
        gasto_id:0
      })

    const [filter, setFilter] =  useState(0)

    const [propietariosVal, setPropietariosVal] = useState([])


      const textChange = (e) =>{
        const  valid = validateLetter(e, message)
        if (valid) {
            setValues({
                ...values,
                [e.target.name]:e.target.value
            })
        }
        
      }

      useEffect(() => {
        sync()
      }, [])
    
      const sync = async () =>{
          const valores = propietarios()
          Promise.all([valores]).then((values) => {
            setPropietariosVal(values[0])
          });
    
      }

      const handleUser = (e) =>{
        const id = e.target.value
        

        let val = propietariosVal.filter(f=> f.id == id)
        if (val) {
            val= val[0].alicuota
            setFilter(parseFloat(val))
            setValues({
                ...values,
                [e.target.name]:id,
                ["monto"]: ((3000*val)/100)
            })   
        }



      }
      
     
    return (
        <Fragment>
            <form onSubmit={(e)=>{
                e.preventDefault()
            }}> 
                <div className="columns is-multiline">
                    <div className="column is-12">
                        <label className="label">Descripcion Recibo<span className="has-text-danger-dark">*</span></label>
                        <div className="control has-icons-right pb-4 is-expanded">
                            <input className="input" type="text" placeholder="Descripcion Recibo" value={values.descripcion} required name='descripcion' onChange={textChange}/>
                        </div>
                    </div>
{/*                     <div className="column is-6">
                        <label className="label">Serial Patria <span className="has-text-danger-dark"></span></label>
                        <div className="control has-icons-right pb-4" >
                            <input className="input" type="number"  placeholder="Serial Patria" name="serial_carnet" value={values.serial_carnet} onChange={numberSerialChange}/>
                        </div>
                    </div>
                    <div className="column is-6">
                        <label className="label">Código patria <span className="has-text-danger-dark"></span></label>
                        <div className="control has-icons-right pb-4" >
                            <input className="input" type="number"  placeholder="Código patria" name="codigo_carnet" value={values.codigo_carnet} onChange={numberSerialChange}/>
                        </div>
                    </div> */}
                    <div className="column is-5">
                        <div className="field pb-4 mb-2" >
                            <label className="label">Propietario<span className="has-text-danger-dark">*</span></label>
                            <p className="control" >
                                <span className="select">
                                <select name="usuario_id" value={values.usuario_id} required onChange={handleUser}>
                                    <option value="0">---Seleccione un Propietario---</option>
                                    {propietariosVal.map(p=>(
                                        <option value={p.usuario_id}>{p.nombre+' ' + p.apellido + '--' + p.piso + ' ' + p.numero }</option>
                                    ))}
                                </select>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="column is-5">
                        <div className="field pb-4 mb-2" >
                            <label className="label">Tipo de gasto<span className="has-text-danger-dark">*</span></label>
                            <p className="control" >
                                <span className="select">
                                <select name="gasto_id" value={values.gasto_id} required onChange={(e)=>(
                                setValues({
                                        ...values,
                                        [e.target.name]:e.target.value
                                    })
                                )}>
                                    <option value="0">---Seleccione un Gasto---</option>
                                    <option value="4">Vigilancia,aseo,mantenimiento</option>
                                </select>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="column is-2">
                        <div className="field pb-4 mb-2" >
                            <label className="label">Monto<span className="has-text-danger-dark">*</span></label>
                            <div className="control has-icons-right pb-4 is-expanded">
                                <input className="input" type="number" placeholder="Monto" value={values.monto} required name='monto' readOnly/> <span>Bs</span>
                            </div>
                        </div>
                    </div>
                    <div className="column is-12">
                        <button className="button is-primary is-dark is-fullwidth" onClick={(e)=>{
                            if (validarEmpty) {
                                setData({...values})
                            
                            }else{
                                message.error('Campos vacios en el formulario', 2)
                            }

                        }
                            
                        } >Agregar</button>
                    </div>
                </div>
            </form>
            
        </Fragment>
    )
}

export default NoStatic