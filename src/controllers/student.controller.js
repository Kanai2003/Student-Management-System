import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.model.js"
import { Student } from '../models/student.model.js'



// student login
const studentLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email, password)) {
        throw new ApiError(400, "Email and Password is required")
    }

    const student = await Student.findOne({ email })

    if (!student) {
        throw new ApiError(400, "Student not found")
    }

    const isPasswordMatched = await student.isPasswordCorrect(password)

    if (!isPasswordMatched) {
        throw new ApiError(400, "wrong password")
    }

    const loggedInStudent = await Student.findById(student._id).select("-password")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res
        .status(200)
        .cookie("token", loggedInStudent.generateAuthToken(), options)
        .json(
            new ApiResponse(
                200,
                { student: loggedInStudent },
                "student logged in successfully"
            )
        )
})

// get all tasks details (description, dueTime, status)
const getAllTasks = asyncHandler( async(req, res) => {

    const studentId = req.student._id
    const tasks = await Student.findById(studentId).select("tasks")

    return res.status(200).json(
        new ApiResponse(200, tasks, "Tasks retrieved successfully")
    )
})

// change task status
const changeTaskStatus = asyncHandler( async(req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'overdue', 'completed'].includes(status)) {
        throw new ApiError(400, 'Invalid status. Must be one of: pending, overdue, completed');
    }

    const studentId = req.student._id;

    const student = await Student.findById(studentId);

    if (!student) {
        throw new ApiError(404, 'Student not found');
    }

    const task = student.tasks.id(taskId);

    if (!task) {
        throw new ApiError(404, 'Task not found');
    }

    // Update task status
    task.status = status;
    await student.save();

    return res.status(200).json(
        new ApiResponse(200, { task }, 'Task status changed successfully')
    );
})




export {
    studentLogin,
    getAllTasks,
    changeTaskStatus
}