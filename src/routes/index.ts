import { Router } from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUsers,
    deleteUser

} from "../controllers/index.controller";

const router = Router();

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.put('/users/:id', updateUsers)
router.delete('/users/:id', deleteUser)

export default router;