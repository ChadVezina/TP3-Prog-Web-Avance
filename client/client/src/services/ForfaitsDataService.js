// Importation du client HTTP configuré
import http from "./http.js";

/**
 * Service de gestion des forfaits
 * Centralise tous les appels API liés aux forfaits.
 * Les méthodes renvoient `response.data` pour simplifier l'utilisation côté composant.
 */
class ForfaitsDataService {
  /**
   * Récupère tous les forfaits depuis l'API
   * @returns {Promise} Les données des forfaits
   */
  async getAll() {
    try {
      const res = await http.get("/forfaits");
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Récupère un forfait spécifique par son ID
   * @param {number} id - L'identifiant du forfait
   * @returns {Promise} Les données du forfait
   */
  async get(id) {
    try {
      const res = await http.get(`/forfaits/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Crée un nouveau forfait
   * @param {Object} data - Les données du forfait à créer
   * @returns {Promise} Le forfait créé
   */
  async create(data) {
    try {
      const res = await http.post("/forfaits", data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Met à jour un forfait existant
   * @param {number} id - L'identifiant du forfait à mettre à jour
   * @param {Object} data - Les nouvelles données du forfait
   * @returns {Promise} Le forfait mis à jour
   */
  async update(id, data) {
    try {
      const res = await http.put(`/forfaits/${id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Supprime un forfait
   * @param {number} id - L'identifiant du forfait à supprimer
   * @returns {Promise} La confirmation de suppression
   */
  async delete(id) {
    try {
      const res = await http.delete(`/forfaits/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Récupère les forfaits d'une catégorie spécifique
   * @param {string} categorie - La catégorie des forfaits recherchés
   * @returns {Promise} Les forfaits de la catégorie
   */
  async getByCategorie(categorie) {
    try {
      const res = await http.get(`/forfaits/categorie/${categorie}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Recherche des forfaits par terme
   * @param {string} term - Le terme de recherche
   * @returns {Promise} Les forfaits correspondant à la recherche
   */
  async search(term) {
    try {
      const res = await http.get(`/forfaits/search/${term}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

// Exportation d'une instance unique du service (singleton)
export default new ForfaitsDataService();
