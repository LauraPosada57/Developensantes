// Laura posada  - Creado el 1 Oct 2021
import React, { Fragment, useState, useEffect } from 'react';
import './VentasStyles.css';
//import NavbarComponent from '../shared/components/navbar/NavbarComponent';
import Formulario from '../shared/components/Formulario/Formulario';
import { Link } from "react-router-dom"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import apiBaseUrl from '../shared/utils/Api';





function VentasPage() {

    let sales_db =[]


    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [sales, setSales] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const get_sales = () => {
           // Se obtiene los datos de la API
        fetch(`${apiBaseUrl}/api/sales`)
        .then(res => res.json())
        .then(data => {
            sales_db = data
            setSales(sales_db);
        });
    }

    useEffect(() => {
        getProducts();
        getUsers();
        get_sales();
    }, [])


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
            let users = data.filter(u => u.role === "admin")
            console.log(users)
            setUsers(users);
            // console.log(data)
        });
    }


    const handleChange = e => {
        setBusqueda(e.target.value);
    }

    const [SaleSeleccionado, setSaleSeleccionado] = useState({
        id_sale: '',
        total_value: '',
        id_product: '',
        amount: '',
        unit_price: '',
        date: '',
        id_client: '',
        name_client: '',
        id_seller: ''


    });

    const seleccionarSale = (item, caso) => {
        setSaleSeleccionado(item);
        (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
    }

    const bChange = e => {
        const { name, value } = e.target;
        //console.log(name, value)
        setSaleSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const editar = () => {
        console.log("sending to update", SaleSeleccionado);
        SaleSeleccionado.date = SaleSeleccionado.date.split("T")[0];
        fetch(`${apiBaseUrl}/api/sales/`+SaleSeleccionado.id_sale, {
            method: 'PUT',
            body: JSON.stringify(SaleSeleccionado),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            get_sales();
            setModalEditar(false);
            console.log('Success:', response);
        });
    }

    const eliminar =()=>{
          // Se obtiene los datos de la API
          fetch(`${apiBaseUrl}/api/sales/`+SaleSeleccionado.id_sale, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.code == "ER_ROW_IS_REFERENCED_2") {
                alert("No es posible eliminar una venta que tiene productos asociadas");
                get_sales();
            } else {
                alert("Venta eliminada con éxito!");
                get_sales();
            }

        });
        setModalEliminar(false);

      }

    return (
        <Fragment>
            {/* <NavbarComponent /> */}
            <h1>GESTIÓN DE VENTAS</h1><br />

            <div className="containerInput p-4">
            <label><b>Buscar:</b></label>
                <input
                    className="form-control inputBuscar mb-3"
                    value={busqueda}
                    placeholder="Búsqueda por Identificación de venta, cliente o nombre del cliente"
                    onChange={handleChange} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id Venta</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Valor Unitario</th>
                        <th scope="col">Fecha Venta</th>
                        <th scope="col">Cedula Cliente</th>
                        <th scope="col">Nombre Cliente</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                {
                    sales
                    .filter((sale) => {
                        if (sale.id_sale.toString().toLowerCase().includes(busqueda.toLowerCase())
                            || sale.id_client.toString().toLowerCase().includes(busqueda.toLowerCase())
                            || sale.name_client.toString().toLowerCase().includes(busqueda.toLowerCase())
                        ) {
                            return sale;
                        }
                    })
                    .map(item => {
                        return (
                            <tr key={item.id_sale}>
                            <td>{ item.id_sale }</td>
                            <td>{ item.total_value }</td>
                            <td>{ item.product_description }</td>
                            <td>{ item.amount }</td>
                            <td>{ item.unit_price }</td>
                            <td>{ item.date.split("T")[0] }</td>
                            <td>{ item.id_client }</td>
                            <td>{ item.name_client }</td>
                            <td>{ item.name_seller }</td>
                            <td><button className="btn btn-primary" onClick={() => seleccionarSale(item, 'Editar')}>Editar</button> {"   "}
                                        <button className="btn btn-danger" onClick={() => seleccionarSale(item, 'Eliminar')}>Eliminar</button></td>
                            </tr>

                        );
                    })
                }
                </tbody>
            </table>
            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Venta</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID Venta</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            name="id_sale"
                            value={SaleSeleccionado && SaleSeleccionado.id_sale}
                        />
                        <br />

                        <label>total valor</label>
                        <input
                            className="form-control"
                            type="number"
                            name="total_value"
                            value={SaleSeleccionado && SaleSeleccionado.total_value}
                            onChange={bChange}
                        />
                        <br />

                        <label>Id producto</label>
                        <select className="form-select" aria-label="Default select example" name="id_product" id="selectProduct" onChange={bChange} defaultValue={SaleSeleccionado.id_product}>
                            <option value="0" >Selecciona producto..</option>
                            {
                                products.map( product =>
                                <option value={product.id_product} key={product.id_product}>{product.description}</option> )
                            }
                            </select>
                        <br />
                        <br />

                        <label>Monto</label>
                        <input
                            className="form-control"
                            type="text"
                            name="amount"
                            value={SaleSeleccionado && SaleSeleccionado.amount}
                            onChange={bChange}
                        />
                        <br />
                        <br />

                        <label>Precio Unidad</label>
                        <input
                            className="form-control"
                            type="number"
                            name="unit_price"
                            value={SaleSeleccionado && SaleSeleccionado.unit_price}
                            onChange={bChange}
                        />
                        <br />
                        <br />

                        <label>Fecha</label>
                        <input
                            className="form-control"
                            type="date"
                            name="date"
                            value={SaleSeleccionado && SaleSeleccionado.date.split("T")[0]}
                            onChange={bChange}
                        />
                        <br />
                        <br />

                        <label>Id cliente</label>
                        <input
                            className="form-control"
                            type="text"
                            name="id_client"
                            value={SaleSeleccionado && SaleSeleccionado.id_client}
                            onChange={bChange}
                        />
                        <br />
                        <br />

                        <label>Nombre cliente</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name_client"
                            value={SaleSeleccionado && SaleSeleccionado.name_client}
                            onChange={bChange}
                        />
                        <br />
                        <br />

                        <label>Vendedor</label>
                        <select className="form-select" aria-label="Default select example" name="id_seller" onChange={bChange} defaultValue={SaleSeleccionado.id_seller}>
                            <option value="0" >Selecciona Vendedor..</option>
                            {
                                users.map( user =>
                                <option value={user.id_user} key={user.id_user}>{user.name}</option> )
                            }
                            </select>
                        <br />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => editar()}>
                        Actualizar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setModalEditar(false)}
                    >
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    Estás seguro que deseas eliminar la venta {SaleSeleccionado && SaleSeleccionado.name_client}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminar()}>
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setModalEliminar(false)}
                    >
                        No
                    </button>
                </ModalFooter>
            </Modal>


            <div>
                <Link to="/formulario">
                <button className="btn btn-warning" type="button">Ingresar</button>
                </Link>
            </div>

        </Fragment>
    )
}


export default VentasPage;
