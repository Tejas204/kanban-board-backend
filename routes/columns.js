import express from "express";
import { Columns } from "../models/columns.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/columns/allColumns", async (req,res) => {
    
    const columns = await Columns.find({});

    res.json({
        success: true,
        columns: columns
    });
});

router.post("/columns/createColumn", async (req, res) => {

    const {name, user} = req.body;
    // const token = req.cookies.token;
    // console.log(token);
    // const decoded = jwt.verify(token, "mySecret");
    // const user = await User.findById(decoded._id);

    // const columns = await Columns.findById({name});

    // if(columns){
    //     res.json({
    //         success: false,
    //         message: "Column with same name already exists"
    //     });
    // }
    // else{
    //     columns = await Columns.create({
    //         name: name,
    //         user: user
    //     })
    // }
    const columns = await Columns.create({
                name: name,
                user: user
            });
});

export default router;