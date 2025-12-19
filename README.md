# Vue 3 + Vite


# Cyberspector

## Description
Cyberspector est une application web développée avec **Vue 3** et **Vite** pour gérer et visualiser la progression d’un utilisateur dans des modules de formation.  
Le projet inclut un système de **connexion simulée**, un tableau de bord de certification et des **détails des modules** avec des barres de progression dynamiques.

---

## Fonctionnalités principales
- Connexion utilisateur avec validation front-end (email et mot de passe).  
- Affichage du certificat et résumé de la certification.  
- Progression détaillée des modules avec barres de progression.  
- Gestion de l’état de chargement lors de la connexion (`loader`) et message d’erreur si authentification échoue.  
- Option **personnalisée** pour montrer ou cacher le mot de passe.  

---

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/AmirathAB/CyberSpector.git

Installer les dépendances :

2. Installer les dépendances
cd cyberspector
npm install


3. Lancer le projet en local :

npm run dev


Le projet sera accessible sur http://localhost:5173 (ou un port similaire affiché dans le terminal).


Structure du projet 
cyberspector/
│
├─ src/
│   ├─ components/        # Composants réutilisables
│   ├─ views/
│   │   ├─ LoginForm.vue
│   │   └─ CertificatePage.vue
│   ├─ assets/            # Images et ressources statiques
│   └─ main.js
│
├─ public/                # Fichiers statiques accessibles directement
├─ package.json
└─ vite.config.js

Choix techniques et explications

                                  |                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Vue.js 3 + Vite**                    | Développement rapide, rechargement instantané et structure modulaire avec composants réutilisables.                      |
| **Axios / Fetch**                      | Pour consommer l’API de test (dummyjson.com) afin de récupérer les modules et simuler une connexion.                     |
| **Gestion des états simples (`data`)** | Pour suivre le loading, les erreurs et la progression sans installer Vuex ou Pinia, car le projet est de taille moyenne. |
| **Flexbox / CSS Grid**                 | Permet de créer des cartes alignées, des barres de progression uniformes et un layout responsive.                        |
| **FontAwesome**                        | Icônes interactives (œil pour mot de passe, chevrons, téléchargement) facilement intégrables.                            |
| **CSS scoped**                         | Garantit l’isolation des styles pour éviter de polluer l’UI globale.                                                     |


Fonctionnalités principales

Connexion sécurisée

Validation front (email et mot de passe).

Toggle affichage du mot de passe.

Loading spinner lors de la requête.

Redirection vers CertificatePage.vue même en cas d’erreur API.

Résumé de certification

Affiche Progression, Cyberscore, et Score moyen des quiz dans des cartes avec bordures arrondies et ombres.

Progression représentée par une barre dynamique.

Valeurs affichées en haut / gauche / droite selon le design.

Détails de progression

Accordion déroulant avec un clic.

Affiche les modules avec image, titre, description, durée et barre de progression.

Texte % à gauche et modules complétés / total à droite sur la même ligne.

UI/UX

Layout responsive via Flexbox et Grid.

Cartes modulables et uniformes.

Icônes alignées correctement pour correspondre au design.

Gestion des erreurs et états

loading : affiche un message ou spinner pendant la récupération de l’API.

error : capture et affiche les erreurs d’API.

Redirection vers CertificatePage.vue même si l’API échoue, pour tester l’UI indépendamment.

try/catch pour les requêtes fetch ou Axios afin de gérer les exceptions.

Limites connues

Pas de vrai backend : l’API utilisée est factice (dummyjson.com).

Authentification simplifiée : pas de token JWT ni stockage sécurisé côté client.

Responsive mobile : certains écrans très petits peuvent avoir des ajustements CSS nécessaires.

Gestion des erreurs serveur : les erreurs sont capturées mais pas affichées avec précision.

Sécurité : pas de protection CSRF ou sécurisation avancée côté front-end.

Ajouts personnels
- Toggle pour cacher ou afficher le mot de passe sur le login (œil) pour améliorer l’expérience utilisateur.
- Loader de connexion animé (loader-oscillations) pendant la requête pour indiquer le chargement et rendre l’UI plus fluide.


Version déployée

Le projet est déployé en ligne pour tester toutes les fonctionnalités sans serveur local.

Plateforme de déploiement : Netlify


URL de la version en ligne : [à insérer après déploiement]







Points clés :

Build automatique depuis le dépôt GitHub.

Variables d’environnement configurables si nécessaire.

Limites sur la version déployée :

Les appels API sont simulés (dummyjson).

Pas de persistance réelle des données.

Authentification fictive pour tester l’UI uniquement.