import { Fragment, useState, useEffect } from "react"

import { App } from "antd"

import { validateNumber } from "helpers/validator/validateNumber"
import { validateLetter } from "helpers/validator/validateForm"

const NoStatic = ({setData, data}) => {

    const {message} = App.useApp();
    
    const [values, setValues] = useState({
        id:0,
        cedula: "",
        nombre: "",
        telefono: "",
        email: "x@gmail.com",
        apellido: "",
        usuario: "",
        password: "",
        rol: "",
        activo:1
      })


      const textChange = (e) =>{
        const  valid = validateLetter(e, message)
        if (valid) {
            setValues({
                ...values,
                [e.target.name]:e.target.value
            })
        }
        
      }

      const numberChange = (e) =>{
        const valid = validateNumber(e.target.value, 8, message)
        if (valid) {
            setValues({
                ...values,
                [e.target.name]:e.target.value
            })
        }
      }
      const numberSerialChange = (e) =>{
        const valid = validateNumber(e.target.value, 10, message)
        if (valid) {
            setValues({
                ...values,
                [e.target.name]:e.target.value
            })
        }
      }
      const numberPhoneChange = (e) =>{
        const valid = validateNumber(e.target.value, 11, message)
        if (valid) {
            setValues({
                ...values,
                [e.target.name]:e.target.value
            })
        }
      }

      useEffect(() => {
      }, [])
      
     
    return (
        <Fragment>
            <form onSubmit={(e)=>{
                e.preventDefault()
            }}> 
                <div className="columns is-multiline">
                    <div className="column is-4">
                        <label className="label">Identificación<span className="has-text-danger-dark">*</span></label>
                        <div className="field mb-2" >
                            <p className="control is-expanded has-icons-right">
                                <input className="input" type="text" placeholder="Identificación" required value={values.cedula} name="cedula" onChange={numberChange}/>
                            </p>
                        </div>
                    </div>
                    <div className="column is-4">
                        <label className="label">Nombre<span className="has-text-danger-dark">*</span></label>
                        <div className="control has-icons-right pb-4 is-expanded">
                            <input className="input" type="text" placeholder="Nombre" value={values.nombre} required name='nombre' onChange={textChange}/>
                        </div>
                    </div>
                    <div className="column is-4">
                        <label className="label">Apellido<span className="has-text-danger-dark">*</span></label>
                        <div className="control has-icons-right pb-4 is-expanded">
                            <input className="input" type="text" placeholder="Apellido" value={values.apellido} required name='apellido' onChange={textChange}/>
                        </div>
                    </div>
{/*                     <div className="column is-6">
                        <label className="label">Correo electrónico <span className="has-text-danger-dark"></span></label>
                        <div className="control has-icons-right pb-4" >
                            <input className="input" type="email"  placeholder="Correo electrónico"name="correo" value={values.correo} onChange={(e)=>(
                                setValues({
                                    ...values,
                                    [e.target.name]:e.target.value
                                })
                            )}/>
                        </div>
                    </div> */}
                    <div className="column is-6">
                        <label className="label">Teléfono <span className="has-text-danger-dark"></span></label>
                        <div className="field " >
                            <div className="control is-expanded has-icons-right pb-4 mb-2" >
                                <input className="input" type="text" placeholder="Teléfono" name="telefono" value={values.telefono} onChange={numberPhoneChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        <label className="label">Correo Electrónico <span className="has-text-danger-dark"></span></label>
                        <div className="field " >
                            <div className="control is-expanded has-icons-right pb-4 mb-2" >
                                <input className="input" type="text" placeholder="Correo Electrónico" name="email" value={values.email} onChange={(e)=>(
                                setValues({
                                        ...values,
                                        [e.target.name]:e.target.value
                                    })
                                )}/>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        <label className="label">Usuario <span className="has-text-danger-dark"></span></label>
                        <div className="field " >
                            <div className="control is-expanded has-icons-right pb-4 mb-2" >
                                <input className="input" type="text" placeholder="Usuario" name="usuario" value={values.usuario} onChange={(e)=>(
                                setValues({
                                        ...values,
                                        [e.target.name]:e.target.value
                                    })
                                )}/>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        <label className="label">Contraseña <span className="has-text-danger-dark"></span></label>
                        <div className="field " >
                            <div className="control is-expanded has-icons-right pb-4 mb-2" >
                                <input className="input" type="pass" placeholder="Contraseña" name="password" value={values.password}  onChange={(e)=>(
                                setValues({
                                        ...values,
                                        [e.target.name]:e.target.value
                                    })
                                )}/>
                            </div>
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
                    <div className="column is-12">
                        <div className="field pb-4 mb-2" >
                            <label className="label">Tipo Rol<span className="has-text-danger-dark">*</span></label>
                            <p className="control" >
                                <span className="select">
                                <select name="rol" value={values.rol} required onChange={(e)=>(
                                setValues({
                                        ...values,
                                        [e.target.name]:e.target.value
                                    })
                                )}>
                                    <option value="0">---Seleccione un Rol---</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="propietario">Propietario</option>
                                    <option value="junta">Junta</option>
                                </select>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="column is-12">
                        <button className="button is-primary is-dark is-fullwidth" onClick={(e)=>{
                            setData({...values})
                        }}>Agregar</button>
                    </div>
                </div>
            </form>
            
        </Fragment>
    )
}

export default NoStatic