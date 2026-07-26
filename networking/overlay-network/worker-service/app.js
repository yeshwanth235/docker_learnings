const express = require("express")
const os = require("os");

const app = express();

app.get("/task", (req, res) => {
    res.json({
        message: 'Task completed by worker',
        hostname: os.hostname(),
        timestamp: new Date().toISOString()
    })
});

app.listen(4000, () => {
    console.log("API gateway listening on port 4000")
})

