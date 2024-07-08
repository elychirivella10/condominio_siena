
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"

import logo from 'assets/logo.png'

import { deleteToken } from "helpers/auth/auth"
import { getRole } from "helpers/auth/auth"

const NavBar = () =>{
    const [menu, setMenu] = useState(false) 

    const menuChange = (e) =>{
        const icon = document.getElementById('menu')
        const menuS = document.getElementById('menu-activation')
        if (menu ===false) {
            icon.classList.add('is-active')
            menuS.classList.add('is-active')
            setMenu(true)
        }else{
            icon.classList.remove('is-active')
            menuS.classList.remove('is-active')
            setMenu(false)
        }
    }

    return(
        <nav className="navbar has-background-red is-sticky top-px-1 mb-5" role="navigation" aria-label="main navigation">
        <div className="navbar-brand ml-5">
            <div className="navbar-item">
                <figure className="image is-pulled-left mr-3">
                    <img className="" src={logo} alt="marca"/>
                </figure>
            </div>

            <p role="button" id="menu" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={menuChange}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </p>
        </div>

        <div className="navbar-menu" id="menu-activation">
            <div className="navbar-start">
                <Link to="/" className="navbar-item ml-2 mr-2">
                    <span className='navbar-item-hover'>
                        <span className="icon is-small is-right mr-2">
                            <i className="fa-solid fa-circle-info"></i>
                        </span>
                        Inicio
                    </span>
                </Link>
                <Link to="/recibos" className="navbar-item ml-2 mr-2">
                    <span className='navbar-item-hover'>
                        <span className="icon is-small is-right mr-2">
                            <i className="fa-solid fa-receipt"></i>
                        </span>
                        Lista Recibos
                    </span>
                </Link>
                {getRole()==='administrador'?
                
                    <Fragment>
                        <Link to="/recibos/crear" className="navbar-item ml-2 mr-2">
                            <span className='navbar-item-hover'>
                                <span className="icon is-small is-right mr-2">
                                    <i className="fa-solid fa-receipt"></i>
                                </span>
                                Crear Recibos
                            </span>
                        </Link>
                        <Link to="/propietarios" className="navbar-item ml-2 mr-2">
                            <span className='navbar-item-hover'>
                                <span className="icon is-small is-right mr-2">
                                    <i className="fa-solid fa-people-group"></i>
                                </span>
                                Lista Propietarios
                            </span>
                        </Link>
                        <Link to="/propietarios/crear" className="navbar-item ml-2 mr-2">
                            <span className='navbar-item-hover'>
                                <span className="icon is-small is-right mr-2">
                                    <i className="fa-solid fa-person-circle-plus"></i>
                                </span>
                                Registrar Usuario
                            </span>
                        </Link>

                    </Fragment>
                :null}
                
            </div>
            <div className="navbar-end">
            <div className="navbar-item has-dropdown is-right is-hoverable is-radius ">

                <a className="navbar-link has-background-transparent">
                    <span className="icon is-small is-right mr-2">
                        <span className="fa-solid fa-user">
                        </span>
                    </span>
                    Usuario
                </a>

                <div className="navbar-dropdown is-right is-radius">
{/*                 <a className="navbar-item">
                    Perfil
                </a> */}
                <hr className="navbar-divider"/>
                    <a className="navbar-item" onClick={async(e)=>(deleteToken())}>
                        Salir
                    </a>
                </div>
            </div>
            </div>
        </div>
    </nav>
    )
}

export default NavBar