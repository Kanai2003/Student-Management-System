import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        default: 'admin@admin.com'
    },
    password: {
        type: String,
        required: true,
        default: 'admin'
    },
}, { timestamps: true })

adminSchema.pre("save",
    async function (next) {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10)
    }
)

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


adminSchema.methods.generateAuthToken = function () {
    const jwtSecret = process.env.JWT_SECRET || 'TGH-Tech-secret-key'; 
    return jwt.sign({ _id: this._id, email: this.email }, jwtSecret, { expiresIn: "10d" });
};



export const Admin = mongoose.model("Admin", adminSchema);