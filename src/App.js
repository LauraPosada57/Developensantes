import React, {Fragment} from 'react';
import LoginPage from './login/LoginPage.jsx';
import VentasPage from './ventas/VentasPage.jsx';
import ProductosPage from './productos/ProductosPage.jsx';
import UsuariosPage from './usuarios/UsuariosPage.jsx';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavbarComponent from './shared/components/navbar/NavbarComponent';
import Formulario from './shared/components/Formulario/Formulario.jsx';
import Formulario2 from './shared/components/Formulario/Formulario2.jsx';
import StoreProvider from "./store/StoreProvider";


function App() {
    return (
        <StoreProvider>
            <Router>
                <NavbarComponent/>
                <Switch>
                    <Route path="/" exact>
                        <LoginPage/>
                    </Route>
                    <Route path="/ventas" exact>
                        <VentasPage/>
                    </Route>
                    <Route path="/productos" exact>
                        <ProductosPage/>
                    </Route>
                    <Route path="/usuarios" exact>
                        <UsuariosPage/>
                    </Route>
                    <Route path="/formulario" exact>
                        <Formulario/>
                    </Route>
                    <Route path="/formulario2" exact>
                        <Formulario2/>
                    </Route>
                </Switch>
            </Router>
        </StoreProvider>
    );
}

export default App;
