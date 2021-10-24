import React, { Fragment, useState, useEffect} from "react";
import formularioStyle from "./formularioStyle.css"
import apiBaseUrl from '../../utils/Api';

const Formulario = () => {

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [datos, setDatos] = useState({})

    const handleInputChange = (event) => {

        setDatos({
            ...datos,
            [event.target.getAttribute("name")]: event.target.value
        })
        getUnitValue();
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        console.log(datos);
        datos["unit_price"] = document.getElementById("unitPrice").value;
        fetch(`${apiBaseUrl}/api/sales`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }          
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            alert("Venta añadida con éxito!")
        });
    }

    useEffect(() => {
        getProducts();
        getUsers();
        getUnitValue();
    }, [])

    const getUnitValue = () => {
        let productSelected = products.filter(p => {
            let idSelected = document.getElementById("selectProduct").value;
            return idSelected == p.id_product;
        });
        let priceElement = document.getElementById("unitPrice");
        priceElement.value = productSelected[0]?.unit_price; 
    } 

    const getProducts = () => {
        // Se obtiene los datos de la API 
        fetch(`${apiBaseUrl}/api/products`)
        .then(res => res.json())
        .then(data => {
            let products_db = data
            setProducts(products_db);
        });
    }  

    const getUsers = () => {
        // Se obtiene los datos de la API 
        fetch(`${apiBaseUrl}/api/users`)
        .then(res => res.json())
        .then(data => {
            let users = data.filter(u => u.role == "admin")
            setUsers(users);
        });
    }  


    return (
     
        <Fragment>
            <h1 className="text-center display-5 text-primary">Registro Ventas</h1>
            <div className="container " >
                <form className="row" id="row" onSubmit={enviarDatos}>
                    <div className="mb-3 row" >                    
                    <div className="col-md-4">
                        <select className="form-select" aria-label="Default select example" name="id_product" id="selectProduct" onChange={handleInputChange} defaultValue="0">
                            <option value="0" >Selecciona producto..</option>
                            {
                                products.map( product => 
                                <option value={product.id_product} key={product.id_product}>{product.description}</option> )
                            }
                            </select>

                    </div>
                    <div className="col-md-4">
                        <input placeholder="Cedula cliente" className="form-control" type="text" name="id_client" onChange={handleInputChange}/>
                    </div>
                    <div className="col-md-4">
                         <input placeholder="Nombre cliente" className="form-control" type="text" name="name_client" onChange={handleInputChange}/>                       
                    </div>
                    </div>
                <hr/>            
                <div className="mb-3 row" >    
                    <div className="col-md-3">
                        <input placeholder="Valor Unitario" className="form-control" type="number" name="unit_price" id="unitPrice" onChange={handleInputChange}/>
                    </div>
                    <div className="col-md-3">
                    <input placeholder="Cantidad" className="form-control" type="number" name="amount" onChange={handleInputChange}/>                        
                    </div>
                    <div className="col-md-3">
                        <input placeholder="Valor total" className="form-control" type="number" name="total_value" onChange={handleInputChange}/>                        
                    </div>
                    <div className="col-md-3">                    
                        <input placeholder="Fecha Venta" className="form-control" type="date" name="date" onChange={handleInputChange} />
                    </div>
                    </div>
                <hr/>
                <div className="mb-3 row" >
                    <div className="col-md-5">
                            <select className="form-select" aria-label="Default select example" name="id_seller" onChange={handleInputChange} defaultValue="0" >
                            <option value="0" >Selecciona Vendedor..</option>
                            {
                                users.map( user => 
                                <option value={user.id_user} key={user.id_user}>{user.name}</option> )
                            }
                            </select>                        
                    </div>
                    

                    <div className="col-md-3">
                        <button className="btn btn-primary" type="submit" >Enviar</button>
                    </div>
                        </div>
                
                    </form>
            </div>
            




        </Fragment>







    );


}

export default Formulario;