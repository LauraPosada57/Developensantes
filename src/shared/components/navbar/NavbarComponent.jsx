import React, {useContext, useState} from "react";
import {Link} from 'react-router-dom';
import logo from '../../../assets/img/CAFE AROMA.png';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {web} from '../../../google.json'
import {StoreContext} from "../../../store/StoreProvider";
import {types} from "../../../store/storeReducer";
import apiBaseUrl from '../../utils/Api';


const clientId = web.client_id


function Login(props) {

    const [store, dispatch] = useContext(StoreContext);

    // obtener tokenid en la aplicaciones -----------------------
    // const tokenId = localStorage.getItem('tokenId')

    const onSuccess = (result) => {
        console.log(result)
        fetch(`${apiBaseUrl}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify({tokenId: result.tokenId}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.status)
            if(res.status === 200){
                localStorage.setItem('tokenId', result.tokenId)
                dispatch({type: types.authLogin})
            }
        }).catch(err =>{
        })
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Fallo al iniciar sesión, por favor ingresa con tu cuenta de Google`
        );
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Iniciar sesión con Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                isSignedIn={true}
            />
        </div>
    );

}

function Logout() {
    const [store, dispatch] = useContext(StoreContext);

    const onSuccess = () => {
        console.log('Se ha cerrado sesión correctamente');
        alert('Se ha cerrado sesión correctamente');
        dispatch({type: types.authLogout})
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Cerrar sesión"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}


function Menu(props) {

    const [store, dispatch] = useContext(StoreContext);
    const {isAuthenticated} = store

    if (isAuthenticated) {
        return (
            <>
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                <Link to="/ventas" className="nav-link">Ventas</Link>
                <Link to="/productos" className="nav-link">Productos</Link>
                <Link to="/usuarios" className="nav-link">Usuarios</Link>
            </>
        )
    } else {
        return (
            <>
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </>
        )
    }
}

function LogControl() {
    const [store, dispatch] = useContext(StoreContext);
    const {isAuthenticated} = store

    if (isAuthenticated) {
        return (
            <Logout/>
        )
    } else {
        return (
            <Login/>
        )
    }
}

function NavbarComponent(props) {

    let title = props.title;

    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-3" style={{backgroundColor: "#EFC3A4"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{title}</a>
                <img src={logo} alt="" width="125" height="82,18"/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Menu/>
                    </div>

                </div>
                <div className="d-flex">
                    <LogControl/>
                </div>
            </div>
        </nav>
    )
}


export default NavbarComponent;
