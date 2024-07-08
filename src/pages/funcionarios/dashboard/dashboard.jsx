import { useState, useEffect, Fragment } from "react";
import { Descriptions } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { getUser } from "helpers/auth/auth";
import { usuario } from "lib/peticiones/funcionariosInformacion";

 const Inicio = ()=> {
  const [spinning, setSpinning] = useState(false);
  const [usuarioInfo, setUsuarioInfo] = useState(
    {
        nombre:"",
        apellido:"",
        telefono:"",
        email:"",
        cedula:"",
        alicuota:""
    }
  )

  useEffect(() => {
    sync(getUser())
  }, [])

  const sync = async (id)=>{
    const usuarioGet= usuario(id)
    setSpinning(true)
    Promise.all([usuarioGet]).then((values) => {
      setUsuarioInfo(values[0])
      setSpinning(false)
    });
  }


  const items = [
    {
      key: '1',
      label: 'Nombre y Apellido',
      children: usuarioInfo.nombre + ' ' + usuarioInfo.apellido,
    },
    {
      key: '2',
      label: 'Cedula',
      children: usuarioInfo.cedula,
    },
    {
      key: '3',
      label: 'Telefono',
      children: usuarioInfo.telefono,
    },
    {
      key: '4',
      label: 'Email',
      children: usuarioInfo.email,
    },
    {
      key: '5',
      label: 'Alicuota',
      children: usuarioInfo.alicuota,
    },
  ]
  
  return (
    <div className="columns is-multiline is-centered is-vcentered">
      <div className="column is-12">
        <Spin spinning={spinning} indicator={<LoadingOutlined spin />}  size="large" fullscreen />
        <div className="columns is-multiline">
            <Fragment>
              <div className="column is-12">
                <section class="hero is-medium is-primary  is-radius">
                  <div class="hero-body">
                    <p class="title">Bienvenido {usuarioInfo.nombre.toUpperCase() + ' ' + usuarioInfo.apellido.toUpperCase()}</p>
                    <p class="subtitle">Condominio Siena</p>
                  </div>
                </section>
              </div>
              <div className="column is-12">
                <div className="box">
                  <Descriptions title="Informacion del Usuario" items={items} />
                </div>
              </div>
            </Fragment>
        </div>
      </div>
      
    </div>
  );
}

export default Inicio