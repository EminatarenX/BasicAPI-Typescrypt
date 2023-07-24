import { Request, Response } from "express";
import { pool } from '../database';
import { Query, QueryResult } from "pg";
import { Habitacion } from "../types/types"

const getHabitaciones = async (req: Request, res: Response) : Promise<Response> => {
    try {
        const {rows}: QueryResult = await pool.query('SELECT * FROM habitacion')

        if(rows.length === 0){
            return res.status(404).json('No se encontraron habitaciones')
        }
        return res.status(200).json(rows)
    }catch(error) {
    
        return res.status(500).json({msg: 'No se pudieron obtener las habitaciones', error: error})
    }
}

const agregarHabitacion = async (req: Request, res: Response) : Promise<Response> => {
    const { descripcion, precio } = req.body;

    const habitacion: Habitacion = {descripcion, precio}

    try {
        await pool.query('INSERT INTO habitacion (descripcion, precio) VALUES ($1, $2)', [habitacion.descripcion, habitacion.precio])

        return res.status(200).json({msg: 'Habitacion agregada correctamente', habitacion: {descripcion, precio}})
    }catch(error) {
 
        return res.status(500).json({msg: 'No se pudo agregar la habitacion', error: error})
    }
}

const obtenerhabitacion = async (req: Request, res: Response) : Promise<Response> => {
    const { id } = req.params;

    try {
        const {rows}: QueryResult = await pool.query('SELECT * FROM habitacion WHERE id = $1', [id])

        if(rows.length === 0) {
            return res.status(404).json({msg: 'No se encontro la habitacion'})
        }

        const habitacion = rows[0]

        return res.status(200).json(habitacion)

    }catch (error) {
        return res.status(500).json({msg: 'No se pudo obtener la habitacion', error: error})
    }
}

const modificarHabitacion = async (req: Request, res: Response) : Promise<Response> => {
    const { id } = req.params;
    const { descripcion, precio } = req.body;

    const habitacion: Habitacion = { descripcion, precio}

    try {
        const {rows}: QueryResult = await pool.query('SELECT * FROM habitacion WHERE id = $1', [id])
        

        if(rows.length === 0) {
            return res.status(404).json({msg: 'No se encontro la habitacion'})
        }

        await pool.query('UPDATE habitacion SET descripcion = $1, precio = $2 WHERE id = $3', [habitacion.descripcion, habitacion.precio, id])

        return res.status(200).json({msg: 'habitacion modificada correctamente', habitacion: {descripcion, precio}})
        
    } catch (error) {
        return res.status(500).json({msg: 'No se pudo modificar la habitacion', error: error})
    }


}

const eliminarHabitacion = async (req: Request, res: Response) : Promise<Response> => {
    const { id } = req.params;

    try {
        const {rows} : QueryResult = await pool.query('SELECT * FROM habitacion WHERE id = $1', [id])

        if(rows.length === 0) {
            return res.status(404).json({msg: 'No se encontro la habitacion'})
        }

        await pool.query('DELETE FROM habitacion WHERE id = $1', [id])

        return res.status(200).json({msg: 'Habitacion eliminada correctamente'})
        
    } catch (error) {
        return res.status(500).json({msg: 'Hubo un error al eliminar la habitacion', error: error})
    }
}

export {
    getHabitaciones,
    agregarHabitacion,
    obtenerhabitacion,
    modificarHabitacion,
    eliminarHabitacion
}