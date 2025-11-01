
# TP3 — SPA pour une agence de voyages (adapté au projet)

Ce dépôt contient une application composée d'un back-end Node/Express (dossier `server/`) et d'un front-end Vue 3 + Vite (dossier `client/client/`). L'application permet de gérer des forfaits touristiques (CRUD) via une API REST et une interface SPA.

## Aperçu rapide

- Back-end : `server/` — Express, MySQL (`mysql2`), variables d'environnement via `dotenv`.
- Front-end : `client/client/` — Vue 3, Vue Router, Vite, Tailwind CSS.

## Arborescence essentielle

- `server/`
  - `server.js` — point d'entrée du serveur
  - `routes/forfaits.js` — routes API pour les forfaits
  - `models/forfaitModel.js` — accès base de données (CRUD)
- `client/client/`
  - `index.html`, `src/` (composants, pages, `main.js`, `router`)

> Remarque : le client est situé dans `client/client/` (double dossier `client`) — utilisez ce chemin pour les commandes liées au front-end.

## Contrat API (routes importantes)

Base URL (par défaut) : `http://localhost:3000/api/forfaits`

Endpoints fournis :

- GET /api/forfaits — lister tous les forfaits
- GET /api/forfaits/:id — récupérer un forfait
- GET /api/forfaits/categorie/:categorie — lister par catégorie
- GET /api/forfaits/search/:term — recherche par nom/description
- POST /api/forfaits — créer un forfait
- PUT /api/forfaits/:id — mettre à jour un forfait
- DELETE /api/forfaits/:id — supprimer un forfait

Les réponses d'erreur utilisent un JSON du type { "error": "message" } et les codes HTTP standards (400, 404, 500...).

Note importante sur les champs : le modèle serveur utilise la colonne `image` (et non `image_url`). Dans la documentation et les requêtes, utilisez le champ `image` pour correspondre au code.

Exemple d'objet envoyé en POST/PUT (JSON) :

```json
{
 "nom": "Séjour à Rome",
 "description": "Visite des musées, hébergement 4 nuits...",
 "prix": 1299.99,
 "image": "https://.../rome.jpg",
 "categorie": "Culture"
}
```

## Modèle de données (table `forfaits`)

Colonnes utilisées par le code :

- id : INT AUTO_INCREMENT PRIMARY KEY
- nom : VARCHAR(255)
- description : TEXT
- prix : DECIMAL(10,2)
- image : VARCHAR(1024)
- categorie : VARCHAR(100)
- created_at : TIMESTAMP (optionnel selon setup)
- updated_at : TIMESTAMP (optionnel selon setup)

Exemple SQL minimal pour créer la table :

```sql
CREATE TABLE forfaits (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nom VARCHAR(255) NOT NULL,
 description TEXT,
 prix DECIMAL(10,2) NOT NULL,
 image VARCHAR(1024),
 categorie VARCHAR(100) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Installation et démarrage (développement)

Prérequis : Node.js (16+ recommandé), npm, MySQL.

Ouvrez deux terminaux (ou onglets) pour lancer serveur et client séparément.

1) Installer les dépendances du serveur

```bash
cd server
npm install
```

2) Installer les dépendances du client

```bash
cd client/client
npm install
```

3) Configurer les variables d'environnement

Créez un fichier `.env` dans `server/` (ou adaptez votre méthode) :

```env
# server/.env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=changeme
DB_NAME=nom_de_votre_base
PORT=3000
```

4) Lancer le serveur

```bash
cd server
npm start
```

Le serveur démarre avec `node server.js` (script `start` dans `server/package.json`). Le port par défaut est `3000` si `PORT` n'est pas défini.

5) Lancer le client (Vite)

```bash
cd client/client
npm run dev
```

Vite démarre généralement sur `http://localhost:5173` (ou un autre port libre). Le front-end effectue des requêtes vers l'API complète (ex. `http://localhost:3000/api/forfaits`). Si vous préférez, configurez un proxy Vite vers le serveur API.

## Vérifications rapides (cohérence avec le code)

- Le serveur attache la connexion MySQL à `req.db` (voir `server.js`) et les modèles utilisent cette connexion.
- Le modèle `forfaitModel.js` attend le champ `image` pour l'URL de l'image.

Si vous avez des données existantes ou un script SQL à fournir, créez le fichier `sql/createdb.sql` à la racine et y coller le SQL de création ci-dessus.

## Exemples de requêtes (curl)

Récupérer tous les forfaits :

```bash
curl -s http://localhost:3000/api/forfaits
```

Créer un forfait :

```bash
curl -X POST http://localhost:3000/api/forfaits \
 -H "Content-Type: application/json" \
 -d '{"nom":"Séjour à Rome","description":"...","prix":1299.99,"image":"https://...","categorie":"Culture"}'
```
