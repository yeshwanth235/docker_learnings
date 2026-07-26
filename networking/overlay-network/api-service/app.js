const express = require("express")
const axios = require("axios")
const os = require("os");


const app = express();

app.get("/", async (req, res) => {
    try {
        const response = await axios.get('http://worker-service:4000/task');
        res.json({
            apiHostName: os.hostname(),
            workResponse: response.data
        })
    } catch(error) {
        res.status(500).json({
            apiHostName: os.hostname(),
            error: "Failed to reach worker-service",
            details: error.message
        })
    }
});

app.listen(4040, () => {
    console.log("API gateway listening on port 4040")
})