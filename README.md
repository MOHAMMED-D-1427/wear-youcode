# wear-youcode

A simple market website of clothes.

🔗 **Live demo:** [https://mohammed-d-1427.github.io/wear-youcode/]

## About

This is a simple market clothes website which has user/client page for products where 
the client can do actions, and admin page that show all products and admin operations(Add/Delete/Modify).
This website is assignment of a sprint from YouCode school, and I have built it in 10-13 days.

## Features

- Product filtering
- Product sorting
- Product searching
- Shopping cart
- Admin page
- Contact action
- API
- Save data in LocalStorage
- Responsive design

## Tech Stack

- HTML5
- Tailwind CSS
- JavaScript (vanilla)
- GitHub Pages + GitHub Actions (deployment)
- GitHub Projects for planning

## Project Structure

├──.github/
│ └──workflows/
│     └── deploy.yml
├── index.html # Structure principale de la page
├── admin.html 

├── data/

│ └── data.json # Base de données locale (catalogue initial)

├── css/

│ └── style.css # Fichier de style (configuration Tailwind)
│ └── output.css # configuration Tailwind

├── node_modules/

├── .gitignore

├── main.js # Point d'entrée principal (initialisation et imports)

├── api.js # Logique de récupération des données (Fetch)

├── products.js # Logique métier : affichage, pagination, filtres et recherche

├── cart.js # Logique du panier : ajout, calcul des totaux, vérification des doublons

├── dragDrop.js # Gestion exclusive des événements de Glisser-Déposer

├── storage.js # Interactions avec le LocalStorage (JSON.stringify / parse)

├── ui.js # Manipulation du DOM (Vue Grille/Liste, mise à jour visuelle)

└── validation.js # Fonctions de vérification Regex pour le formulaire
└── README.md 
└── package.json
└── package-lock.json

## Git Workflow

- `main`: stable version
- `develop`: integration branch
- `features/*`: one branch per feature
- Commits follow: `feat:`, `fix:`, `style:`, `docs:`

### Installation

```bash
# Clone the repository
git clone https://github.com/MOHAMMED-D-1427/REPO-NAME.git

# Go to the project folder
cd REPO-NAME

# Install dependencies
npm install

# Build the CSS
npm run build
```

## Author

**Mohammed Darkaoui**
GitHub: [@MOHAMMED-D-1427](https://github.com/MOHAMMED-D-1427)

