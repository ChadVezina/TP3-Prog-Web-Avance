/**
 * Modèle pour les forfaits
 * Gère les opérations CRUD pour la table forfaits
 */

/**
 * Récupère tous les forfaits
 * @param {Object} db - Connexion à la base de données MySQL
 * @returns {Promise} Promise qui résout avec un tableau de forfaits
 */
export const getAllForfaits = (db) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM forfaits ORDER BY created_at DESC";

    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

/**
 * Récupère un forfait par son ID
 * @param {Object} db - Connexion à la base de données MySQL
 * @param {number} id - L'ID du forfait
 * @returns {Promise} Promise qui résout avec le forfait trouvé
 */
export const getForfaitById = (db, id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM forfaits WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        reject(new Error("Forfait non trouvé"));
      } else {
        resolve(results[0]);
      }
    });
  });
};

/**
 * Récupère les forfaits par catégorie
 * @param {Object} db - Connexion à la base de données MySQL
 * @param {string} categorie - La catégorie des forfaits
 * @returns {Promise} Promise qui résout avec un tableau de forfaits
 */
export const getForfaitsByCategorie = (db, categorie) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM forfaits WHERE categorie = ? ORDER BY created_at DESC";

    db.query(query, [categorie], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

/**
 * Crée un nouveau forfait
 * @param {Object} db - Connexion à la base de données MySQL
 * @param {Object} forfaitData - Les données du forfait
 * @param {string} forfaitData.nom - Le nom du forfait
 * @param {string} forfaitData.description - La description du forfait
 * @param {number} forfaitData.prix - Le prix du forfait
 * @param {string} forfaitData.image - L'URL de l'image du forfait
 * @param {string} forfaitData.categorie - La catégorie du forfait
 * @returns {Promise} Promise qui résout avec l'ID du forfait créé
 */
export const createForfait = (db, forfaitData) => {
  return new Promise((resolve, reject) => {
    const { nom, description, prix, image, categorie } = forfaitData;
    const query = "INSERT INTO forfaits (nom, description, prix, image, categorie) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [nom, description, prix, image, categorie], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id: results.insertId, ...forfaitData });
      }
    });
  });
};

/**
 * Met à jour un forfait existant
 * @param {Object} db - Connexion à la base de données MySQL
 * @param {number} id - L'ID du forfait à mettre à jour
 * @param {Object} forfaitData - Les nouvelles données du forfait
 * @returns {Promise} Promise qui résout avec le résultat de la mise à jour
 */
export const updateForfait = (db, id, forfaitData) => {
  return new Promise((resolve, reject) => {
    const { nom, description, prix, image, categorie } = forfaitData;
    const query = "UPDATE forfaits SET nom = ?, description = ?, prix = ?, image = ?, categorie = ? WHERE id = ?";

    db.query(query, [nom, description, prix, image, categorie, id], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.affectedRows === 0) {
        reject(new Error("Forfait non trouvé"));
      } else {
        resolve({ id, ...forfaitData });
      }
    });
  });
};

/**
 * Supprime un forfait
 * @param {Object} db - Connexion à la base de données MySQL
 * @param {number} id - L'ID du forfait à supprimer
 * @returns {Promise} Promise qui résout avec le résultat de la suppression
 */
export const deleteForfait = (db, id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM forfaits WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.affectedRows === 0) {
        reject(new Error("Forfait non trouvé"));
      } else {
        resolve({ message: "Forfait supprimé avec succès", id });
      }
    });
  });
};

/**
 * Recherche des forfaits par nom ou description
 * @param {Object} db - Connexion à la base de données MySQL
 * @param {string} searchTerm - Le terme de recherche
 * @returns {Promise} Promise qui résout avec un tableau de forfaits
 */
export const searchForfaits = (db, searchTerm) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM forfaits WHERE nom LIKE ? OR description LIKE ? ORDER BY created_at DESC";
    const searchPattern = `%${searchTerm}%`;

    db.query(query, [searchPattern, searchPattern], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
