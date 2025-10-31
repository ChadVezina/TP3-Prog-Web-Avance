import express from "express";
import * as ForfaitModel from "../models/forfaitModel.js";

const router = express.Router();

/**
 * GET /api/forfaits
 * Récupère tous les forfaits de la base de données
 */
router.get("/", async (req, res) => {
  try {
    const forfaits = await ForfaitModel.getAllForfaits(req.db);
    res.json(forfaits);
  } catch (error) {
    console.error("Erreur lors de la récupération des forfaits:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/**
 * GET /api/forfaits/:id
 * Récupère un forfait spécifique par son ID
 */
router.get("/:id", async (req, res) => {
  try {
    const forfait = await ForfaitModel.getForfaitById(req.db, req.params.id);
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

/**
 * GET /api/forfaits/categorie/:categorie
 * Récupère les forfaits d'une catégorie spécifique
 */
router.get("/categorie/:categorie", async (req, res) => {
  try {
    const forfaits = await ForfaitModel.getForfaitsByCategorie(req.db, req.params.categorie);
    res.json(forfaits);
  } catch (error) {
    console.error("Erreur lors de la récupération des forfaits par catégorie:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/**
 * POST /api/forfaits
 * Crée un nouveau forfait
 */
router.post("/", async (req, res) => {
  try {
    const forfait = await ForfaitModel.createForfait(req.db, req.body);
    res.status(201).json(forfait);
  } catch (error) {
    console.error("Erreur lors de la création du forfait:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/**
 * PUT /api/forfaits/:id
 * Met à jour un forfait existant
 */
router.put("/:id", async (req, res) => {
  try {
    const forfait = await ForfaitModel.updateForfait(req.db, req.params.id, req.body);
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

/**
 * DELETE /api/forfaits/:id
 * Supprime un forfait
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await ForfaitModel.deleteForfait(req.db, req.params.id);
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

/**
 * GET /api/forfaits/search/:term
 * Recherche des forfaits par nom ou description
 */
router.get("/search/:term", async (req, res) => {
  try {
    const forfaits = await ForfaitModel.searchForfaits(req.db, req.params.term);
    res.json(forfaits);
  } catch (error) {
    console.error("Erreur lors de la recherche des forfaits:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
