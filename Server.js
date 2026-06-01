const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de Sécurité et Parsing
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    optionsSuccessStatus: 200
}));

// Connexion NoSQL avec Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Route de test demandée au Jalon 1
app.get('/api/ping', (req, res) => {
    res.status(200).json({ message: "Serveur TaskFlow operationnel" });
});

// Enregistrement du routeur avec le préfixe imposé
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
                 
