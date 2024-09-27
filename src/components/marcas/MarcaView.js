import React, { useState, useEffect } from 'react';
import { getMarcas, crearMarca } from '../../services/marcaService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const MarcaView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [marcas, setMarcas] = useState([]);
  const { nombre = '', estado = '' } = valoresForm;


  const listarMarcas = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getMarcas();
      setMarcas(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarMarcas();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearMarca = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearMarca(valoresForm);
      setValoresForm({ nombre: '', estado: '' });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='container-fluid'>
    <form onSubmit={(e) => handleCrearMarca(e)} >
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
      <button className="btn btn-primary">Guardar</button>
    </form>

    <table className="table">
      <thead>
        <tr>
          <th scope='row'>#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
        </tr>
      </thead>
      <tbody>
        {
          marcas.length > 0 && marcas.map((marca, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{marca.nombre}</td>
              <td>{marca.estado}</td>
              <td>{moment(marca.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(marca.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
  )
}
