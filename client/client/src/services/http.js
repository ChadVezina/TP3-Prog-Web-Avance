// Importation d'Axios pour les requêtes HTTP
import axios from "axios";

// Configuration de l'instance Axios avec les paramètres de base
const http = axios.create({
  baseURL: "http://localhost:3000/api", // URL de base de l'API
  headers: {
    "Content-Type": "application/json", // Type de contenu JSON par défaut
  },
  timeout: 10000, // Délai d'expiration de 10 secondes
});

// Intercepteur de réponse pour normaliser les erreurs
// Permet de gérer les erreurs de manière centralisée
http.interceptors.response.use(
  (response) => response, // Retourne la réponse si tout va bien
  (error) => {
    // Possibilité d'étendre pour gérer l'authentification, la journalisation, les tentatives de reprise, etc.
    // Normalisation de l'erreur Axios pour que les appelants puissent s'attendre à `error.message` et `error.response?.data`
    const normalized = new Error(error.message || "Erreur réseau");
    normalized.response = error.response;
    return Promise.reject(normalized);
  }
);

// Exportation de l'instance HTTP configurée
export default http;
