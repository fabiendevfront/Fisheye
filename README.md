# Fisheye - Projet P6 - Créez un site accessible pour une plateforme de photographes

Projet réalisé dans le cadre du parcours de développeur d'application Javascript React d'OpenClassrooms.

## Languages & outils

* HTML
* [SASS](https://sass-lang.com/) - Préprocesseur CSS
* JavaScript
* [Webpack](https://webpack.js.org/) - Module bundler
* [ESLint](https://eslint.org/) - Outil d'analyse de code
* [Babel](https://babeljs.io/) - Transcompilateur JavaScript
* GIT - Gestion de versions
* [GitHub](https://github.com/) - Hébergement en ligne des dépôts GIT
* Node.js & NPM - Pour l'installation de SASS, Webpack, ESLint, Babel
* [Visual Studio Code](https://code.visualstudio.com/) - Editeur de textes
* [Figma](https://www.figma.com/) - Outil d'UI design
* [Notion](https://www.notion.so/) - Suivi de projet

## Ressources

* [La maquette Figma](https://www.figma.com/file/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR?node-id=0%3A1)
* [Les photos et vidéos à intégrer au projet](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEye_Photos.zip)
* [Les données au format JSON](https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye/blob/main/data/photographers.json)
* [Dépôt GitHub contenant la base initiale du code](https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye)

## Identité

FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux.

## Consignes

* Utilisez des éléments HTML "sémantiques" qui décrivent leur intention autant que possible, au lieu de mettre des éléments <div> et <span> partout.
* Lorsque vous devez créer un élément personnalisé, ajoutez des attributs ARIA pour décrire ce qu'il fait.
* Les images doivent présenter un attribut “alt”. Utilisez le titre des photos pour remplir cet attribut, et le nom du photographe dans le cas d’une photo de profil de photographe.
* Le code devrait passer les tests AChecker sans “known issue” (afin qu'il soit conforme aux WCAG).
* Toute la gestion des événements (par exemple, les clics et les pressions au clavier) doit être configurée (utilisez KeyboardEvent.key ou
KeyboardEvent.code.).
* Utilisez un lecteur d'écran gratuit pour vous faire une idée de ce que représente l'utilisation du site pour une personne malvoyante.

## Contraintes techniques additionnelles

* Le code est séparé en différents fichiers (HTML, CSS, JavaScript).
* ESLint est utilisé (avec les paramètres par défaut) pour garantir que le code est robuste. Ceci est particulièrement facile à intégrer avec l'IDE
VSCode.
* Une version moderne (ES6 ou supérieure) de JavaScript est utilisée et les fonctionnalités obsolètes ne sont pas utilisées.

## Livrables
Un dépôt de code sur GitHub qui contient le code du projet.

## Installation du projet

Clone the repository : git@github.com:fabiendevfront/Fisheye.git

git clone git@github.com:fabiendevfront/Fisheye.git

#### Développement :

```bash
npm install
npm run dev
```
#### Lancement du site :

Ouvrir index.html avec Live Server