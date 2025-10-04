// Load environment variables only in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const optionsService = require('./api/services/optionsService'); // <-- FIX: Corrected typo (optionsService)
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');


const authRoutes = require('./api/routes/authRoutes');
const userRoutes = require('./api/routes/userRoutes');
const cookieParser = require('cookie-parser');


const app = express();

// --- GLOBAL MIDDLEWARE ---
app.use(cors());
app.use(express.json()); 
app.use(cookieParser())
// --- SWAGGER DOCUMENTATION ROUTE ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- API ROUTES ---

app.use('/auth', authRoutes);
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Enarv API is running!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await optionsService.loadOptions();
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;