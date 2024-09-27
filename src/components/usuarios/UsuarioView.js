import React, { useState, useEffect } from 'react';
import { getUsuarios, crearUsuario } from '../../services/usuarioService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const UsuarioView = () => {

const [valoresForm, setValoresForm] = useState([]);
const [usuarios, setUsuarios] = useState([]);
const { nombre = '', email = '', estado = '' } = valoresForm;

const listarUsuarios = async () => {
  try {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...'
  });
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
  console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
    });
    Swal.showLoading();
    const resp = await crearUsuario(valoresForm);
    Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }

}

  return (
    <div className='container-fluid'>
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
        <button className="btn btn-primary">Guardar</button>
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
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
