// Importation des modules nécessaires
import express from "express";
import cors from "cors";
import mysql from "mysql2";
import { config } from "dotenv";
import forfaitsRouter from "./routes/forfaits.js";

// Chargement des variables d'environnement depuis le fichier .env
config();

// Création de l'application Express
const app = express();

// Configuration des middlewares
app.use(express.json()); // Pour parser les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les données URL-encodées
app.use(cors()); // Pour autoriser les requêtes cross-origin

// Configuration de la connexion à la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Initialisation de la connexion à la base de données MySQL
let db;
if (process.env.DB_HOST) {
  db = mysql.createConnection(dbConfig);

  // Tentative de connexion à la base de données
  db.connect((err) => {
    if (err) {
      console.error("Erreur lors de la connexion à la base de données:", err);
      return;
    }
    console.log("Connecté à la base de données MySQL");
  });
}

// Middleware pour attacher la connexion à la base de données à chaque requête
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Utilisation du routeur pour gérer les routes des forfaits
app.use("/api/forfaits", forfaitsRouter);

// Configuration du port du serveur
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
