const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
    const response  = await axios.get('http://service-b:3030/');
    res.json({
        message: 'Hello from Service A',
        dataFromServiceB: response.data
    })
})

app.listen(3000, () => {
    console.log('service A is running on port 3000');
})