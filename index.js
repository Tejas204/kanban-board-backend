import express from 'express';

const app = express();

app.get("/getProducts", (req, res) => {
    res.json(
        {
            "success": true,
            "products": []
        }
    )
})

app.listen(5000, () => {
    console.log("Server is working");
})