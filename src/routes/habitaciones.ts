import { Router } from "express";
import {
    agregarHabitacion,
    getHabitaciones,
    obtenerhabitacion,
    modificarHabitacion,
    eliminarHabitacion
} from "../controllers/habitacion.controller";


const router = Router();

router.get('/', getHabitaciones)
router.post('/', agregarHabitacion)
router.route('/:id')
.get(obtenerhabitacion)
.put(modificarHabitacion)
.delete(eliminarHabitacion)

export default router;