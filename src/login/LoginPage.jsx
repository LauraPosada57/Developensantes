import React, {Fragment, useContext, useState} from 'react';
import './LoginStyles.css';
import {StoreContext} from "../store/StoreProvider";
import Carrusel from '../shared/components/carrusel/Carrusel'


function Imagenes(props){
    return (
        <Fragment>
            <Carrusel></Carrusel>
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
