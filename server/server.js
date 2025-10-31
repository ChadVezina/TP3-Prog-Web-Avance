import express from "express";
import cors from "cors";
import mysql from "mysql2";
import { config } from "dotenv";
import forfaitsRouter from "./routes/forfaits.js";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let db;
if (process.env.DB_HOST) {
  db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the MySQL database");
  });
}

// Middleware pour attacher la connexion db à chaque requête
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Utiliser le routeur des forfaits
app.use("/api/forfaits", forfaitsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
