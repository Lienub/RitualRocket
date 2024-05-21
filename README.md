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

- Ecran de chargement custom
- Calendrier pour voir les habiudes
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
- Consulter l'habitude
- Possibilité de lancer un chronomètre pour une habitude
- Statistiques
- Exporter les données dans un fichier CSV
- Modifier profil
- Modifier le mot de passe
- Suppression du compte (RGPD)
- Mot de passe oublié
- Se connecter avec google (fonctionnel sur IOS, mais pas sur Android)

L'api est stockée sur un serveur à distance avec une base de données.

## Lancer le projet

### Prérequis

- [npm](https://www.npmjs.com/)
- [Expo](https://expo.dev/go)
- [Node.js](https://nodejs.org/en)

### Etapes

### Cloner le projet
```bash
git clone git@git.unistra.fr:walter-abid-wawrzyniak/ritualrocket.git
```

### Construire le projet
```bash
cd habitstracker/habits_tracker/
npm install
```

### Lancer le projet
```bash
npm start
# Supprimer le cache
npm start -- --reset-cache
```

Ensuite, sur Android ou IOS, installer l'application Expo :

- [Expo sur ANDROID](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US)
- [Expo sur IOS](https://apps.apple.com/fr/app/apple-store/id375380948)

Et scanner le QR Code

### Avoir le visuel du projet sur un émulateur
1. [Lancer le projet sur un émulateur Iphone](https://www.youtube.com/watch?v=DloY4tyzKDA)

2. [Lancer le projet sur un émulateur Android](https://www.youtube.com/watch?v=xKGESzemfdw)
