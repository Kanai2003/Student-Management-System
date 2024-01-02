import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    tasks: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        default: [],
    },
    tasks: [
        {
            description: { type: String, required: true },
            dueTime: { type: Date, required: true, },
            status: { type: String, enum: ['pending', 'overdue', 'completed'], default: 'pending' },
        },
    ],


}, { timestamps: true })

studentSchema.pre("save",
    async function (next) {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10)
    }
)

studentSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

studentSchema.methods.generateAuthToken = function () {
    const jwtSecret = process.env.JWT_SECRET || 'TGH-Tech-secret-key'; 
    return jwt.sign({ _id: this._id, email: this.email }, jwtSecret, { expiresIn: "10d" });
};

export const Student = mongoose.model("Student", studentSchema);