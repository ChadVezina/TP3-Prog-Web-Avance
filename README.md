# TP3 — SPA pour une agence de voyages

Ce dépôt contient le travail du mandat : développement d'une application monopage (SPA) pour une agence de voyages spécialisée dans la vente de forfaits touristiques. L'application permet d'ajouter, modifier, supprimer et lister des forfaits en utilisant une base de données MySQL et une API Node.js/Express qui communique avec un front-end Vue.js.

## Table des matières

- Contexte et objectifs
- Fonctionnalités
- Modèle de données
- Contrat API (endpoints)
- Front-end (routes & composants)
- Contraintes techniques
- Installation & lancement (dev)
- Configuration de la base de données MySQL
- Exemples de requêtes
- Normes de développement & checklist
- Tests et validations
- Déploiement (notes)

## Contexte et objectifs

Objectif : livrer une SPA (Vue.js) capable de gérer les forfaits touristiques d'une agence. Toutes les opérations CRUD doivent se faire sans rechargement de page via des requêtes HTTP (fetch / axios) entre Vue.js et une API RESTful Express. L'interface doit être responsive et stylisée avec Tailwind CSS (aucun thème ou composant préconstruit).

## Fonctionnalités exigées

1. Formulaire pour ajouter un nouveau forfait
2. Affichage de la liste des forfaits
3. Bouton pour modifier un forfait existant
4. Bouton pour supprimer un forfait
5. Navigation entre au moins 3 pages via Vue Router : Accueil, Forfaits, À propos
6. Toutes les opérations doivent être asynchrones (SPA)

## Modèle de données

Table principale : `forfaits`

- id : INT AUTO_INCREMENT PRIMARY KEY
- nom : VARCHAR(255) NOT NULL
- description : TEXT
- prix : DECIMAL(10,2) NOT NULL
- image_url : VARCHAR(1024) — chemin ou URL vers l'image
- categorie : VARCHAR(100) NOT NULL (ex. Plage, Aventure, Culture)
- created_at : TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at : TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

Exemple SQL de création :

```sql
CREATE TABLE forfaits (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nom VARCHAR(255) NOT NULL,
 description TEXT,
 prix DECIMAL(10,2) NOT NULL,
 image_url VARCHAR(1024),
 categorie VARCHAR(100) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Contrat API (RESTful) — serveur Express

Base URL proposée : `http://localhost:3000/api`

Endpoints principaux :

- GET /forfaits — récupérer la liste complète
- GET /forfaits/:id — récupérer un forfait par id
- POST /forfaits — créer un nouveau forfait
- PUT /forfaits/:id — modifier un forfait
- DELETE /forfaits/:id — supprimer un forfait

Format JSON attendu (POST/PUT body) :

```json
{
 "nom": "Séjour à Rome",
 "description": "Visite des musées, hébergement 4 nuits...",
 "prix": 1299.99,
 "image_url": "https://.../rome.jpg",
 "categorie": "Culture"
}
```

Réponses :

- GET /forfaits -> 200 OK, body: [{forfait}, ...]
- POST /forfaits -> 201 Created, body: {forfait_créé}
- PUT /forfaits/:id -> 200 OK, body: {forfait_mis_à_jour}
- DELETE /forfaits/:id -> 204 No Content

Erreurs : renvoyer des codes HTTP appropriés (400 pour input invalide, 404 si non trouvé, 500 pour erreurs serveur) et un JSON explicite { error: "message" }.

## Front-end (Vue.js)

Structure propositionnelle :

- `client/`
- `src/main.js` — point d'entrée
- `src/router/index.js` — routes : /, /forfaits, /a-propos
- `src/views/Accueil.vue`
- `src/views/Forfaits.vue` — page listant les forfaits et contenant le formulaire
- `src/views/APropos.vue`
- `src/components/ForfaitCard.vue` — carte de présentation
- `src/components/ForfaitForm.vue` — formulaire création/édition

Contraintes front-end :

- Utiliser Vue Router pour la navigation (3 pages minimum)
- Toutes les opérations CRUD se font via fetch/axios vers l'API (pas de reload)
- Stylisation uniquement via Tailwind CSS (aucun composant tiers)
- Responsive (mobile-first)

