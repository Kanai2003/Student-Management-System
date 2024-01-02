import {Router} from 'express';
import {
    adminLogin,
    adminRegister,
    addStudent,
    addTaskToOneStudent,
    addTaskToAllStudent,
} from "../controllers/admin.controller.js"
import {verifyAdmin} from "../middlewares/auth.middleware.js"


const router = Router();


router.route("/register").post(adminRegister)
router.route("/login").post(adminLogin)
// secure routes
router.route("/add-student").post(verifyAdmin, addStudent)
router.route("/add-task-to-one-student").post(verifyAdmin, addTaskToOneStudent)
router.route("/add-task-to-all-student").post(verifyAdmin, addTaskToAllStudent)




export default router;