import {Router} from 'express';
import {verifyStudent} from "../middlewares/auth.middleware.js"

import {
    studentLogin,
    getAllTasks,
    changeTaskStatus
} from "../controllers/student.controller.js"



const router = Router();


router.route("/login").post(studentLogin)
// secure routes
router.route("/tasks").get(verifyStudent, getAllTasks)
router.route("/change-task-status/:taskId").put(verifyStudent, changeTaskStatus)



export default router;