Exemples de routes Vue Router :

```js
const routes = [
 { path: '/', name: 'Accueil', component: Accueil },
 { path: '/forfaits', name: 'Forfaits', component: Forfaits },
 { path: '/a-propos', name: 'APropos', component: APropos }
];
```

```js
// récupérer tous
axios.get('/api/forfaits')

// créer
axios.post('/api/forfaits', newForfait)

// modifier
axios.put(`/api/forfaits/${id}`, updated)

// supprimer
axios.delete(`/api/forfaits/${id}`)
```

## Contraintes techniques (rappel)

- Front-end créé avec Vue CLI
- Back-end : Node.js + Express
- Base de données : MySQL
- CSS : Tailwind CSS (aucun thème/composant préconstruit)
- Respect des normes : code clair, commenté, responsive

## Installation & lancement (développement)

Prérequis :

- Node.js (16+ recommandé)
- npm ou yarn
- MySQL

Étapes générales (depuis la racine du dépôt) :

1. Installer les dépendances serveur

```bash
cd server
npm install
```

2. Installer les dépendances client

```bash
cd ../client
npm install
```

3. Configurer la base de données MySQL et variables d'environnement (voir plus bas)

4. Lancer le serveur et le client (en deux terminaux) :

```bash
# terminal 1 — serveur
cd server
npm run dev    # par ex. nodemon index.js

# terminal 2 — client
cd client
npm run serve  # ou npm run dev selon la configuration
```

Notes : adapter les scripts npm selon vos fichiers (ex. `npm run dev` pour nodemon). Le client doit être configuré pour proxier `/api` vers `http://localhost:3000` (ou utiliser l'URL complète pour axios).

## Configuration MySQL et variables d'environnement

```env
# .env.example
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=changeme
DB_NAME=agence_voyages
PORT=3000
```

Connexion MySQL (exemple Node.js avec mysql2/promise) :

```js
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
 waitForConnections: true,
 connectionLimit: 10,
});
```

## Exemple de contrôleur Express minimal

```js
// GET /api/forfaits
app.get('/api/forfaits', async (req, res) => {
 const [rows] = await pool.query('SELECT * FROM forfaits ORDER BY created_at DESC');
 res.json(rows);
});
```

## Exemples de requêtes (curl)

Récupérer tous les forfaits :

```bash
curl -s http://localhost:3000/api/forfaits | jq
```

Créer un forfait :

```bash
curl -X POST http://localhost:3000/api/forfaits \
 -H "Content-Type: application/json" \
 -d '{"nom":"Séjour à Rome","description":"...","prix":1299.99,"image_url":"https://...","categorie":"Culture"}'
```

## Normes de développement & bonnes pratiques

- Ecrire du code lisible et commenté pour chaque module / composant.
- Respecter une structure claire : `routes/`, `controllers/`, `models/` (server) ; `views/`, `components/`, `services/` (client).
- Valider toutes les entrées (back-end) et afficher des messages d'erreur utiles (front-end).
- Gérer les états de chargement et erreurs côté UI (spinners, messages d'erreur non intrusifs).
- Rendre l'UI responsive (mobile-first) et accessible : couleurs contrastées, attributs alt pour images, focus visibles.

## Checklist de validation (critères d'acceptation)

- [ ] Créer un forfait via le formulaire (champ requerris validés)
- [ ] Lister les forfaits dans la page Forfaits (affichage image, nom, prix, catégorie)
- [ ] Modifier un forfait existant (formulaire pré-rempli) et voir la mise à jour sans reload
- [ ] Supprimer un forfait et voir la liste mise à jour sans reload
- [ ] Navigation fonctionnelle : Accueil, Forfaits, À propos
- [ ] App responsive et accessible (tests basiques)
- [ ] API REST répond correctement et valide les entrées

## Récapitulatif / Contrat minimal

- Entrées : formulaire avec {nom, description, prix, image_url, categorie}
- Sorties : JSON standardisé, codes HTTP appropriés
- Erreurs : JSON { error: "message" } + code HTTP
