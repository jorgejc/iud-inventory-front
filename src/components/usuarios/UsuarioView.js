import React, { useState, useEffect } from 'react';
import { getUsuarios, crearUsuario, actualizarUsuario } from '../../services/usuarioService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const UsuarioView = () => {

const [valoresForm, setValoresForm] = useState([]);
const [usuarios, setUsuarios] = useState([]);
const { nombre = '', email = '', estado = '' } = valoresForm;
const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

const listarUsuarios = async () => {
  try {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...'
      });
    Swal.showLoading();
    const resp = await getUsuarios();
    setUsuarios(resp.data);
    Swal.close();
  } catch (error) {
    console.log(error);
    Swal.close();
  }
}

useEffect(() => {
  listarUsuarios();
}, []);

const handleOnChange = (e) => {
  setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
}


const handleCrearUsuario = async (e) => {
  e.preventDefault();
  try {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...'
    });
    Swal.showLoading();

    if (usuarioSeleccionado) {
      await actualizarUsuario(valoresForm, usuarioSeleccionado);
      setUsuarioSeleccionado(null);
    } else {
      await crearUsuario(valoresForm);
    }
    
    setValoresForm({ nombre: '', email: '', estado: '' });
    listarUsuarios();
    Swal.close();
  } catch (error) {
    console.log(error);
    Swal.close();
  }
};

const handleActualizarUsuario = async (e, usuario) => {
  e.preventDefault();
  setValoresForm({ nombre: usuario.nombre, email: usuario.email, estado: usuario.estado });
  setUsuarioSeleccionado(usuario._id); 
};

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCrearUsuario(e)} >
        <div className="row">
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input required name='email' value={email} type="email" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='estado' value={estado} className="form-select" 
              onChange={(e) => handleOnChange(e)} >
                <option selected>--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.length > 0 && usuarios.map((usuario, index) => {
              return <tr>
                <th scope='row'> {index + 1}</th>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.estado}</td>
                <td>{moment(usuario.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(usuario.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarUsuario(e, usuario)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm'>Eliminar</button>
                </td>
                
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
