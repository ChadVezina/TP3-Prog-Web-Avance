import http from "./http.js";

/**
 * Service de gestion des forfaits
 * Centralise tous les appels API liés aux forfaits.
 * Les méthodes renvoient `response.data` pour simplifier l'utilisation côté composant.
 */
class ForfaitsDataService {
  async getAll() {
    try {
      const res = await http.get("/forfaits");
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async get(id) {
    try {
      const res = await http.get(`/forfaits/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async create(data) {
    try {
      const res = await http.post("/forfaits", data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async update(id, data) {
    try {
      const res = await http.put(`/forfaits/${id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      const res = await http.delete(`/forfaits/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async getByCategorie(categorie) {
    try {
      const res = await http.get(`/forfaits/categorie/${categorie}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async search(term) {
    try {
      const res = await http.get(`/forfaits/search/${term}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new ForfaitsDataService();
