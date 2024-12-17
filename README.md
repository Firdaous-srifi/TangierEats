Brief 08-Blog de restaurants à Tanger
Contexte
La ville de Tanger est connue pour sa diversité culinaire, offrant une multitude de
restaurants proposant des spécialités locales et internationales. Cependant, il peut
être difficile pour les habitants et les visiteurs de découvrir facilement les meilleurs
endroits où manger. Ce projet vise à répondre à ce besoin en créant un blog interactif
et dynamique pour explorer les restaurants de Tanger.
Scénario
Ce blog doit permettre aux utilisateurs de :
• Découvrir une liste de restaurants avec leurs informations principales.
• Filtrer ou rechercher des restaurants selon des critères comme le type de
cuisine, le nom de restaurant ou la note.
Le contenu des restaurants sera d’abord structuré dans un fichier JSON, que vous
utiliserez pour construire une API REST. Cette API alimentera ensuite le blog en
données.
Les restaurants doivent inclure des informations comme leur nom, leur adresse, leur
téléphone, leur adresse email, leur type de cuisine, une photo, une note moyenne,
le lien vers le site web (si le restaurant en dispose).
Pages à créer
1. Page index.html : Liste des restaurants
• Cette page affiche tous les restaurants disponibles dans l’API sous forme de
cartes ;
• Chaque carte apparait avec :
o Image de couverture : image du restaurant
o Nom du restaurant
o Spécialité de cuisine
o Notation
o Un lien Détails qui mène vers la page restaurant.html
• Ajouter une barre de recherche permettant à l’utilisateur d’effectuer des
recherches par nom ou par spécialité ;
• Bonus : Ajouter une fonctionnalité de tri selon la notation et un filtre par type
de cuisine ;
2. Page restaurant.html : Détails d’un restaurant
Cette page doit illustrer tous les détails d’un restaurant ;
3. Page admin.html : Page administrateur
Et pour permettre une meilleure gestion de cette API, il est essentiel de prévoir une
page pour l’administrateur lui offrant des fonctionnalités Back-office :
• Afficher la liste des restaurants avec la possibilité de suppression ;
• Ajouter un nouveau restaurant ;
• Chercher un restaurant par nom ou spécialité ;
• Bonus : Modifier un restaurant ;
Travail à rendre
• Données JSON structurées
• APIs :get /post/ delete
• Code source html, css, js
NB : Tester les APIs via un outil comme POSTMAN ;