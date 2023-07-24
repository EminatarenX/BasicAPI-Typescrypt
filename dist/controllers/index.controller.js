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
exports.deleteUser = exports.updateUsers = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield database_1.pool.query('SELECT * FROM users');
        if (rows.length === 0)
            return res.status(404).json('No hay usuarios registrados');
        return res.status(200).json(rows);
    }
    catch (error) {
        return res.status(500).json('No se pudieron obtener los usuarios');
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rows } = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (rows.length === 0)
            return res.status(404).json('No se encontró al usuario');
        return res.status(200).json(rows);
    }
    catch (error) {
        return res.status(500).json('No se pudo obtener al usuario');
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, email } = req.body;
        const newUser = { name: nombre, email };
        yield database_1.pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [newUser.name, newUser.email]);
        return res.status(200).json({
            message: 'User created successfully',
            body: {
                user: {
                    nombre,
                    email
                }
            }
        });
    }
    catch (error) {
        return res.status(500).json('No se pudo crear el usuario');
    }
});
exports.createUser = createUser;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { nombre, email } = req.body;
        yield database_1.pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [nombre, email, id]);
        return res.status(200).json({
            message: 'User updated successfully',
            body: {
                user: {
                    nombre,
                    email
                }
            }
        });
    }
    catch (error) {
        return res.status(500).json('No se pudo actualizar el usuario');
    }
});
exports.updateUsers = updateUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.pool.query('DELETE FROM users WHERE id = $1', [id]);
        return res.status(200).json({ msg: `User ${id} deleted successfully` });
    }
    catch (error) {
        return res.status(400).json('No se pudo eliminar al usuario');
    }
});
exports.deleteUser = deleteUser;
