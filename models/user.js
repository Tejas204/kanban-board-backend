import mongoose from "mongoose";


//Define Scheema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

//Define model
export const User = mongoose.model("User", userSchema);