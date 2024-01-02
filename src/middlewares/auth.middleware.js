import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.model.js"
import { Student } from '../models/student.model.js'


export const verifyAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'TGH-Tech-secret-key')

    const admin = await Admin.findById(decodedToken._id)

    if (!admin) {
        throw new ApiError(401, "Unauthorized")
    }

    req.admin = admin

    next()
})


export const verifyStudent = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'TGH-Tech-secret-key')

    const student = await Student.findById(decodedToken._id)

    if (!student) {
        throw new ApiError(401, "Unauthorized")
    }

    req.student = student

    next()
})