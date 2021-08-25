const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use('/', require('./server/router/router'));

app.listen(port, ()=>{
    console.log(`Server is Started on http://localhost:${port}`);
})
