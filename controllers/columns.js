import { Columns } from "../models/columns.js";

export const fetchAllColumns = async (req,res) => {
    
    const columns = await Columns.find({});

    res.json({
        success: true,
        columns: columns
    });
};