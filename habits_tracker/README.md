# Ritual Rocket

## Contributeurs

- ABID Julien
- WAWRZYNIAK Maxime
- WALTER Damien

## Description

On voit ces derniers temps une émergence de nombreuses applications de suivi d'habitudes sur le marché. Malheureusement, les solutions proposées sont souvent soit trop complexes et encombrées, soit trop basiques et limitées par des modèles de tarification agressive (après tout c’est normal, les gens sont prêts à payer alors pourquoi s’en priver). 

L'objectif de ce projet de groupe est de développer une application nommée “Habits Tracker” qui trouve le juste équilibre entre richesse fonctionnelle et simplicité d'utilisation (ne faites pas d’usine à gaz s’il vous plaît !).
L'application doit permettre aux utilisateurs de suivre efficacement leurs habitudes quotidiennes et d'analyser leurs progrès dans le but d’améliorer leur performance au travail et leur bien-être général.



## Fonctionnalités

- Création des habitudes
  - Choisir nom
  - Choisir une description
  - Choisir une icon + une couleur
  - Choisir une heure de rappel
  - Chasir une date de début et de fin
  - Choisir si l'habitude est répété une fois ou plusieurs fois (en choisissant les jours de la semaine)
- Supprimer les habitudes
- Mettre à jour une habitude
- Mettre l'habitude comme fait
- Statistiques
- Exporter les données dans un fichier CSV
- Modifier profil
- Modifier le mot de passe
- Mot de passe oublié
- Se connecter avec google (pas vraiment fonctionnel)

L'api est stockée sur un serveur à distance avec une base de données.

## Lancer le projet

### Prérequis

- npm
- Expo
- Node.js

### Etapes

#### Cloner le projet
```bash
git clone git@git.unistra.fr:walter-abid-wawrzyniak/ritualrocket.git
```

#### Construire le projet
```bash
cd ritualrocket/
npm install
```

#### Lancer le projet
```bash
npm start
```
