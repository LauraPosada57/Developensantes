// Laura posada  - Creado el 1 Oct 2021
import React, { Fragment, useState, useEffect } from 'react';
import './ProductosStyles.css';
//import NavbarComponent from '../shared/components/navbar/NavbarComponent';
import { Link } from "react-router-dom"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import apiBaseUrl from '../shared/utils/Api';



function ProductosPage() {

    let products_db = [];

    const [products, setProducts] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const get_products = () => {
        // Se obtiene los datos de la API
        fetch(`${apiBaseUrl}/api/products`)
        .then(res => res.json())
        .then(data => {
            products_db = data
            setProducts(products_db);
        });
    }

    useEffect(() => {
        get_products()
    }, [])

    const handleChange = e => {
        setBusqueda(e.target.value);
    }

    const [ProductoSeleccionado, setProductoSeleccionado] = useState({
        id_product: '',
        description: '',
        unit_price: '',
        status: 1
    });

    const seleccionarProducto = (item, caso) => {
        setProductoSeleccionado(item);
        (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
    }

    const bChange = e => {
        const { name, value } = e.target;
        //console.log(name, value)
        setProductoSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const editar = () => {
        console.log("sending to update", ProductoSeleccionado);
        fetch(`${apiBaseUrl}/api/products/`+ProductoSeleccionado.id_product, {
            method: 'PUT',
            body: JSON.stringify(ProductoSeleccionado),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            get_products();
            setModalEditar(false);
            console.log('Success:', response);
        });

    }

    const eliminar = () => {
        // Se obtiene los datos de la API
        fetch(`${apiBaseUrl}/api/products/`+ProductoSeleccionado.id_product, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.code == "ER_ROW_IS_REFERENCED_2") {
                alert("No es posible eliminar un producto que tiene ventas asociadas");
                get_products();
            } else {
                alert("Producto eliminado con éxito!");
                get_products();
            }

        });
        setModalEliminar(false);

    }

    return (
        <Fragment>
            {/* <NavbarComponent /> */}
            <h1>PRODUCTOS REGISTRADOS</h1><br />

            <div className="containerInput p-4">
                <label><b>Buscar:</b></label>
                <input
                    className="form-control inputBuscar mb-3"
                    value={busqueda}
                    placeholder="Búsqueda por Identificación o Descripción"
                    onChange={handleChange} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id Producto</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Valor Unitario</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        products
                        .filter((producto) => {
                            if (producto.id_product.toString().toLowerCase().includes(busqueda.toLowerCase())
                                || producto.description.toString().toLowerCase().includes(busqueda.toLowerCase())
                            ) {
                                return producto;
                            }
                        })
                        .map(item => {
                            return (
                                <tr key={item.id_product}>
                                    <td>{item.id_product}</td>
                                    <td>{item.description}</td>
                                    <td>{item.unit_price}</td>
                                    <td>{item.status ? "Disponible": "No disponible"}</td>
                                    <td><button className="btn btn-primary" onClick={() => seleccionarProducto(item, 'Editar')}>Editar</button> {"   "}
                                        <button className="btn btn-danger" onClick={() => seleccionarProducto(item, 'Eliminar')}>Eliminar</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>


            </table>
            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Producto</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID Producto</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            name="id_product"
                            value={ProductoSeleccionado && ProductoSeleccionado.id_product}
                        />
                        <br />

                        <label>Descripcion</label>
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            value={ProductoSeleccionado && ProductoSeleccionado.description}
                            onChange={bChange}
                        />
                        <br />

                        <label>Valor unidad</label>
                        <input
                            className="form-control"
                            type="number"
                            name="unit_price"
                            value={ProductoSeleccionado && ProductoSeleccionado.unit_price}
                            onChange={bChange}
                        />
                        <br />
                        <br />

                        <label>Estado</label>
                        <select className="form-select" aria-label="Default select example"name="status" onChange={bChange} defaultValue={ProductoSeleccionado.status}>
                            <option value='1'>Disponible</option>
                            <option value='0'>No disponible</option>
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
                    Estás seguro que deseas eliminar el Producto {ProductoSeleccionado && ProductoSeleccionado.name}
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
                <Link to="/formulario2">
                    <button className="btn btn-warning" type="button">Ingresar</button>
                </Link>
            </div>


        </Fragment>
    )
}

export default ProductosPage;
