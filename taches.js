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
      { id: "fit-terre", texte: "Toucher la terre et arroser dès que le dessus commence à sécher", fois: 2 },
      { id: "fit-billes", texte: "Remettre de l'eau dans la soucoupe de billes d'argile" },
      { id: "fit-pincer", texte: "Pincer les tiges qui s'allongent et retirer les épis de fleurs" },
      { id: "fit-feuilles", texte: "Inspecter le dessous des feuilles" },
      { id: "fit-tourner", texte: "Tourner le pot d'un quart de tour" }
    ]
  },

  begonia: {
    jour: [],
    jourVide: "Rien : cette plante préfère qu'on la laisse tranquille.",
    semaine: [
      { id: "beg-terre", texte: "Enfoncer une baguette dans la terre et n'arroser que si les 2 à 3 premiers cm sont secs" },
      { id: "beg-feuilles", texte: "Inspecter les feuilles : feutrage blanc dessus, parasites dessous" },
      { id: "beg-mortes", texte: "Retirer les feuilles mortes ou abîmées" },
      { id: "beg-tuteur", texte: "Vérifier que le tuteur tient les tiges" },
      { id: "beg-tourner", texte: "Tourner le pot d'un quart de tour" }
    ]
  },

  goeppertia: {
    jour: [
      { id: "goe-oeil", texte: "Coup d'œil aux feuilles : si elles sont enroulées en journée, toucher la terre" }
    ],
    semaine: [
      { id: "goe-terre", texte: "Toucher la terre et arroser si le dessus est sec, avec de l'eau filtrée ou de pluie" },
      { id: "goe-eau", texte: "Préparer l'eau d'arrosage pour la semaine (carafe filtrante ou eau de pluie)" },
      { id: "goe-acariens", texte: "Inspecter le dessous des feuilles (acariens)" },
      { id: "goe-humidite", texte: "Remettre de l'eau dans la soucoupe de billes ou remplir l'humidificateur" },
      { id: "goe-essuyer", texte: "Essuyer les feuilles poussiéreuses" }
    ]
  },

  pothos: {
    jour: [],
    jourVide: "Rien : c'est la plus autonome des quatre.",
    semaine: [
      { id: "pot-terre", texte: "Enfoncer une baguette dans la terre et n'arroser que si la moitié supérieure est sèche" },
      { id: "pot-cochenilles", texte: "Inspecter les feuilles et le creux des tiges (cochenilles)" },
      { id: "pot-guider", texte: "Guider les nouvelles tiges vers le tuteur ou le bord du pot" },
      { id: "pot-tourner", texte: "Tourner le pot d'un quart de tour" }
    ]
  },

  boutures: {
    jour: [
      { id: "bou-niveau", texte: "Vérifier le niveau d'eau : les nœuds doivent rester immergés" }
    ],
    semaine: [
      { id: "bou-eau-begonia", texte: "Changer l'eau des boutures de bégonia", fois: 2 },
      { id: "bou-eau-pothos", texte: "Changer l'eau des boutures de pothos et rincer les verres" },
      { id: "bou-pourries", texte: "Retirer toute bouture molle ou noircie" },
      { id: "bou-racines", texte: "Regarder les racines et noter les dates dans le suivi" },
      { id: "bou-epinglees", texte: "Tiges épinglées : humidifier la surface de la terre au niveau des nœuds" }
    ]
  }
};
