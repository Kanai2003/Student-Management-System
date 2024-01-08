import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.model.js"
import { Student } from '../models/student.model.js'

// register admin
const adminRegister = asyncHandler( async(req, res) => {
    
    const {email, password} = req.body

    const newAdmin = await Admin.create({email, password});
    const createdAdmin = await Admin.findById(newAdmin._id).select("-password")

    if (!createdAdmin) {
        throw new ApiError(500, "Something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdAdmin, "User created successfully")
    )
})



// admin login
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email, password)) {
        throw new ApiError(400, "Email and Password is required")
    }

    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new ApiError(400, "Admin not found")
    }

    const isPasswordMatched = await admin.isPasswordCorrect(password)

    if (!isPasswordMatched) {
        throw new ApiError(400, "wrong password")
    }

    const loggedInAdmin = await Admin.findById(admin._id).select("-password")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res
        .status(200)
        .cookie("token", loggedInAdmin.generateAuthToken(), options)
        .json(
            new ApiResponse(
                200,
                { admin: loggedInAdmin },
                "Admin logged in successfully"
            )
        )
})


// add student by admin
const addStudent = asyncHandler( async(req, res) => {

    const {name, email, department, password} = req.body

    if(!(name, email, department, password)){
        throw new ApiError(400, "All fields are required")
    }

    const newStudent = await Student.create({name, email, department, password})

    const createdStudent = await Student.findById(newStudent._id).select("-password")
    if(!createdStudent){
        throw new ApiError(500, "Something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdStudent, "User created successfully")
    )
})

// add task by admin for individual student
const addTaskToOneStudent = asyncHandler( async(req, res) => {
    const {studentId, description, dueTime} = req.body

    if(!(studentId, description, dueTime)){
        throw new ApiError(400, "All fields are required")
    }

    const student = await Student.findById(studentId)

    if(!student){
        throw new ApiError(400, "Student not found")
    }

    student.tasks.push({description, dueTime})
    await student.save()

    return res.status(201).json(
        new ApiResponse(200, student, "Task added successfully")
    )
})

// add task by admin for all student
const addTaskToAllStudent = asyncHandler( async(req, res) => {
    const {description, dueTime} = req.body
    if(!(description, dueTime)){
        throw new ApiError(400, "All fields are required")
    }

    const students = await Student.find()

    for(const student of students){
        student.tasks.push({description, dueTime})
        await student.save()
    }

    return res.status(201).json(
        new ApiResponse(200, students, "Task added successfully")
    )
})

export {
    adminLogin,
    adminRegister,
    addStudent,
    addTaskToOneStudent,
    addTaskToAllStudent,
}