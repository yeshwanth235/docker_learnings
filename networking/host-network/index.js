const express = require('express');
const os = require('os');

const app = express();

app.get('/metrics', (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpuCounts: os.cpus().length
    })
})

app.get('/', (req, res) => {
    res.send('Welcome to the Host Network Service');
})

app.listen(3000, () => {
    console.log('Host Network Service is running on port 3000');
})