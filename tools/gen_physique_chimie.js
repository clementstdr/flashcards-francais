#!/usr/bin/env node
// Génère la catégorie « Formules physique-chimie » de index.html à partir de
// tools/formulaire_physique_chimie.md.
//
// Usage : node tools/gen_physique_chimie.js
//
// Le script réécrit uniquement le bloc compris entre les deux balises
//   // === FORMULES PHYSIQUE-CHIMIE — Terminale spécialité ===
//   // === FIN FORMULES PHYSIQUE-CHIMIE ===
// du tableau CARTES. Au premier lancement, il insère ce bloc juste avant la
// section « INTROS ORAL » et ajoute l'entrée du menu <select id="filtre">.

var fs = require("fs");
var path = require("path");

var RACINE = path.join(__dirname, "..");
var SOURCE = path.join(__dirname, "formulaire_physique_chimie.md");
var CIBLE = path.join(RACINE, "index.html");

var CATEGORIE = "Formules physique-chimie";
var BALISE_DEBUT = "  // === FORMULES PHYSIQUE-CHIMIE — Terminale spécialité ===";
var BALISE_FIN = "  // === FIN FORMULES PHYSIQUE-CHIMIE ===";
var BALISE_SUIVANTE = "  // === INTROS ORAL ===";
var OPTION_PRECEDENTE = '    <option value="Formules mathématiques">Formules mathématiques</option>';
var OPTION = '    <option value="' + CATEGORIE + '">' + CATEGORIE + '</option>';

var CHAPITRES = {
  C0: "C0 — Bases de la chimie",
  C1: "C1 — Transformations acido-basiques",
  C2: "C2 — Méthodes physiques d'analyse",
  C3: "C3 — Oxydoréduction"
};

// ---------------------------------------------------------------- parsing

function parser(md) {
  var cartes = [];
  var courante = null;
  md.split(/\r?\n/).forEach(function (ligne) {
    var m = ligne.match(/^### (\S+)\s*$/);
    if (m) { courante = { id: m[1] }; cartes.push(courante); return; }
    if (!courante) return;
    m = ligne.match(/^- \*\*([a-z_]+)\*\* : (.*)$/);
    if (!m) { if (ligne.trim() !== "") courante = null; return; }
    var cle = m[1], valeur = m[2].trim();
    if (cle === "verso_latex" || cle === "verso_texte") {
      valeur = valeur.replace(/^`(.*)`$/, "$1");
    }
    if (cle === "difficulte") valeur = parseInt(valeur, 10);
    if (cle === "tags") valeur = valeur.split(",").map(function (t) { return t.trim(); });
    courante[cle] = valeur;
  });
  return cartes;
}

function verifier(cartes) {
  var ids = {};
  cartes.forEach(function (c) {
    ["chapitre", "theme", "niveau", "difficulte", "recto", "verso_texte", "tags"].forEach(function (k) {
      if (c[k] === undefined || c[k] === "") throw new Error(c.id + " : champ « " + k + " » manquant");
    });
    if (!CHAPITRES[c.chapitre]) throw new Error(c.id + " : chapitre inconnu " + c.chapitre);
    if (ids[c.id]) throw new Error("identifiant en double : " + c.id);
    ids[c.id] = true;
  });
}

// ---------------------------------------------------------------- rendu

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Texte brut du formulaire → HTML : échappement, puis **gras** → <b>.
function texte(s) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

function verso(c) {
  var h = c.verso_latex ? "$" + esc(c.verso_latex) + "$" : texte(c.verso_texte);
  if (c.variables) {
    h += '<div class="petit">' + c.variables.split(" ; ").map(texte).join("<br>") + "</div>";
  }
  if (c.piege) h += '<div class="petit">Piège : ' + texte(c.piege) + "</div>";
  return h;
}

// JSON.stringify échappe correctement les backslashes LaTeX et les guillemets.
function js(v) { return JSON.stringify(v); }

function ligneCarte(c) {
  var champs = [
    "nom:" + js(c.recto),
    "categorie:" + js(CATEGORIE),
    "id:" + js(c.id),
    "chapitre:" + js(c.chapitre),
    "theme:" + js(c.theme),
    "niveau:" + js(c.niveau),
    "difficulte:" + js(c.difficulte),
    "tags:" + js(c.tags)
  ];
  if (c.verso_latex) champs.push("verso_latex:" + js(c.verso_latex));
  champs.push("verso_texte:" + js(c.verso_texte));
  champs.push("verso:" + js(verso(c)));
  return "  {" + champs.join(", ") + "},";
}

function genererBloc(cartes) {
  var lignes = [BALISE_DEBUT];
  var chapitre = null, theme = null;
  cartes.forEach(function (c) {
    if (c.chapitre !== chapitre) {
      chapitre = c.chapitre; theme = null;
      lignes.push("  // --- " + CHAPITRES[chapitre]);
    }
    if (c.theme !== theme) {
      theme = c.theme;
      lignes.push("  // " + theme);
    }
    lignes.push(ligneCarte(c));
  });
  lignes.push(BALISE_FIN);
  return lignes;
}

// ---------------------------------------------------------------- écriture

function main() {
  var cartes = parser(fs.readFileSync(SOURCE, "utf8"));
  verifier(cartes);
  cartes.sort(function (a, b) {
    return a.chapitre < b.chapitre ? -1 : a.chapitre > b.chapitre ? 1 : 0;
  });

  var html = fs.readFileSync(CIBLE, "utf8");
  var eol = html.indexOf("\r\n") !== -1 ? "\r\n" : "\n";
  var lignes = html.split(eol);

  var debut = lignes.indexOf(BALISE_DEBUT);
  var fin = lignes.indexOf(BALISE_FIN);
  var bloc = genererBloc(cartes);

  if (debut !== -1 && fin !== -1 && fin > debut) {
    lignes.splice(debut, fin - debut + 1, ...bloc);
  } else if (debut === -1 && fin === -1) {
    var suivante = lignes.indexOf(BALISE_SUIVANTE);
    if (suivante === -1) throw new Error("balise d'insertion introuvable : " + BALISE_SUIVANTE.trim());
    lignes.splice(suivante, 0, ...bloc, "");
  } else {
    throw new Error("balises FORMULES PHYSIQUE-CHIMIE incohérentes dans index.html");
  }

  if (lignes.indexOf(OPTION) === -1) {
    var opt = lignes.indexOf(OPTION_PRECEDENTE);
    if (opt === -1) throw new Error("option de menu de référence introuvable");
    lignes.splice(opt + 1, 0, OPTION);
  }

  fs.writeFileSync(CIBLE, lignes.join(eol), "utf8");

  var sansLatex = cartes.filter(function (c) { return !c.verso_latex; }).length;
  console.log(cartes.length + " cartes générées (" + (cartes.length - sansLatex) +
    " avec LaTeX, " + sansLatex + " texte seul) → " + path.relative(RACINE, CIBLE));
}

main();
