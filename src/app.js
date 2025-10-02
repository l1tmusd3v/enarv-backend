if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
const router = require('./api/routes');

app.use('/api', router);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Enarv Backend API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});