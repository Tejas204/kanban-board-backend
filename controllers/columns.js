import { Columns } from "../models/columns.js";

// Get all columns
export const fetchAllColumns = async (req,res) => {
    
    const columns = await Columns.find({});

    res.json({
        success: true,
        columns: columns
    });
};

// Create a new state
export const createNewState = async (req, res) => {

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
};