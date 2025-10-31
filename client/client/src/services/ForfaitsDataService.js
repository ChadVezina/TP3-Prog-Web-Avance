import http from "./http.js";

/**
 * Service de gestion des forfaits
 * Centralise tous les appels API liés aux forfaits
 */
class ForfaitsDataService {
  /**
   * Récupère tous les forfaits
   * @returns {Promise} Liste de tous les forfaits
   */
  getAll() {
    return http.get("/forfaits");
  }

  /**
   * Récupère un forfait spécifique par son ID
   * @param {number} id - L'ID du forfait
   * @returns {Promise} Le forfait correspondant
   */
  get(id) {
    return http.get(`/forfaits/${id}`);
  }

  /**
   * Crée un nouveau forfait
   * @param {Object} data - Les données du forfait à créer
   * @returns {Promise} Le forfait créé
   */
  create(data) {
    return http.post("/forfaits", data);
  }

  /**
   * Met à jour un forfait existant
   * @param {number} id - L'ID du forfait à mettre à jour
   * @param {Object} data - Les nouvelles données du forfait
   * @returns {Promise} Le forfait mis à jour
   */
  update(id, data) {
    return http.put(`/forfaits/${id}`, data);
  }

  /**
   * Supprime un forfait
   * @param {number} id - L'ID du forfait à supprimer
   * @returns {Promise} Résultat de la suppression
   */
  delete(id) {
    return http.delete(`/forfaits/${id}`);
  }

  /**
   * Récupère les forfaits d'une catégorie spécifique
   * @param {string} categorie - La catégorie des forfaits
   * @returns {Promise} Liste des forfaits de la catégorie
   */
  getByCategorie(categorie) {
    return http.get(`/forfaits/categorie/${categorie}`);
  }

  /**
   * Recherche des forfaits par terme
   * @param {string} term - Le terme de recherche
   * @returns {Promise} Liste des forfaits correspondants
   */
  search(term) {
    return http.get(`/forfaits/search/${term}`);
  }
}

export default new ForfaitsDataService();
