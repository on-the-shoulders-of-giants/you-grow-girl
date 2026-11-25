/*
  Les todo lists de toutes les plantes.

  C'est la seule source : la page d'accueil et la page de chaque plante
  affichent ces listes, donc une modification ici apparaît aux deux endroits.

  Pour modifier une tâche : change son texte.
  Pour ajouter une tâche : copie une ligne et donne-lui un nouvel id.
  Un id doit être unique ; c'est lui qui permet de se souvenir des coches.
  "fois: 2" affiche deux cases pour une tâche à faire deux fois dans la semaine.

  Les listes valent pour l'automne-hiver (octobre à mars).
*/

window.TACHES = {
  fittonia: {
    jour: [
      { id: "fit-oeil", texte: "Coup d'œil : si elle est affaissée, toucher la terre et arroser si elle est sèche" }
    ],
    semaine: [
      { id: "fit-terre", texte: "Toucher la terre et arroser dès que le dessus commence à sécher", fois: 2 }
    ]
  },

  begonia: {
    jour: [],
    jourVide: "Rien : cette plante préfère qu'on la laisse tranquille.",
    semaine: [
      { id: "beg-terre", texte: "Enfoncer une baguette dans la terre et n'arroser que si les 2 à 3 premiers cm sont secs" },
      { id: "beg-mortes", texte: "Retirer les feuilles mortes ou abîmées" },
      { id: "beg-tuteur", texte: "Vérifier que le tuteur tient les tiges" }
    ]
  },

  goeppertia: {
    jour: [],
    semaine: [
      { id: "goe-terre", texte: "Toucher la terre et arroser si le dessus est sec, avec de l'eau filtrée ou de pluie" }
    ]
  },

  pothos: {
    jour: [],
    jourVide: "Rien : c'est la plus autonome des quatre.",
    semaine: [
      { id: "pot-terre", texte: "Enfoncer une baguette dans la terre et n'arroser que si la moitié supérieure est sèche" }
    ]
  },

  boutures: {
    jour: [
      { id: "bou-niveau", texte: "Vérifier le niveau d'eau : les nœuds doivent rester immergés" }
    ],
    semaine: [
      { id: "bou-eau-begonia", texte: "Changer l'eau des boutures de bégonia", fois: 2 },
      { id: "bou-eau-pothos", texte: "Changer l'eau des boutures de pothos et rincer les verres" },
      { id: "bou-pourries", texte: "Retirer toute bouture molle ou noircie" }
    ]
  }
};
