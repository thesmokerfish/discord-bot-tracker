# Discord Bot - Tracker V1🔍🤖

Ce script en Node.js utilise la bibliothèque Discord.js pour afficher une liste des serveurs où se trouve le bot Discord, ainsi que les salons textuels et les membres en vocal de chaque serveur.
Le bot affiche aussi les 100 derniers messages de chaques salons textuels

## Prérequis ❗

- Node.js
- Discord.js

## Installation ⚙️

1. Clonez le dépôt GitHub :

2. Accédez au répertoire du projet :
    ```bash cd nom-du-depot```
    
3. Installez les dépendances nécessaires :
```npm install```

4. Configurez le fichier config.json avec votre token Discord :
```
{
  "token": "votre_token_discord"
}
```
## Utilisation 🧑‍💻
1. Exécutez le script : node index.js

2. Le script affichera une liste des serveurs où se trouve le bot, avec des informations telles que le nombre de membres en vocal, les membres connectés, le nombre total de membres et le niveau de boost du serveur.

3. Tapez le numéro d'un serveur pour afficher les salons textuels et les membres en vocal de ce serveur.

4. Vous pouvez également taper "q" pour quitter le script.
