
//liberias de rutas
import {BrowserRouter ,Routes, Route} from 'react-router-dom'

//liberia para poder utilizar mensajes
import {App} from 'antd';


//Paginas para utilizar en las rutas

//componente que engloba toda la aplicacion, se utiliza para que todas las pantallas trabajen bajo un mismo contenedor
import Container from 'components/container/Container'
import Login from 'pages/login/Login'
import Dashboard from 'pages/funcionarios/dashboard/dashboard'
import PrivateRoute from './PrivateRouter';
import { getToken } from "helpers/auth/auth";
import NavBar from 'components/navbar/Navbar';
import Recibos from 'pages/recibos/page';
import Form from 'pages/propietarios/crear/Crear';
import InformacionGastos from 'pages/recibos/informacion/page';
import Propietarios from 'pages/propietarios/page';
import CrearRecibos from 'pages/recibos/crear/page';

const RoutesMain = () =>{
    return (
				<App  message={{
					maxCount: 1
				}}>
					<BrowserRouter>

						{/* comprobamos si hay token para poder mostrar la barra de navegacion */}
						{getToken()?
							<NavBar/>
						:null}
						<Container>
							<Routes>
								{/*todas las rutas del sistema */}
								<Route exact path="/login" element={<Login/>}/>
								<Route exact path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
								<Route exact path="/recibos" element={<PrivateRoute><Recibos/></PrivateRoute>}/>
								<Route exact path="/propietarios" element={<PrivateRoute><Propietarios/></PrivateRoute>}/>
								<Route exact path="/recibos/:id/:cedula" element={<PrivateRoute><InformacionGastos/></PrivateRoute>}/>
								<Route exact path="/recibos/crear" element={<PrivateRoute><CrearRecibos/></PrivateRoute>}/>
								<Route exact path="/propietarios/crear" element={<PrivateRoute><Form/></PrivateRoute>}/>
							</Routes>
						</Container>
					</BrowserRouter>
				</App>
			)
}


export default RoutesMain