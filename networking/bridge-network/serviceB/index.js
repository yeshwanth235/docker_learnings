const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from service B',
        timestamp: new Date().toISOString()
    })
})

app.listen(3030, () => {
    console.log('Service B is running on port 3030');
})