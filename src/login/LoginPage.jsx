import React, {Fragment, useContext, useState} from 'react';
import './LoginStyles.css';
import {StoreContext} from "../store/StoreProvider";


function Imagenes(props){
    return (
        <Fragment>
            <h1>Crear acá imagenes</h1>
        </Fragment>
    )
}

function LoginPage() {
    const [store, dispatch] = useContext(StoreContext);
    const {isAuthenticated} = store;

    if (isAuthenticated) {
        return (
            <Fragment>
                <div className="container">
                    <div className="card">
                        Hola, bienvenido a la aplicación AromaCafé,
                    </div>
                    <Imagenes/>
                </div>
            </Fragment>
        )
    }else{
        return (
            <>
                <div className="container">
                    <div className="card">
                        Para poder user la aplicación por favor inicia sesión con Google
                    </div>
                    <Imagenes/>
                </div>
            </>
        )
    }
}


export default LoginPage;
