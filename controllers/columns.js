import { Columns } from "../models/columns.js";

// Get all columns
export const fetchAllStates = async (req,res) => {
    
    const columns = await Columns.find({});

    res.json({
        success: true,
        columns: columns
    });
};

// Create a new state
export const createNewState = async (req, res) => {

    const {name} = req.body;
    
    let column = await Columns.findOne({name});
    
    column = await Columns.create({
        name: name,
        user: req.user,
    });

    res.status(200).json({
        success: true,
        message: `${column.name} state created successfully`
    })
};

// Update the state
export const updateState = async(req, res) => {

}

// Get all states
export const getMyStates = async(req, res) => {

    let user = req.user;

    let allStates = await Columns.find({user});

    res.status(200).json({
        success: true,
        states: allStates,
    });
}