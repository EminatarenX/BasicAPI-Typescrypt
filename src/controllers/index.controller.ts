import { Request, Response } from "express"
import { pool } from '../database'
import { QueryResult } from "pg";
import { User } from "../types/types";

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { rows }: QueryResult = await pool.query('SELECT * FROM users');

        if (rows.length === 0) return res.status(404).json('No hay usuarios registrados')

        return res.status(200).json(rows)
    } catch (error) {
        
        return res.status(500).json('No se pudieron obtener los usuarios')
    }

}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params


        const { rows }: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (rows.length === 0) return res.status(404).json('No se encontró al usuario')

        return res.status(200).json(rows)
    } catch (error) {
        
        return res.status(500).json('No se pudo obtener al usuario')
    }

}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre, email } = req.body

        const newUser: User = { name: nombre, email }

        await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [newUser.name, newUser.email]);

        return res.status(200).json({
            message: 'User created successfully',
            body: {
                user: {
                    nombre,
                    email
                }
            }
        })
    } catch (error) {
        
        return res.status(500).json('No se pudo crear el usuario')
    }


}

export const updateUsers = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    try {

        const { nombre, email } = req.body
        await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [nombre, email, id]);

        return res.status(200).json({
            message: 'User updated successfully',
            body: {
                user: {
                    nombre,
                    email
                }
            }
        })
    } catch (error) {
        
        return res.status(500).json('No se pudo actualizar el usuario')
    }

}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    try {

        await pool.query('DELETE FROM users WHERE id = $1', [id]);

        return res.status(200).json({ msg: `User ${id} deleted successfully` })

    } catch (error) {
        
        return res.status(400).json('No se pudo eliminar al usuario')
    }
}