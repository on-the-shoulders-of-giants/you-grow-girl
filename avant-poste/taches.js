/*
  Les todo lists des plantes de l'Avant-Poste.

  C'est la seule source : la page d'accueil de l'Avant-Poste et la page de chaque plante
  affichent ces listes, donc une modification ici apparaît aux deux endroits.

  Pour modifier une tâche : change son texte.
  Pour ajouter une tâche : copie une ligne et donne-lui un nouvel id.
  Un id doit être unique sur tout le site (y compris dans le taches.js de tes plantes) ;
  c'est lui qui permet de se souvenir des coches.
  "fois: 2" affiche deux cases pour une tâche à faire deux fois dans la semaine.

  Les listes valent pour l'automne-hiver (octobre à mars).
*/

window.TACHES = {
  "tradescantia-fluminensis": {
    jour: [],
    jourVide: "Rien de quotidien.",
    semaine: [
      { id: "tfl-terre", texte: "Toucher la terre : si les 2 premiers centimètres sont secs, arroser, puis vider la soucoupe", fois: 2 }
    ]
  },

  "tradescantia-pallida": {
    jour: [],
    jourVide: "Rien : elle supporte mieux un oubli qu'un excès d'eau.",
    semaine: [
      { id: "tpa-terre", texte: "Toucher la terre : si elle a visiblement séché, arroser abondamment jusqu'à ce que l'eau s'écoule par le fond" }
    ]
  },

  beaucarnea: {
    jour: [],
    jourVide: "Rien : elle préfère qu'on l'oublie.",
    semaine: [
      { id: "bea-terre", texte: "Enfoncer une baguette dans la terre et n'arroser que si elle ressort complètement sèche (environ une fois par mois en hiver)" },
      { id: "bea-base", texte: "Tâter la base renflée : si elle ramollit, arrêter d'arroser" },
      { id: "bea-lumiere", texte: "Vérifier qu'elle est près de la fenêtre la plus lumineuse" }
    ]
  },

  dracaena: {
    jour: [],
    jourVide: "Rien : c'est la plus facile des six.",
    semaine: [
      { id: "dra-terre", texte: "Enfoncer une baguette dans la terre et n'arroser que si elle ressort complètement sèche (pas plus d'une fois par mois en hiver)" },
      { id: "dra-feuilles", texte: "Vérifier que les feuilles sont fermes, surtout à la base (molles : trop d'eau)" }
    ]
  },

  anthurium: {
    jour: [],
    jourVide: "Rien de quotidien.",
    semaine: [
      { id: "ant-terre", texte: "Toucher la terre : si le dessus a un peu séché, arroser avec de l'eau non calcaire", fois: 2 },
      { id: "ant-radiateur", texte: "Vérifier qu'elle est loin des radiateurs et des courants d'air froids" },
      { id: "ant-fleurs", texte: "Retirer les fleurs fanées" }
    ]
  },

  yucca: {
    jour: [],
    jourVide: "Rien.",
    semaine: [
      { id: "yuc-terre", texte: "Enfoncer une baguette dans la terre et n'arroser que si les 5 premiers centimètres sont secs ; vérifier que l'eau s'écoule par le fond" },
      { id: "yuc-feuilles", texte: "Retirer les feuilles basses sèches, avec des gants (feuilles pointues)" }
    ]
  }
};
