"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitacion_controller_1 = require("../controllers/habitacion.controller");
const router = (0, express_1.Router)();
router.get('/', habitacion_controller_1.getHabitaciones);
router.post('/', habitacion_controller_1.agregarHabitacion);
router.route('/:id')
    .get(habitacion_controller_1.obtenerhabitacion)
    .put(habitacion_controller_1.modificarHabitacion)
    .delete(habitacion_controller_1.eliminarHabitacion);
exports.default = router;
