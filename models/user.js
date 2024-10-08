import mongoose from "mongoose";


//Define Scheema
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type : String,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

//Define model
export const User = mongoose.model("User", userSchema);