import express from "express";
import cors from "cors";
import mysql from "mysql2";
import { config } from "dotenv";
import * as ForfaitModel from "./models/forfaitModel.js";

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


app.get("/api/forfaits", async (req, res) => {
  try {
    const forfaits = await ForfaitModel.getAllForfaits(db);
    res.json(forfaits);
  } catch (error) {
    console.error("Erreur lors de la récupération des forfaits:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


app.get("/api/forfaits/:id", async (req, res) => {
  try {
    const forfait = await ForfaitModel.getForfaitById(db, req.params.id);
    res.json(forfait);
  } catch (error) {
    console.error("Erreur lors de la récupération du forfait:", error);
    if (error.message === "Forfait non trouvé") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
});

app.get("/api/forfaits/categorie/:categorie", async (req, res) => {
  try {
    const forfaits = await ForfaitModel.getForfaitsByCategorie(db, req.params.categorie);
    res.json(forfaits);
  } catch (error) {
    console.error("Erreur lors de la récupération des forfaits par catégorie:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


app.post("/api/forfaits", async (req, res) => {
  try {
    const forfait = await ForfaitModel.createForfait(db, req.body);
    res.status(201).json(forfait);
  } catch (error) {
    console.error("Erreur lors de la création du forfait:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put("/api/forfaits/:id", async (req, res) => {
  try {
    const forfait = await ForfaitModel.updateForfait(db, req.params.id, req.body);
    res.json(forfait);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du forfait:", error);
    if (error.message === "Forfait non trouvé") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
});


app.delete("/api/forfaits/:id", async (req, res) => {
  try {
    const result = await ForfaitModel.deleteForfait(db, req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Erreur lors de la suppression du forfait:", error);
    if (error.message === "Forfait non trouvé") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
});

app.get("/api/forfaits/search/:term", async (req, res) => {
  try {
    const forfaits = await ForfaitModel.searchForfaits(db, req.params.term);
    res.json(forfaits);
  } catch (error) {
    console.error("Erreur lors de la recherche des forfaits:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
