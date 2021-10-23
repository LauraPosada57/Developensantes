// Laura posada  - Creado el 1 Oct 2021
import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
//import NavbarComponent from '../shared/components/navbar/NavbarComponent';

function UsuariosPage() {

    let users_db = []

    const [users, setUsers] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);


    const get_users = () => {
        // Se obtiene los datos de la API
        fetch("http://localhost:5000/api/users")
        .then(res => res.json())
        .then(data => {
            setUsers(data);
        });
    }

    useEffect(() => {
        get_users()
    }, [])

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        id_user: '',
        name: '',
        email: '',
        role: '',
        status: ''
    });

    const seleccionarUsuario = (item, caso) => {
        setUsuarioSeleccionado(item);
        (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        //console.log(name, value)
        setUsuarioSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const editar = () => {
        let userNueva = users;
        userNueva.map(usuario => {
            if (usuario.id_user === usuarioSeleccionado.id_user) {
                usuario.name = usuarioSeleccionado.name;
                usuario.email = usuarioSeleccionado.email;
                usuario.role = usuarioSeleccionado.role;
                usuario.status = usuarioSeleccionado.status;
            }
        });
        setUsers(userNueva);
        setModalEditar(false);
    }

    const eliminar =()=>{
          // Se obtiene los datos de la API
        const tokenId = localStorage.getItem('tokenId')
        fetch("http://localhost:5000/api/users/"+usuarioSeleccionado.id_user, {
            method: 'DELETE',
            body: JSON.stringify({tokenId: tokenId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.code == "ER_ROW_IS_REFERENCED_2") {
                alert("No es posible eliminar un usuario que tiene una venta asociada");
                get_users();
            } else {
                alert("Usuario eliminado con éxito!");
                get_users();
            }

        }).catch(err => {
            alert('No tienes permisos para esta operación')
        });
        setModalEliminar(false);

      }

    return (
        <Fragment>
            {/* <NavbarComponent /> */}
            <h1 className="text-center font-weight-bold" >USUARIOS DEL SISTEMA</h1><br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map(item => (
                                <tr key={item.id_user}>
                                    <td>{item.id_user}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>{item.status}</td>
                                    <td><button className="btn btn-primary" onClick={() => seleccionarUsuario(item, 'Editar')}>Editar</button> {"   "}
                                        <button className="btn btn-danger" onClick={() => seleccionarUsuario(item, 'Eliminar')}>Eliminar</button></td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Usuario</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            name="id"
                            value={usuarioSeleccionado && usuarioSeleccionado.id_user}
                        />
                        <br />

                        <label>Nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={usuarioSeleccionado && usuarioSeleccionado.name}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={usuarioSeleccionado && usuarioSeleccionado.email}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Rol</label>
                        <input
                            className="form-control"
                            type="text"
                            name="role"
                            value={usuarioSeleccionado && usuarioSeleccionado.role}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Estado</label>
                        <input
                            className="form-control"
                            type="text"
                            name="status"
                            value={usuarioSeleccionado && usuarioSeleccionado.status}
                            onChange={handleChange}
                        />
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
                    Estás seguro que deseas eliminar el usuario {usuarioSeleccionado && usuarioSeleccionado.name}
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





        </Fragment>
    );
}

export default UsuariosPage;
