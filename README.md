# auchan-youcode

├── index.html # Structure principale de la page

├── data/

│ └── data.json # Votre base de données locale (catalogue initial)

├── css/

│ └── style.css # Votre fichier de style (configuration Tailwind)

└── js/

├── main.js # Point d'entrée principal (initialisation et imports)

├── api.js # Logique de récupération des données (Fetch)

├── products.js # Logique métier : affichage, pagination, filtres et recherche

├── cart.js # Logique du panier : ajout, calcul des totaux, vérification des doublons

├── dragDrop.js # Gestion exclusive des événements de Glisser-Déposer

├── storage.js # Interactions avec le LocalStorage (JSON.stringify / parse)

├── ui.js # Manipulation du DOM (Vue Grille/Liste, mise à jour visuelle)

└── validation.js # Fonctions de vérification Regex pour le formulaire