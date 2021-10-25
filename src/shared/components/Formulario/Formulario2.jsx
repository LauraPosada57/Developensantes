import React, { Fragment, useState } from "react";
import { Redirect } from "react-router";
import formularioStyle from "./formularioStyle.css"
import apiBaseUrl from '../../utils/Api';

const Formulario2= () => {
    const [datos, setDatos] = useState({
        description: '',
        unit_price: '',
        status: ''
    })

    const handleInputChange = (event) => {

        setDatos({
            ...datos,
            [event.target.getAttribute("name")]: event.target.value
        })

    }

    const enviarDatos = (event) => {
        event.preventDefault();
        console.log(datos);
        fetch(`${apiBaseUrl}/api/products`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }          
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            alert("Producto añadido con éxito!")
        });
    }

    

    return (
        <Fragment>
            <h3 className="text-center display-5 text-secondary">Registro Producto</h3>
            <hr/>
            <div className="container ">
                <form className="row" id="row" onSubmit={enviarDatos} >
                    <div className="col-md-4">
                        <input placeholder="Descripción" className="form-control" type="text" name="description" onChange={handleInputChange}


                        />
                    </div>                  
                    <div className="col-md-4">
                        <input placeholder="Valor unitario" className="form-control" type="number" name="unit_price" onChange={handleInputChange}


                        />

                    </div>
                    <div className="col-md-4">
                        <select className="form-select" aria-label="Default select example" name="status" onChange={handleInputChange} defaultValue="">
                            <option value='' >Seleccione...</option>
                            <option value='1' >Disponible</option>
                            <option value='0'>No disponible</option>
                        </select>
                       

                    </div>


                </form>        
                <hr/>        
                <form className="row" id="row" onSubmit={enviarDatos} className="form-floating-mb-3">
                    
                        
                    

                    <div className="col-md-3">
                        <button className="btn btn-success" type="submit">Agregar</button>
                    </div>
                    


                    


                </form>
                

            </div>
            




        </Fragment>







    );


}

export default Formulario2;