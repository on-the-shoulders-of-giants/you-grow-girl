/*
  Ce fichier fait fonctionner les todo lists et le suivi des boutures.
  Tu n'as normalement pas besoin d'y toucher : les tâches se modifient dans taches.js.

  Les coches sont enregistrées dans le navigateur (localStorage).
  Elles sont donc partagées entre toutes les pages du site,
  mais propres à chaque appareil et à chaque navigateur.

  Une tâche "jour" se décoche toute seule le lendemain,
  une tâche "semaine" se décoche toute seule le lundi suivant.
*/
(function () {
  "use strict";

  var CLE_TACHES = "mes-plantes:taches:v1";
  var CLE_SUIVI = "mes-plantes:suivi:v1";
  var stockageOk = true;

  /* ---------- Stockage ---------- */

  function lire(cle) {
    try {
      var brut = window.localStorage.getItem(cle);
      return brut ? JSON.parse(brut) : {};
    } catch (e) {
      stockageOk = false;
      return {};
    }
  }

  function ecrire(cle, valeur) {
    try {
      window.localStorage.setItem(cle, JSON.stringify(valeur));
      return true;
    } catch (e) {
      stockageOk = false;
      return false;
    }
  }

  /* ---------- Dates ---------- */

  function deuxChiffres(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function cleJour(d) {
    return d.getFullYear() + "-" + deuxChiffres(d.getMonth() + 1) + "-" + deuxChiffres(d.getDate());
  }

  function lundiDe(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  }

  function periode(d, frequence) {
    return frequence === "jour" ? cleJour(d) : cleJour(lundiDe(d));
  }

  function estFaite(etat, id, frequence, maintenant) {
    var quand = etat[id];
    if (!quand) return false;
    var d = new Date(quand);
    if (isNaN(d.getTime())) return false;
    return periode(d, frequence) === periode(maintenant, frequence);
  }

  /* Oublie les coches de plus de deux semaines pour ne pas encombrer le navigateur. */
  function nettoyer(etat, maintenant) {
    var limite = maintenant.getTime() - 15 * 24 * 3600 * 1000;
    var change = false;
    Object.keys(etat).forEach(function (id) {
      var t = new Date(etat[id]).getTime();
      if (isNaN(t) || t < limite) {
        delete etat[id];
        change = true;
      }
    });
    return change;
  }

  /* ---------- Tâches ---------- */

  function casesDe(tache) {
    var n = tache.fois && tache.fois > 1 ? tache.fois : 1;
    var ids = [];
    for (var i = 1; i <= n; i++) ids.push(n === 1 ? tache.id : tache.id + "#" + i);
    return ids;
  }

  function compter(plante, etat, maintenant) {
    var donnees = (window.TACHES || {})[plante];
    var res = { jourTotal: 0, jourFaites: 0, semaineTotal: 0, semaineFaites: 0 };
    if (!donnees) return res;
    ["jour", "semaine"].forEach(function (freq) {
      (donnees[freq] || []).forEach(function (tache) {
        casesDe(tache).forEach(function (id) {
          res[freq + "Total"]++;
          if (estFaite(etat, id, freq, maintenant)) res[freq + "Faites"]++;
        });
      });
    });
    return res;
  }

  function creer(balise, classe, texte) {
    var el = document.createElement(balise);
    if (classe) el.className = classe;
    if (texte) el.textContent = texte;
    return el;
  }

  function caseACocher(id, frequence, etat, maintenant, libelle, classe) {
    var label = creer("label", classe);
    var input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("data-id", id);
    input.setAttribute("data-frequence", frequence);
    input.checked = estFaite(etat, id, frequence, maintenant);
    label.appendChild(input);
    var visuel = creer("span", "case");
    visuel.setAttribute("aria-hidden", "true");
    label.appendChild(visuel);
    label.appendChild(creer("span", "tache-texte", libelle));
    return label;
  }

  function groupe(plante, frequence, titre, niveau, etat, maintenant) {
    var donnees = window.TACHES[plante];
    var bloc = creer("div", "taches-groupe");
    bloc.appendChild(creer("h" + niveau, "taches-titre", titre));

    var liste = donnees[frequence] || [];
    if (!liste.length) {
      var vide = frequence === "jour" ? donnees.jourVide : donnees.semaineVide;
      bloc.appendChild(creer("p", "taches-vide", vide || "Rien à faire."));
      return bloc;
    }

    var ul = creer("ul", "taches-liste");
    liste.forEach(function (tache) {
      var li = creer("li");
      var ids = casesDe(tache);
      if (ids.length === 1) {
        li.appendChild(caseACocher(ids[0], frequence, etat, maintenant, tache.texte, "tache"));
      } else {
        li.className = "tache-multiple";
        li.appendChild(creer("span", "tache-texte", tache.texte));
        var fois = creer("span", "tache-fois");
        ids.forEach(function (id, i) {
          var libelle = i === 0 ? "1re fois" : (i + 1) + "e fois";
          var pastille = caseACocher(id, frequence, etat, maintenant, libelle, "tache tache-pastille");
          pastille.querySelector("input").setAttribute("aria-label", tache.texte + ", " + libelle);
          fois.appendChild(pastille);
        });
        li.appendChild(fois);
      }
      ul.appendChild(li);
    });
    bloc.appendChild(ul);
    return bloc;
  }

  function afficherTaches() {
    var etat = lire(CLE_TACHES);
    var maintenant = new Date();
    if (nettoyer(etat, maintenant)) ecrire(CLE_TACHES, etat);

    var lundi = lundiDe(maintenant);
    var titreSemaine = "Cette semaine (depuis le lundi " +
      lundi.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) + ")";

    document.querySelectorAll("[data-taches]").forEach(function (zone) {
      var plante = zone.getAttribute("data-taches");
      if (!window.TACHES || !window.TACHES[plante]) return;
      var niveau = parseInt(zone.getAttribute("data-niveau") || "3", 10);
      zone.textContent = "";
      zone.appendChild(groupe(plante, "jour", "Aujourd'hui", niveau, etat, maintenant));
      zone.appendChild(groupe(plante, "semaine", titreSemaine, niveau, etat, maintenant));
    });

    afficherResumes(etat, maintenant);
  }

  function pluriel(n, mot) {
    return n + " " + mot + (n > 1 ? "s" : "");
  }

  function afficherResumes(etat, maintenant) {
    var plantes = Object.keys(window.TACHES || {});
    var resteJour = 0;
    var resteSemaine = 0;

    plantes.forEach(function (plante) {
      var c = compter(plante, etat, maintenant);
      resteJour += c.jourTotal - c.jourFaites;
      resteSemaine += c.semaineTotal - c.semaineFaites;

      document.querySelectorAll('[data-resume-plante="' + plante + '"]').forEach(function (el) {
        var total = c.jourTotal + c.semaineTotal;
        var faites = c.jourFaites + c.semaineFaites;
        el.textContent = faites === total ? "Tout est fait" : faites + " sur " + total + " faites";
        el.classList.toggle("est-complet", faites === total);
      });
    });

    document.querySelectorAll("[data-resume]").forEach(function (el) {
      var phrase;
      if (resteJour === 0 && resteSemaine === 0) {
        phrase = "Tout est fait pour aujourd'hui et pour la semaine.";
      } else if (resteJour === 0) {
        phrase = "Rien d'autre aujourd'hui. Il reste " + pluriel(resteSemaine, "tâche") + " cette semaine.";
      } else {
        phrase = pluriel(resteJour, "chose") + " à faire aujourd'hui, et " +
          pluriel(resteSemaine, "tâche") + " cette semaine.";
      }
      el.textContent = phrase;
    });

    document.querySelectorAll("[data-date]").forEach(function (el) {
      var texte = maintenant.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      el.textContent = texte.charAt(0).toUpperCase() + texte.slice(1);
    });

    document.querySelectorAll("[data-alerte-stockage]").forEach(function (el) {
      el.hidden = stockageOk;
    });
  }

  document.addEventListener("change", function (ev) {
    var input = ev.target;
    if (!input.matches || !input.matches("input[data-id]")) return;
    var etat = lire(CLE_TACHES);
    var id = input.getAttribute("data-id");
    if (input.checked) etat[id] = new Date().toISOString();
    else delete etat[id];
    ecrire(CLE_TACHES, etat);
    afficherResumes(etat, new Date());
  });

  /* ---------- Suivi des boutures ---------- */

  function brancherSuivi() {
    var suivi = lire(CLE_SUIVI);
    document.querySelectorAll("[data-suivi]").forEach(function (input) {
      var cle = input.getAttribute("data-suivi");
      if (suivi[cle]) input.value = suivi[cle];
      input.addEventListener("change", function () {
        var actuel = lire(CLE_SUIVI);
        if (input.value) actuel[cle] = input.value;
        else delete actuel[cle];
        ecrire(CLE_SUIVI, actuel);
      });
    });
  }

  /* ---------- Mises à jour ---------- */

  var dernierJour = cleJour(new Date());

  function siNouveauJour() {
    var aujourdhui = cleJour(new Date());
    if (aujourdhui !== dernierJour) {
      dernierJour = aujourdhui;
      afficherTaches();
    }
  }

  /* Une coche faite dans un autre onglet apparaît ici aussi. */
  window.addEventListener("storage", function (ev) {
    if (ev.key === CLE_TACHES) afficherTaches();
  });

  /* Les listes se remettent à zéro si la page reste ouverte après minuit. */
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) siNouveauJour();
  });
  window.setInterval(siNouveauJour, 60 * 1000);

  /* Le navigateur peut réafficher une page depuis son cache (bouton retour). */
  window.addEventListener("pageshow", function (ev) {
    if (ev.persisted) afficherTaches();
  });

  afficherTaches();
  brancherSuivi();
})();
