import React, { useState, useEffect } from 'react';
import { getTipos, crearTipo, actualizarTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [tipos, setTipos] = useState([]);
  const { nombre = '', estado = '' } = valoresForm;
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getTipos();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarTipos();
  },[]);



const handleOnChange = (e) => {
  setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
}


const handleCrearTipo = async (e) => {
  e.preventDefault();
  try {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...'
    });
    Swal.showLoading();

    if (tipoSeleccionado) {
      await actualizarTipo(valoresForm, tipoSeleccionado);
      setTipoSeleccionado(null); 
    } else {
      await crearTipo(valoresForm);
    }
    
    setValoresForm({ nombre: '', estado: '' });
    listarTipos();
    Swal.close();
  } catch (error) {
    console.log(error);
    Swal.close();
  }
};


const handleActualizarTipo = async (e, tipo) => {
  e.preventDefault();
  setValoresForm({ nombre: tipo.nombre, estado: tipo.estado });
  setTipoSeleccionado(tipo._id); 
};

return (
    <div className='container-fluid mt-4'>
    <form onSubmit={(e) => handleCrearTipo(e)} >
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input required name='nombre' value={nombre} type="text" className="form-control"
              onChange={(e) => handleOnChange(e)} />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select required name='estado' value={estado} className="form-select" onChange={(e) => handleOnChange(e)} >
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
          <th scope="col">Estado</th>
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
          <th scope='col'>Acciones</th>
        
        </tr>
      </thead>
      <tbody>
        {
          tipos.length > 0 && tipos.map((tipo, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{tipo.nombre}</td>
              <td>{tipo.estado}</td>
              <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(tipo.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarTipo(e, tipo)}>Actualizar</button>
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
