### `NOTES`

L'application sert de projet pour mon examen diplomant BES Web Developer

### `Difficultés rencontrées`

Connecter la base de données d'Appwrite(https://appwrite.io/docs), étant donné que c'est la première fois que j'utilise le service d'Appwrite il a fallu que je cherche des informations comme la création d'utilisateur dans leur documentation (elle est très complète) sinon la mise en place des informations nécessaires s'est faites correctement .J'avais déjà pu utiliser Auth0(outil similaire) pour la gestion d'utilisateur mais pas de gestion de BDD distante à part une seule fois. Le système de messaging est très bien expliqué aussi sur le site de Twilio, je n'ai pas eu de difficultés à mettre tous mes éléments en place.

Il y a beaucoup de données à traiter/valider ,et on peut s'y perdre facilement mais durant mon stage professionnel j'avais fais un outil similaire avec ce genre de données d'où mon utilisation de zod "https://zod.dev/".

Me soumettre totalement à Typescript est une tâche ardue, étant donné que je suis quelqu'un d'assez frivole, dans un projet comme celui-ci Typescript m'aide à rester rigoureux mais dieu merci l'autocomplétion <3

L'administration et différents composants... 
La partie la plus compliquée était la récupération des données et utiliser le Data Table de shadcn/ui "https://ui.shadcn.com/docs/components/data-table". Utiliser des composants réutilisatble n'est pas quelque chose de facile, mais c'est ce que je fais de mieux car j'en ai créé durant mon stage professionnel,aussi en Next14 avec Typescript et donc je sais comment ça fonctionne précisemment. La bibliothèque de composants de shadcn/ui est très complète et bien documentée "https://ui.shadcn.com/" et je peux utiliser tailwind par dessus.

### `Sécurité`

La plupart de la sécurité de l'application (en tout cas pour les données) est gérées par Appwrite qui stocke ces données sur un serveur distant et protégé

### `Idée`

Utilisez-le service de Twilio pour les messages OTP pour l'accès à l'administration, pour l'instant la sélection du mot de passe se fait dans le fichier .env

Rajoutez des animations entre les pages

Mettre un accent sur la sécurité lors de la navigation. Donc faire mes pages erreurs et comme le back-end est distant je n'ai pas à protéger mes routes API 