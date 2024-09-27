import { axiosInstance } from "../helper/axios-config";

const getInventarios = () => {
    return axiosInstance.get('inventario', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearInventario = (data) => {
    return axiosInstance.post('inventario', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarInventario = (inventarioId, data) => {
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const getInventarioPorId = (inventarioId) => {
    return axiosInstance.get(`inventario/${inventarioId}`, {

        header: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getInventarios, crearInventario, actualizarInventario, getInventarioPorId
}