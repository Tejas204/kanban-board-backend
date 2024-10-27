import mongoose from "mongoose";


//Define Scheema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type : String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

//Define model
export const User = mongoose.model("User", userSchema);