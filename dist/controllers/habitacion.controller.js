"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarHabitacion = exports.modificarHabitacion = exports.obtenerhabitacion = exports.agregarHabitacion = exports.getHabitaciones = void 0;
const database_1 = require("../database");
const getHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield database_1.pool.query('SELECT * FROM habitacion');
        if (rows.length === 0) {
            return res.status(404).json('No se encontraron habitaciones');
        }
        return res.status(200).json(rows);
    }
    catch (error) {
        return res.status(500).json({ msg: 'No se pudieron obtener las habitaciones', error: error });
    }
});
exports.getHabitaciones = getHabitaciones;
const agregarHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion, precio } = req.body;
    const habitacion = { descripcion, precio };
    try {
        yield database_1.pool.query('INSERT INTO habitacion (descripcion, precio) VALUES ($1, $2)', [habitacion.descripcion, habitacion.precio]);
        return res.status(200).json({ msg: 'Habitacion agregada correctamente', habitacion: { descripcion, precio } });
    }
    catch (error) {
        return res.status(500).json({ msg: 'No se pudo agregar la habitacion', error: error });
    }
});
exports.agregarHabitacion = agregarHabitacion;
const obtenerhabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield database_1.pool.query('SELECT * FROM habitacion WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'No se encontro la habitacion' });
        }
        const habitacion = rows[0];
        return res.status(200).json(habitacion);
    }
    catch (error) {
        return res.status(500).json({ msg: 'No se pudo obtener la habitacion', error: error });
    }
});
exports.obtenerhabitacion = obtenerhabitacion;
const modificarHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { descripcion, precio } = req.body;
    const habitacion = { descripcion, precio };
    try {
        const { rows } = yield database_1.pool.query('SELECT * FROM habitacion WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'No se encontro la habitacion' });
        }
        yield database_1.pool.query('UPDATE habitacion SET descripcion = $1, precio = $2 WHERE id = $3', [habitacion.descripcion, habitacion.precio, id]);
        return res.status(200).json({ msg: 'habitacion modificada correctamente', habitacion: { descripcion, precio } });
    }
    catch (error) {
        return res.status(500).json({ msg: 'No se pudo modificar la habitacion', error: error });
    }
});
exports.modificarHabitacion = modificarHabitacion;
const eliminarHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield database_1.pool.query('SELECT * FROM habitacion WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'No se encontro la habitacion' });
        }
        yield database_1.pool.query('DELETE FROM habitacion WHERE id = $1', [id]);
        return res.status(200).json({ msg: 'Habitacion eliminada correctamente' });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al eliminar la habitacion', error: error });
    }
});
exports.eliminarHabitacion = eliminarHabitacion;
