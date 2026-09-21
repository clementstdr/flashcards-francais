# Formulaire — Flashcards Physique-Chimie (Terminale spé)

Chapitres couverts : **C0** bases de la chimie · **C1** transformations acido-basiques · **C2** méthodes physiques d'analyse · **C3** oxydoréduction.
Niveaux : formules de **Première** (socle réinvesti) et de **Terminale**.

---

## Schéma de données (pour l'implémentation)

Chaque carte est un bloc `### <id>` suivi d'une liste de champs `- **clé** : valeur`. Les champs sont stables et toujours dans le même ordre.

| Champ | Type | Obligatoire | Description |
|---|---|---|---|
| `id` | string (titre `###`) | oui | Identifiant unique, préfixe = chapitre |
| `chapitre` | enum | oui | `C0` \| `C1` \| `C2` \| `C3` |
| `theme` | string | oui | Sous-thème, sert de regroupement en deck |
| `niveau` | enum | oui | `premiere` \| `terminale` |
| `difficulte` | int 1–3 | oui | 1 = restitution pure, 3 = à redémontrer |
| `recto` | string | oui | La question affichée |
| `verso_latex` | string (délimité par `` ` ``) | oui | Formule en LaTeX, **sans** les `$` délimiteurs |
| `verso_texte` | string (délimité par `` ` ``) | oui | Formule en Unicode texte brut |
| `variables` | string | non | Symbole — signification — unité, séparés par ` ; ` |
| `piege` | string | non | Erreur classique à signaler au verso |
| `tags` | liste csv | oui | Pour le filtrage |

> Rendu conseillé : **KaTeX** sur `verso_latex`, avec repli sur `verso_texte` si KaTeX n'est pas chargé.
> Les valeurs de `verso_latex` et `verso_texte` sont entre backticks et ne contiennent jamais de caractère `|` — un parsing ligne à ligne suffit.

---

# 1. Constantes et données de référence

### CST-01
- **chapitre** : C0
- **theme** : Constantes
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Quelle est la valeur du nombre d'Avogadro ?
- **verso_latex** : `N_A = 6{,}02 \times 10^{23}\ \mathrm{mol^{-1}}`
- **verso_texte** : `N_A = 6,02 × 10²³ mol⁻¹`
- **variables** : N_A — nombre d'entités par mole — mol⁻¹
- **tags** : constante, mole, avogadro

### CST-02
- **chapitre** : C0
- **theme** : Constantes
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Quelle est la masse volumique de l'eau, dans les deux unités usuelles ? Et sa densité ?
- **verso_latex** : `\rho_{\text{eau}} = 1{,}0\ \mathrm{g\cdot mL^{-1}} = 1000\ \mathrm{g\cdot L^{-1}} \quad ; \quad d_{\text{eau}} = 1{,}0`
- **verso_texte** : `ρ_eau = 1,0 g·mL⁻¹ = 1000 g·L⁻¹ ; d_eau = 1,0`
- **piege** : Choisir l'unité de ρ selon celle de V : V en L → ρ en g·L⁻¹ ; V en mL → ρ en g·mL⁻¹.
- **tags** : constante, masse-volumique, densite

### CST-03
- **chapitre** : C2
- **theme** : Constantes
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Quelle est la valeur de la constante des gaz parfaits ?
- **verso_latex** : `R = 8{,}314\ \mathrm{J\cdot K^{-1}\cdot mol^{-1}}`
- **verso_texte** : `R = 8,314 J·K⁻¹·mol⁻¹`
- **tags** : constante, gaz-parfait

### CST-04
- **chapitre** : C0
- **theme** : Constantes
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Quelles sont les deux valeurs de référence du volume molaire gazeux sous 1013 hPa ?
- **verso_latex** : `V_m(0{,}00\,^\circ\mathrm{C}) = 22{,}4\ \mathrm{L\cdot mol^{-1}} \quad ; \quad V_m(20{,}0\,^\circ\mathrm{C}) = 24{,}0\ \mathrm{L\cdot mol^{-1}}`
- **verso_texte** : `Vm(0,00 °C) = 22,4 L·mol⁻¹ ; Vm(20,0 °C) = 24,0 L·mol⁻¹`
- **piege** : Vm ne dépend **pas** de la nature du gaz, seulement de T et P.
- **tags** : constante, volume-molaire, gaz

### CST-05
- **chapitre** : C1
- **theme** : Constantes
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Que vaut la concentration standard c° utilisée dans la définition du pH ?
- **verso_latex** : `c^\circ = 1{,}0\ \mathrm{mol\cdot L^{-1}}`
- **verso_texte** : `c° = 1,0 mol·L⁻¹`
- **piege** : c° sert uniquement à rendre le rapport sans unité — c'est ce qui permet d'appliquer le log.
- **tags** : constante, pH

---

# 2. Chapitre C0 — Les bases de la chimie

## 2.1 Quantités de matière

### C0-01
- **chapitre** : C0
- **theme** : Quantité de matière
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Relation entre quantité de matière et nombre d'entités ?
- **verso_latex** : `N = n \times N_A`
- **verso_texte** : `N = n × N_A`
- **variables** : N — nombre d'entités — sans unité ; n — quantité de matière — mol ; N_A — nombre d'Avogadro — mol⁻¹
- **tags** : quantite-matiere, mole

### C0-02
- **chapitre** : C0
- **theme** : Quantité de matière
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Quantité de matière à partir de la masse d'un échantillon ?
- **verso_latex** : `n = \dfrac{m}{M}`
- **verso_texte** : `n = m / M`
- **variables** : n — quantité de matière — mol ; m — masse — g ; M — masse molaire — g·mol⁻¹
- **piege** : Valable pour tout corps pur, solide, liquide **ou** gazeux.
- **tags** : quantite-matiere, masse-molaire

### C0-03
- **chapitre** : C0
- **theme** : Quantité de matière
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Définition de la masse volumique ?
- **verso_latex** : `\rho = \dfrac{m}{V}`
- **verso_texte** : `ρ = m / V`
- **variables** : ρ — masse volumique — g·mL⁻¹ ou g·L⁻¹ ; m — masse — g ; V — volume — mL ou L
- **tags** : masse-volumique

### C0-04
- **chapitre** : C0
- **theme** : Quantité de matière
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Définition de la densité d'un échantillon ?
- **verso_latex** : `d = \dfrac{\rho}{\rho_{\text{eau}}}`
- **verso_texte** : `d = ρ / ρ_eau`
- **variables** : d — densité — **sans unité** ; ρ — masse volumique de l'échantillon ; ρ_eau — masse volumique de l'eau
- **piege** : d est sans unité. ρ et ρ_eau doivent être exprimées dans la **même** unité.
- **tags** : densite, masse-volumique

### C0-05
- **chapitre** : C0
- **theme** : Quantité de matière
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Quantité de matière d'un liquide à partir de son volume, de sa masse volumique ou de sa densité ?
- **verso_latex** : `n = \dfrac{\rho \times V}{M} = \dfrac{d \times \rho_{\text{eau}} \times V}{M}`
- **verso_texte** : `n = (ρ × V) / M = (d × ρ_eau × V) / M`
- **variables** : n — mol ; ρ — g·mL⁻¹ ou g·L⁻¹ ; V — mL ou L ; M — g·mol⁻¹ ; d — sans unité
- **piege** : Se retrouve en composant n = m/M et ρ = m/V. Cohérence des unités de V et ρ obligatoire.
- **tags** : quantite-matiere, densite, masse-volumique

### C0-06
- **chapitre** : C0
- **theme** : Quantité de matière
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Quantité de matière d'un gaz à partir de son volume ?
- **verso_latex** : `n = \dfrac{V}{V_m}`
- **verso_texte** : `n = V / Vm`
- **variables** : n — mol ; V — volume du gaz — L ; Vm — volume molaire gazeux — L·mol⁻¹
- **piege** : Vm dépend de T et P, jamais de la nature du gaz.
- **tags** : quantite-matiere, gaz, volume-molaire

## 2.2 Réaction chimique et avancement

### C0-07
- **chapitre** : C0
- **theme** : Avancement
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Bilan de matière : quelle relation de proportionnalité est vraie à tout instant pour aA + bB → cC + dD ?
- **verso_latex** : `\dfrac{n(A)_{\text{consommé}}}{a} = \dfrac{n(B)_{\text{consommé}}}{b} = \dfrac{n(C)_{\text{formé}}}{c} = \dfrac{n(D)_{\text{formé}}}{d}`
- **verso_texte** : `n(A)consommé / a = n(B)consommé / b = n(C)formé / c = n(D)formé / d`
- **piege** : Uniquement les quantités **consommées** et **formées** — jamais les quantités apportées ni restantes.
- **tags** : avancement, stoechiometrie, bilan-matiere

### C0-08
- **chapitre** : C0
- **theme** : Avancement
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Définition de l'avancement x d'une réaction ?
- **verso_latex** : `x = \dfrac{n(A)_{\text{consommé}}}{a} = \dfrac{n(B)_{\text{consommé}}}{b} = \dfrac{n(C)_{\text{formé}}}{c} = \dfrac{n(D)_{\text{formé}}}{d}`
- **verso_texte** : `x = n(A)consommé / a = n(B)consommé / b = n(C)formé / c = n(D)formé / d`
- **variables** : x — avancement — **mol**
- **tags** : avancement

### C0-09
- **chapitre** : C0
- **theme** : Avancement
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Quantité de matière restante d'un réactif A à l'avancement x ?
- **verso_latex** : `n(A)_{\text{restant}} = n_0(A) - a\,x`
- **verso_texte** : `n(A)restant = n0(A) − a·x`
- **piege** : Ne pas oublier le nombre stœchiométrique a devant x.
- **tags** : avancement, tableau-avancement

### C0-10
- **chapitre** : C0
- **theme** : Avancement
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Quantité de matière formée d'un produit C à l'avancement x (si n0(C) = 0) ?
- **verso_latex** : `n(C)_{\text{formé}} = c\,x`
- **verso_texte** : `n(C)formé = c·x`
- **tags** : avancement, tableau-avancement

### C0-11
- **chapitre** : C0
- **theme** : Avancement
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Comment détermine-t-on l'avancement maximal et le réactif limitant ?
- **verso_latex** : `x_{max} = \min\left(\dfrac{n_0(A)}{a}\;;\;\dfrac{n_0(B)}{b}\right)`
- **verso_texte** : `x_max = min( n0(A)/a ; n0(B)/b )`
- **piege** : Le réactif limitant est celui qui donne la **plus petite** valeur. Égalité ⇒ mélange **stœchiométrique**, les deux réactifs sont limitants.
- **tags** : avancement, reactif-limitant

### C0-12
- **chapitre** : C0
- **theme** : Avancement
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Condition sur les quantités initiales pour que les réactifs soient dans les proportions stœchiométriques ?
- **verso_latex** : `\dfrac{n_0(A)}{a} = \dfrac{n_0(B)}{b}`
- **verso_texte** : `n0(A)/a = n0(B)/b`
- **piege** : Les deux réactifs sont alors entièrement consommés en fin de réaction (si elle est totale).
- **tags** : stoechiometrie, reactif-limitant

## 2.3 Solutions et concentrations

### C0-13
- **chapitre** : C0
- **theme** : Concentrations
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Définition de la concentration molaire d'une solution ?
- **verso_latex** : `C = \dfrac{n_{\text{soluté}}}{V}`
- **verso_texte** : `C = n_soluté / V`
- **variables** : C — concentration molaire — mol·L⁻¹ ; n — quantité de soluté dissous — mol ; V — volume de **solution** — L
- **piege** : V est le volume de **solution**, pas de solvant.
- **tags** : concentration, solution

### C0-14
- **chapitre** : C0
- **theme** : Concentrations
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Définition de la concentration massique d'une solution ?
- **verso_latex** : `C_m = \dfrac{m_{\text{soluté}}}{V}`
- **verso_texte** : `Cm = m_soluté / V`
- **variables** : Cm — g·L⁻¹ ; m — masse de soluté dissous — g ; V — volume de solution — L
- **tags** : concentration, solution

### C0-15
- **chapitre** : C0
- **theme** : Concentrations
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Relation entre concentration massique et concentration molaire (et sa démonstration) ?
- **verso_latex** : `C_m = \dfrac{m}{V} = \dfrac{n \times M}{V} = C \times M`
- **verso_texte** : `Cm = m/V = (n × M)/V = C × M`
- **piege** : Le cours précise « à redémontrer à chaque fois » — ne pas la poser sans justification.
- **tags** : concentration, demonstration

### C0-16
- **chapitre** : C0
- **theme** : Concentrations
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Définition du pourcentage massique d'une solution ?
- **verso_latex** : `P = \dfrac{m_{\text{soluté}}}{m_{\text{solution}}}`
- **verso_texte** : `P = m_soluté / m_solution`
- **piege** : Sans unité. Multiplier par 100 pour l'exprimer en %. Un P = 20 % s'utilise comme 0,20 dans les calculs.
- **tags** : pourcentage-massique, concentration

### C0-17
- **chapitre** : C0
- **theme** : Concentrations
- **niveau** : premiere
- **difficulte** : 3
- **recto** : Relation entre pourcentage massique P, densité d et concentration molaire C ? (démonstration attendue)
- **verso_latex** : `C = \dfrac{P \times d \times \rho_{\text{eau}}}{M} = \dfrac{P \times \rho_{\text{solution}}}{M}`
- **verso_texte** : `C = (P × d × ρ_eau) / M = (P × ρ_solution) / M`
- **variables** : C — mol·L⁻¹ ; P — sans unité ; d — sans unité ; ρ_eau — g·L⁻¹ ; M — g·mol⁻¹
- **piege** : Démonstration : m_soluté = C·V·M et m_solution = d·ρ_eau·V, donc P = C·M/(d·ρ_eau). Le volume V se simplifie — c'est le point clé.
- **tags** : pourcentage-massique, densite, concentration, demonstration

### C0-18
- **chapitre** : C0
- **theme** : Concentrations
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Définition de la concentration effective d'une espèce X en solution ?
- **verso_latex** : `[X] = \dfrac{n_X}{V}`
- **verso_texte** : `[X] = n_X / V`
- **piege** : [X] ≠ C. Le lien entre les deux passe par les **nombres stœchiométriques de l'équation de dissolution**. Ex. Na₂SO₄ → [Na⁺] = 2C et [SO₄²⁻] = C.
- **tags** : concentration-effective, dissolution

### C0-19
- **chapitre** : C0
- **theme** : Solubilité
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Qu'est-ce que la solubilité d'un corps, et qu'est-ce qu'une solution saturée ?
- **verso_latex** : `s = \dfrac{m_{\max}}{V} \quad \text{ou} \quad s = \dfrac{n_{\max}}{V}`
- **verso_texte** : `s = m_max / V (g·L⁻¹) ou s = n_max / V (mol·L⁻¹)`
- **piege** : Quantité **maximale** de soluté dissoluble dans 1 L de solution, à une température donnée. Au-delà : solution **saturée**, l'excédent reste solide.
- **tags** : solubilite, solution-saturee

## 2.4 Dilution

### C0-20
- **chapitre** : C0
- **theme** : Dilution
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Relation fondamentale de la dilution ?
- **verso_latex** : `C_{\text{mère}} \times V_{\text{mère}} = C_{\text{fille}} \times V_{\text{fille}}`
- **verso_texte** : `C_mère × V_mère = C_fille × V_fille`
- **piege** : Elle traduit la **conservation de la quantité de matière de soluté** — c'est cette phrase qu'il faut écrire avant la formule.
- **tags** : dilution, conservation

### C0-21
- **chapitre** : C0
- **theme** : Dilution
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Définition du facteur de dilution k ?
- **verso_latex** : `k = \dfrac{C}{C'} = \dfrac{V'}{V}`
- **verso_texte** : `k = C / C' = V' / V`
- **variables** : C, V — solution-mère ; C', V' — solution-fille (C > C' et V' > V)
- **piege** : k > 1 toujours. « Diluer 250 fois » ⇒ k = 250.
- **tags** : dilution

### C0-22
- **chapitre** : C0
- **theme** : Dilution
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Volume de solution-mère à prélever pour préparer un volume V' de solution-fille ?
- **verso_latex** : `V = \dfrac{C' \times V'}{C} = \dfrac{V'}{k}`
- **verso_texte** : `V = (C' × V') / C = V' / k`
- **tags** : dilution, protocole

---

# 3. Chapitre C1 — Transformations acido-basiques

## 3.1 Couples et réactions

### C1-01
- **chapitre** : C1
- **theme** : Couple acide-base
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Forme générale d'une demi-équation acido-basique ?
- **verso_latex** : `\mathrm{acide} = \mathrm{base} + \mathrm{H^+} \qquad AH = A^- + \mathrm{H^+} \qquad BH^+ = B + \mathrm{H^+}`
- **verso_texte** : `acide = base + H⁺   |   AH = A⁻ + H⁺   |   BH⁺ = B + H⁺`
- **piege** : Signe **=** pour une demi-équation, jamais une flèche.
- **tags** : brønsted, couple, demi-equation

### C1-02
- **chapitre** : C1
- **theme** : Réaction acide-base
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Comment établit-on l'équation d'une réaction acide-base à partir de deux couples ?
- **verso_latex** : `\begin{aligned} \mathrm{acide_1} &= \mathrm{base_1} + \mathrm{H^+} \\ \mathrm{base_2} + \mathrm{H^+} &= \mathrm{acide_2} \\ \hline \mathrm{acide_1} + \mathrm{base_2} &\rightarrow \mathrm{base_1} + \mathrm{acide_2} \end{aligned}`
- **verso_texte** : `acide₁ = base₁ + H⁺  /  base₂ + H⁺ = acide₂  →  acide₁ + base₂ → base₁ + acide₂`
- **piege** : La demi-équation de la **base₂ est inversée**. Le H⁺ doit se simplifier : il ne doit jamais apparaître dans l'équation bilan. La flèche → indique le sens d'évolution.
- **tags** : reaction-acide-base, methode

### C1-03
- **chapitre** : C1
- **theme** : Amphotère
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Qu'est-ce qu'une espèce amphotère (ampholyte) ? Deux exemples.
- **verso_latex** : `\mathrm{H_2O}\,:\ \mathrm{H_2O/HO^-}\ \text{et}\ \mathrm{H_3O^+/H_2O} \qquad ; \qquad \mathrm{HCO_3^-}\,:\ \mathrm{H_2CO_3/HCO_3^-}\ \text{et}\ \mathrm{HCO_3^-/CO_3^{2-}}`
- **verso_texte** : `H₂O : couples H₂O/HO⁻ et H₃O⁺/H₂O ; HCO₃⁻ : couples H₂CO₃/HCO₃⁻ et HCO₃⁻/CO₃²⁻`
- **piege** : Espèce qui appartient à **deux couples** : acide dans l'un, base dans l'autre. Méthode de repérage : la chercher deux fois dans la liste des couples donnée.
- **tags** : amphotere, ampholyte

## 3.2 pH et logarithme

### C1-04
- **chapitre** : C1
- **theme** : pH
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Définition du pH d'une solution aqueuse ?
- **verso_latex** : `\mathrm{pH} = -\log\left(\dfrac{[\mathrm{H_3O^+}]}{c^\circ}\right)`
- **verso_texte** : `pH = −log( [H₃O⁺] / c° )`
- **variables** : pH — sans unité ; [H₃O⁺] — mol·L⁻¹ ; c° = 1,0 mol·L⁻¹
- **piege** : Le rapport par c° rend l'argument du log sans unité. Le pH n'a **pas** d'unité.
- **tags** : pH, oxonium

### C1-05
- **chapitre** : C1
- **theme** : pH
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Concentration en ions oxonium à partir du pH ?
- **verso_latex** : `[\mathrm{H_3O^+}] = c^\circ \times 10^{-\mathrm{pH}}`
- **verso_texte** : `[H₃O⁺] = c° × 10^(−pH)`
- **piege** : Résultat en mol·L⁻¹, à exprimer avec **2 chiffres significatifs maximum**.
- **tags** : pH, oxonium, reciproque

### C1-06
- **chapitre** : C1
- **theme** : Logarithme
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Propriétés de la fonction logarithme décimal à connaître ?
- **verso_latex** : `\log(10^x) = x \quad ; \quad 10^{\log x} = x \quad ; \quad \log 1 = 0 \quad ; \quad \log(x \times y) = \log x + \log y`
- **verso_texte** : `log(10^x) = x ; 10^(log x) = x ; log 1 = 0 ; log(x × y) = log x + log y`
- **piege** : log est croissante, définie pour x > 0 seulement. Sa réciproque est 10^x.
- **tags** : logarithme, mathematiques

### C1-07
- **chapitre** : C1
- **theme** : pH
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Comment varie le pH quand [H₃O⁺] augmente ?
- **verso_latex** : `[\mathrm{H_3O^+}] \nearrow \;\Longrightarrow\; \log[\mathrm{H_3O^+}] \nearrow \;\Longrightarrow\; \mathrm{pH} \searrow`
- **verso_texte** : `[H₃O⁺] augmente ⇒ log[H₃O⁺] augmente ⇒ pH diminue`
- **piege** : Le signe « − » de la définition inverse le sens de variation. Plus la solution est acide, plus le pH est **petit**.
- **tags** : pH, variation

### C1-08
- **chapitre** : C1
- **theme** : pH
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Quelle règle de chiffres significatifs s'applique à une concentration déduite d'une mesure de pH ? Pourquoi ?
- **verso_latex** : `\Delta \mathrm{pH} = \pm\,0{,}1 \;\Longrightarrow\; \dfrac{\Delta[\mathrm{H_3O^+}]}{[\mathrm{H_3O^+}]} \approx 20\,\%`
- **verso_texte** : `ΔpH = ±0,1 ⇒ Δ[H₃O⁺]/[H₃O⁺] ≈ 20 %`
- **piege** : Jamais plus de **2 chiffres significatifs** sur une concentration déduite d'un pH. L'échelle logarithmique amplifie l'incertitude : ~2 % sur le pH devient ~20 % sur la concentration.
- **tags** : pH, incertitude, chiffres-significatifs

### C1-09
- **chapitre** : C1
- **theme** : Solution tampon
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Qu'est-ce qu'une solution tampon ?
- **verso_latex** : `\text{pH} \approx \text{constant lors d'un ajout modéré d'acide, de base, ou d'une dilution}`
- **verso_texte** : `Solution dont le pH reste pratiquement constant lors d'un ajout modéré d'acide ou de base, ou lors d'une dilution.`
- **piege** : Usage principal en TP : **étalonnage du pH-mètre** avec deux solutions tampons de pH connu.
- **tags** : tampon, pH-metre

### C1-10
- **chapitre** : C1
- **theme** : Concentration effective
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Pour un monoacide fort et pour un diacide fort de concentration C, que valent les concentrations effectives ?
- **verso_latex** : `\text{monoacide : } [\mathrm{H_3O^+}] = C \qquad ; \qquad \text{diacide (ex. } \mathrm{H_2SO_4}) : [\mathrm{H_3O^+}] = 2C \;\text{ et }\; [\mathrm{SO_4^{2-}}] = C`
- **verso_texte** : `Monoacide fort : [H₃O⁺] = C. Diacide fort (H₂SO₄) : [H₃O⁺] = 2C et [SO₄²⁻] = C`
- **piege** : Les coefficients viennent directement des **nombres stœchiométriques** de l'équation de dissolution. Erreur classique : oublier le facteur 2.
- **tags** : concentration-effective, acide-fort, dissolution

### C1-11
- **chapitre** : C1
- **theme** : Mélange acide-base
- **niveau** : terminale
- **difficulte** : 3
- **recto** : Méthode pour déterminer le pH d'un mélange acide fort / base forte ?
- **verso_latex** : `n_0(\mathrm{H_3O^+}) = C\,V \;;\; n_0(\mathrm{OH^-}) = C'V' \;;\; x_{max} = \min(n_0(\mathrm{H_3O^+}), n_0(\mathrm{OH^-})) \;;\; [\mathrm{H_3O^+}]_f = \dfrac{n_0(\mathrm{H_3O^+}) - x_{max}}{V + V'}`
- **verso_texte** : `n0(H₃O⁺) = C·V ; n0(OH⁻) = C'·V' ; x_max = min(...) ; [H₃O⁺]f = (n0(H₃O⁺) − x_max)/(V + V') ; pH = −log([H₃O⁺]f/c°)`
- **piege** : Diviser par le volume **total** V + V'. Réaction : H₃O⁺ + OH⁻ → 2 H₂O (coefficients 1-1).
- **tags** : melange, tableau-avancement, pH, methode

---

# 4. Chapitre C2 — Méthodes physiques d'analyse

## 4.1 Spectrophotométrie UV-visible

### C2-01
- **chapitre** : C2
- **theme** : Spectrophotométrie
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Définition de la transmittance ?
- **verso_latex** : `T = \dfrac{I}{I_0}`
- **verso_texte** : `T = I / I₀`
- **variables** : I₀ — intensité **avant** l'échantillon ; I — intensité **après** l'échantillon
- **piege** : Sans unité, comprise entre 0 et 1 (ou 0 et 100 %).
- **tags** : transmittance, spectrophotometrie

### C2-02
- **chapitre** : C2
- **theme** : Spectrophotométrie
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Définition de l'absorbance ?
- **verso_latex** : `A = -\log T = \log\dfrac{I_0}{I}`
- **verso_texte** : `A = −log T = log(I₀ / I)`
- **piege** : Sans unité. En pratique, les appareils courants mesurent jusqu'à A = 2. A = 0 ⇒ lumière totalement transmise. I = I₀/10 ⇒ A = 1 ; I = I₀/100 ⇒ A = 2.
- **tags** : absorbance, spectrophotometrie, logarithme

### C2-03
- **chapitre** : C2
- **theme** : Beer-Lambert
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Énoncé de la loi de Beer-Lambert ?
- **verso_latex** : `A = \varepsilon \times \ell \times C`
- **verso_texte** : `A = ε × ℓ × C`
- **variables** : A — absorbance — sans unité ; ε — coefficient d'extinction molaire — L·mol⁻¹·cm⁻¹ ; ℓ — épaisseur de solution traversée — cm ; C — concentration molaire — mol·L⁻¹
- **piege** : Unités **non SI** ici (cm et mol·L⁻¹). ε dépend de l'espèce **et** de la longueur d'onde λ.
- **tags** : beer-lambert, absorbance, loi

### C2-04
- **chapitre** : C2
- **theme** : Beer-Lambert
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Quel est le domaine de validité de la loi de Beer-Lambert ? (4 conditions)
- **verso_latex** : `\text{(1) lumière monochromatique} \;;\; \text{(2) } C \lesssim 10^{-2}\ \mathrm{mol\cdot L^{-1}} \;;\; \text{(3) solution homogène et limpide} \;;\; \text{(4) pas d'association soluté-solvant variable}`
- **verso_texte** : `(1) lumière monochromatique ; (2) solution diluée, C ≲ 10⁻² mol·L⁻¹ ; (3) solution homogène et limpide (ni précipité ni gaz), soluté non photosensible ; (4) pas d'associations variables avec le solvant`
- **piege** : Capacité exigible explicitement listée par le prof — question de cours probable.
- **tags** : beer-lambert, validite, cours

### C2-05
- **chapitre** : C2
- **theme** : Spectrophotométrie
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Quels sont les domaines de longueur d'onde de l'UV et du visible, et quelles espèces y absorbent ?
- **verso_latex** : `\mathrm{UV}: 200\text{–}400\ \mathrm{nm} \;;\; \mathrm{Visible}: 400\text{–}800\ \mathrm{nm}`
- **verso_texte** : `UV : 200–400 nm (doublets libres O, N ; liaisons multiples). Visible : 400–800 nm (liaisons multiples conjuguées).`
- **piege** : Plus il y a de liaisons multiples **conjuguées**, plus l'absorption se déplace vers les **grandes** longueurs d'onde (β-carotène).
- **tags** : UV-visible, spectre, conjugaison

### C2-06
- **chapitre** : C2
- **theme** : Spectrophotométrie
- **niveau** : terminale
- **difficulte** : 1
- **recto** : À quelle longueur d'onde réalise-t-on un dosage par spectrophotométrie, et pourquoi ?
- **verso_latex** : `\lambda = \lambda_{max} \quad \text{(maximum d'absorbance de l'espèce dosée)}`
- **verso_texte** : `λ = λ_max : au maximum d'absorbance de l'espèce à doser, pour maximiser la sensibilité — et là où les autres espèces n'absorbent pas.`
- **piege** : Double critère : sensibilité maximale **et** absence d'interférence des autres espèces présentes.
- **tags** : dosage, spectrophotometrie, lambda-max

## 4.2 Spectroscopie infrarouge

### C2-07
- **chapitre** : C2
- **theme** : Infrarouge
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Définition du nombre d'onde en spectroscopie IR ?
- **verso_latex** : `\sigma = \dfrac{1}{\lambda}`
- **verso_texte** : `σ = 1 / λ`
- **variables** : σ — nombre d'onde — cm⁻¹ ; λ — longueur d'onde — cm
- **piege** : λ à convertir en **cm**, pas en m ni en µm. Le domaine IR va de 2,5 µm à 16 µm, soit 4000 à 625 cm⁻¹.
- **tags** : infrarouge, nombre-onde

### C2-08
- **chapitre** : C2
- **theme** : Infrarouge
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Que représente un spectre IR, et comment se lit-il ?
- **verso_latex** : `T(\%) = f(\sigma) \quad \text{avec } \sigma \text{ décroissant de gauche à droite}`
- **verso_texte** : `Transmission T (en %) en fonction du nombre d'onde σ (cm⁻¹), axe orienté de droite à gauche. Bandes vers le bas.`
- **piege** : > 1200 cm⁻¹ : groupes caractéristiques (exploitable). < 1200 cm⁻¹ : **empreinte digitale**, non exploitable.
- **tags** : infrarouge, spectre, lecture

### C2-09
- **chapitre** : C2
- **theme** : Infrarouge
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Bandes IR caractéristiques à connaître (liaison → nombre d'onde) ?
- **verso_latex** : `\mathrm{C{-}H}\,(alcane): 2850\text{–}3000 \;;\; \mathrm{C{=}O}: 1705\text{–}1800 \;;\; \mathrm{O{-}H}\,(alcool\ lié): 3200\text{–}3450 \;;\; \mathrm{O{-}H}\,(acide): 3450\text{–}3550`
- **verso_texte** : `C–H alcane : 2850–3000 cm⁻¹ (F) | C=O cétone : 1705–1725 | C=O aldéhyde : 1720–1740 | C=O acide : 1740–1800 | O–H alcool lié : 3200–3450 (large) | O–H acide : 3450–3550 (large) | C–O acide : 1080–1190`
- **piege** : Les O–H donnent des bandes **larges et arrondies** — c'est le critère visuel de reconnaissance.
- **tags** : infrarouge, table, groupes-caracteristiques

### C2-10
- **chapitre** : C2
- **theme** : Infrarouge
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Méthode pour identifier une famille à partir d'un spectre IR ?
- **verso_latex** : `\mathrm{C{=}O}\ \text{seul} \Rightarrow \text{aldéhyde ou cétone} \;;\; \mathrm{C{=}O} + \mathrm{O{-}H}\ \text{large} \Rightarrow \text{acide carboxylique} \;;\; \mathrm{O{-}H}\ \text{seul} \Rightarrow \text{alcool}`
- **verso_texte** : `1) Bande vers 1700 ⇒ C=O. 2) Bande large vers 3200–3600 ⇒ O–H. 3) C=O seul ⇒ aldéhyde/cétone ; C=O + O–H large ⇒ acide carboxylique ; O–H seul ⇒ alcool. 4) Trancher avec la formule brute.`
- **piege** : Toujours croiser avec la **formule brute** : un seul atome d'O exclut l'acide carboxylique.
- **tags** : infrarouge, methode, identification

## 4.3 Conductimétrie

### C2-11
- **chapitre** : C2
- **theme** : Conductimétrie
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Relation entre conductance, résistance, tension et intensité ?
- **verso_latex** : `G = \dfrac{1}{R} = \dfrac{I}{U}`
- **verso_texte** : `G = 1/R = I/U`
- **variables** : G — conductance — **siemens (S)** ; R — résistance — ohm (Ω) ; U — tension — V ; I — intensité — A
- **piege** : G = I/U vient directement de la loi d'Ohm U = R·I.
- **tags** : conductance, ohm

### C2-12
- **chapitre** : C2
- **theme** : Conductimétrie
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Relation entre conductance et conductivité (cellule conductimétrique) ?
- **verso_latex** : `G = \sigma \times \dfrac{S}{L} \qquad\Longleftrightarrow\qquad \sigma = G \times \dfrac{L}{S}`
- **verso_texte** : `G = σ × S/L  ⟺  σ = G × L/S`
- **variables** : σ — conductivité — S·m⁻¹ ; S — aire des plaques — m² ; L — distance entre les plaques — m
- **piege** : L/S est la **constante de cellule**, propre à l'appareil. G dépend de la cellule, σ non : σ caractérise la solution.
- **tags** : conductivite, conductance, cellule

### C2-13
- **chapitre** : C2
- **theme** : Kohlrausch
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Énoncé de la loi de Kohlrausch ?
- **verso_latex** : `\sigma = \sum_i \lambda_i \times [X_i]`
- **verso_texte** : `σ = Σ λᵢ × [Xᵢ]`
- **variables** : σ — conductivité — S·m⁻¹ ; λᵢ — conductivité molaire ionique — S·m²·mol⁻¹ ; [Xᵢ] — concentration effective — **mol·m⁻³**
- **piege** : ⚠️ LE piège du chapitre : les concentrations sont en **mol·m⁻³**, pas mol·L⁻¹. 1 mol·L⁻¹ = 10³ mol·m⁻³. Somme sur **tous** les ions présents, anions **et** cations.
- **tags** : kohlrausch, conductivite, unites, loi

### C2-14
- **chapitre** : C2
- **theme** : Kohlrausch
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Domaine de validité de la loi de Kohlrausch ?
- **verso_latex** : `C < 10^{-2}\ \mathrm{mol\cdot L^{-1}} \quad (= 10\ \mathrm{mol\cdot m^{-3}})`
- **verso_texte** : `Solutions ioniques diluées : C < 10⁻² mol·L⁻¹ (soit 10 mol·m⁻³)`
- **piege** : Capacité exigible explicitement listée par le prof.
- **tags** : kohlrausch, validite, cours

### C2-15
- **chapitre** : C2
- **theme** : Kohlrausch
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Pour un électrolyte totalement dissocié de type AB (ex. NaCl) de concentration C, quelle est la conductivité ?
- **verso_latex** : `\sigma = (\lambda_{A^+} + \lambda_{B^-}) \times C = k \times C`
- **verso_texte** : `σ = (λ_A⁺ + λ_B⁻) × C = k × C`
- **piege** : Comme [A⁺] = [B⁻] = C, la conductivité est **proportionnelle** à C — c'est ce qui justifie la droite d'étalonnage σ = k·C passant par l'origine.
- **tags** : kohlrausch, etalonnage, dissolution

## 4.4 Gaz parfait

### C2-16
- **chapitre** : C2
- **theme** : Gaz parfait
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Équation d'état du gaz parfait ?
- **verso_latex** : `P \times V = n \times R \times T`
- **verso_texte** : `P × V = n × R × T`
- **variables** : P — pression — Pa ; V — volume — m³ ; n — mol ; T — température **absolue** — K ; R = 8,314 J·K⁻¹·mol⁻¹
- **piege** : **Unités SI obligatoires** : Pa, m³, K. 1 L = 10⁻³ m³ ; 1 hPa = 100 Pa.
- **tags** : gaz-parfait, equation-etat, loi

### C2-17
- **chapitre** : C2
- **theme** : Gaz parfait
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Conversion degrés Celsius → kelvin ?
- **verso_latex** : `T(\mathrm{K}) = \theta(^\circ\mathrm{C}) + 273{,}15`
- **verso_texte** : `T(K) = θ(°C) + 273,15`
- **tags** : gaz-parfait, temperature, conversion

### C2-18
- **chapitre** : C2
- **theme** : Gaz parfait
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Expression du volume molaire gazeux en fonction de T et P ?
- **verso_latex** : `V_m = \dfrac{V}{n} = \dfrac{R \times T}{P}`
- **verso_texte** : `Vm = V/n = (R × T) / P`
- **piege** : Résultat en m³·mol⁻¹ ; × 10³ pour l'avoir en L·mol⁻¹. Vérification : à 20 °C et 1013 hPa, Vm = 8,314 × 293,15 / 101300 = 2,41 × 10⁻² m³·mol⁻¹ = 24,1 L·mol⁻¹.
- **tags** : gaz-parfait, volume-molaire, demonstration

### C2-19
- **chapitre** : C2
- **theme** : Gaz parfait
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Domaine de validité du modèle du gaz parfait ?
- **verso_latex** : `\text{gaz à faible pression (gaz dilués)}`
- **verso_texte** : `Modèle valable pour des gaz à faible pression (gaz dilués), loin de la liquéfaction.`
- **tags** : gaz-parfait, validite, cours

## 4.5 Dosage par étalonnage

### C2-20
- **chapitre** : C2
- **theme** : Dosage par étalonnage
- **niveau** : terminale
- **difficulte** : 1
- **recto** : En quoi consiste un dosage par étalonnage ?
- **verso_latex** : `\text{grandeur mesurée sur l'inconnue} \;\longrightarrow\; \text{comparée à une gamme d'étalons de } c_i \text{ connues}`
- **verso_texte** : `Comparer une grandeur physique mesurée sur la solution inconnue à la même grandeur mesurée sur une gamme de solutions étalons de concentrations connues.`
- **piege** : Méthode **non destructive** : l'espèce dosée n'est pas consommée.
- **tags** : dosage, etalonnage, methode

### C2-21
- **chapitre** : C2
- **theme** : Dosage par étalonnage
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Quelle technique et quelle grandeur choisir selon l'espèce à doser ?
- **verso_latex** : `\text{absorbe la lumière} \rightarrow \text{spectrophotométrie},\ A = f(C) \quad ; \quad \text{conduit le courant} \rightarrow \text{conductimétrie},\ \sigma = f(C)`
- **verso_texte** : `Espèce colorée / qui absorbe → spectrophotométrie, on trace A = f(C). Espèce ionique → conductimétrie, on trace σ = f(C).`
- **tags** : dosage, etalonnage, choix-technique

### C2-22
- **chapitre** : C2
- **theme** : Dosage par étalonnage
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Équation de la droite d'étalonnage et détermination de la concentration inconnue ?
- **verso_latex** : `A = k \times C \qquad\Longrightarrow\qquad c_0 = \dfrac{A_0}{k}`
- **verso_texte** : `A = k × C (droite passant par l'origine) ⇒ c₀ = A₀ / k`
- **piege** : Droite **passant par l'origine** (conséquence de Beer-Lambert / Kohlrausch, valable en solution diluée). Si la solution inconnue a été diluée d'un facteur k_dil, remonter : C_commerciale = k_dil × c₀.
- **tags** : dosage, etalonnage, droite, calcul

---

# 5. Chapitre C3 — Oxydoréduction

### C3-01
- **chapitre** : C3
- **theme** : Définitions
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Définitions d'un oxydant, d'un réducteur et d'une réaction d'oxydoréduction ?
- **verso_latex** : `\mathrm{Ox} + n\,e^- = \mathrm{Réd}`
- **verso_texte** : `Oxydant : capte des électrons. Réducteur : cède des électrons. Réaction d'oxydoréduction : transfert d'électrons entre le réducteur d'un couple et l'oxydant d'un autre couple.`
- **piege** : Mnémotechnique : l'oxydant **oxyde** l'autre en **captant** ses électrons ; il est lui-même **réduit**.
- **tags** : oxydoreduction, definitions, couple

### C3-02
- **chapitre** : C3
- **theme** : Méthode
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Les 4 étapes pour écrire une demi-équation électronique (milieu acide) ?
- **verso_latex** : `1)\ \text{élément commun} \;\to\; 2)\ \mathrm{O}\ \text{avec}\ \mathrm{H_2O} \;\to\; 3)\ \mathrm{H}\ \text{avec}\ \mathrm{H^+} \;\to\; 4)\ \text{charges avec}\ e^-`
- **verso_texte** : `1) Conserver l'élément commun au couple (autre que O et H). 2) Conserver O avec H₂O. 3) Conserver H avec H⁺. 4) Conserver la charge avec des e⁻.`
- **piege** : Toujours dans cet ordre. Un électron compte pour une charge −1.
- **tags** : oxydoreduction, demi-equation, methode

### C3-03
- **chapitre** : C3
- **theme** : Demi-équations
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Demi-équation du couple MnO₄⁻ / Mn²⁺ ?
- **verso_latex** : `\mathrm{MnO_4^-} + 8\,\mathrm{H^+} + 5\,e^- = \mathrm{Mn^{2+}} + 4\,\mathrm{H_2O}`
- **verso_texte** : `MnO₄⁻ + 8 H⁺ + 5 e⁻ = Mn²⁺ + 4 H₂O`
- **piege** : Vérification des charges : (−1) + 8(+1) + 5(−1) = +2 = charge de Mn²⁺. ✓
- **tags** : oxydoreduction, demi-equation, permanganate

### C3-04
- **chapitre** : C3
- **theme** : Demi-équations
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Demi-équation du couple I₂ / I⁻ ?
- **verso_latex** : `\mathrm{I_2} + 2\,e^- = 2\,\mathrm{I^-}`
- **verso_texte** : `I₂ + 2 e⁻ = 2 I⁻`
- **tags** : oxydoreduction, demi-equation, diiode

### C3-05
- **chapitre** : C3
- **theme** : Demi-équations
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Demi-équation du couple S₂O₈²⁻ / SO₄²⁻ ?
- **verso_latex** : `\mathrm{S_2O_8^{2-}} + 2\,e^- = 2\,\mathrm{SO_4^{2-}}`
- **verso_texte** : `S₂O₈²⁻ + 2 e⁻ = 2 SO₄²⁻`
- **piege** : Pas besoin de H₂O ni de H⁺ : O et S sont déjà conservés.
- **tags** : oxydoreduction, demi-equation, persulfate

### C3-06
- **chapitre** : C3
- **theme** : Demi-équations
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Demi-équation du couple O₂ / H₂O ?
- **verso_latex** : `\mathrm{O_2} + 4\,\mathrm{H^+} + 4\,e^- = 2\,\mathrm{H_2O}`
- **verso_texte** : `O₂ + 4 H⁺ + 4 e⁻ = 2 H₂O`
- **tags** : oxydoreduction, demi-equation, dioxygene

### C3-07
- **chapitre** : C3
- **theme** : Demi-équations
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Demi-équation du couple H₂O₂ / H₂O ?
- **verso_latex** : `\mathrm{H_2O_2} + 2\,\mathrm{H^+} + 2\,e^- = 2\,\mathrm{H_2O}`
- **verso_texte** : `H₂O₂ + 2 H⁺ + 2 e⁻ = 2 H₂O`
- **piege** : H₂O₂ est amphotère au sens rédox : il appartient aussi au couple O₂/H₂O₂, où il joue le rôle de réducteur.
- **tags** : oxydoreduction, demi-equation, eau-oxygenee

### C3-08
- **chapitre** : C3
- **theme** : Demi-équations
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Demi-équation du couple S₄O₆²⁻ / S₂O₃²⁻ ?
- **verso_latex** : `\mathrm{S_4O_6^{2-}} + 2\,e^- = 2\,\mathrm{S_2O_3^{2-}}`
- **verso_texte** : `S₄O₆²⁻ + 2 e⁻ = 2 S₂O₃²⁻`
- **tags** : oxydoreduction, demi-equation, thiosulfate

### C3-09
- **chapitre** : C3
- **theme** : Demi-équations
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Demi-équation du couple SO₄²⁻ / SO₃²⁻ ?
- **verso_latex** : `\mathrm{SO_4^{2-}} + 2\,\mathrm{H^+} + 2\,e^- = \mathrm{SO_3^{2-}} + \mathrm{H_2O}`
- **verso_texte** : `SO₄²⁻ + 2 H⁺ + 2 e⁻ = SO₃²⁻ + H₂O`
- **tags** : oxydoreduction, demi-equation, sulfate

### C3-10
- **chapitre** : C3
- **theme** : Demi-équations
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Demi-équation du couple Cu²⁺ / Cu ?
- **verso_latex** : `\mathrm{Cu^{2+}} + 2\,e^- = \mathrm{Cu}`
- **verso_texte** : `Cu²⁺ + 2 e⁻ = Cu`
- **tags** : oxydoreduction, demi-equation, cuivre

### C3-11
- **chapitre** : C3
- **theme** : Équations bilan
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Équation de la réaction entre le cuivre métallique et les ions argent ?
- **verso_latex** : `\mathrm{Cu_{(s)}} + 2\,\mathrm{Ag^+_{(aq)}} \rightarrow \mathrm{Cu^{2+}_{(aq)}} + 2\,\mathrm{Ag_{(s)}}`
- **verso_texte** : `Cu(s) + 2 Ag⁺(aq) → Cu²⁺(aq) + 2 Ag(s)`
- **piege** : Couples Cu²⁺/Cu et Ag⁺/Ag. On multiplie la demi-équation de Ag par 2 pour éliminer les électrons.
- **tags** : oxydoreduction, equation-bilan, cuivre, argent

### C3-12
- **chapitre** : C3
- **theme** : Équations bilan
- **niveau** : premiere
- **difficulte** : 3
- **recto** : Équation de la réaction entre les ions fer (II) et les ions permanganate ?
- **verso_latex** : `\mathrm{MnO_4^-} + 5\,\mathrm{Fe^{2+}} + 8\,\mathrm{H^+} \rightarrow \mathrm{Mn^{2+}} + 5\,\mathrm{Fe^{3+}} + 4\,\mathrm{H_2O}`
- **verso_texte** : `MnO₄⁻(aq) + 5 Fe²⁺(aq) + 8 H⁺(aq) → Mn²⁺(aq) + 5 Fe³⁺(aq) + 4 H₂O(l)`
- **piege** : Multiplier Fe²⁺ = Fe³⁺ + e⁻ par 5. Vérification des charges : −1 + 10 + 8 = +17 à gauche ; +2 + 15 = +17 à droite. ✓
- **tags** : oxydoreduction, equation-bilan, permanganate, fer

### C3-13
- **chapitre** : C3
- **theme** : Espèces à connaître
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Six oxydants usuels à connaître (nom → formule) ?
- **verso_latex** : `\mathrm{ClO^-} \;;\; \mathrm{O_2} \;;\; \mathrm{Cl_2} \;;\; \mathrm{I_2} \;;\; \mathrm{H_2O_2} \;;\; \mathrm{MnO_4^-}`
- **verso_texte** : `Eau de Javel : ClO⁻ | Dioxygène : O₂ | Dichlore : Cl₂ | Diiode : I₂ | Eau oxygénée : H₂O₂ | Ion permanganate : MnO₄⁻`
- **tags** : oxydoreduction, culture, oxydants

### C3-14
- **chapitre** : C3
- **theme** : Espèces à connaître
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Trois familles de réducteurs usuels à connaître (nom → formule) ?
- **verso_latex** : `\mathrm{C_6H_8O_6} \;;\; \mathrm{H_2} \;;\; \mathrm{Cu},\ \mathrm{Ag},\ \mathrm{Al},\ \mathrm{Fe}`
- **verso_texte** : `Acide ascorbique (vitamine C) : C₆H₈O₆ | Dihydrogène : H₂ | Métaux : Cu, Ag, Al, Fe…`
- **tags** : oxydoreduction, culture, reducteurs

---

# 6. Cartes de connaissances (non-formules)

> Ces cartes ne contiennent pas de formule : le champ `verso_latex` y est volontairement absent. À traiter comme un deck séparé si tu préfères.

### K-01
- **chapitre** : C1
- **theme** : Brønsted
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Définitions d'un acide et d'une base selon Brønsted ?
- **verso_texte** : `Acide : espèce chimique susceptible de céder un ou plusieurs protons H⁺. Base : espèce chimique susceptible de capter un ou plusieurs protons H⁺.`
- **tags** : brønsted, definitions, cours

### K-02
- **chapitre** : C1
- **theme** : Couples à connaître
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Les couples acide/base du cours à connaître ?
- **verso_texte** : `H₂O/OH⁻ | H₃O⁺/H₂O | RCOOH/RCOO⁻ | CH₃COOH/CH₃COO⁻ | HCl/Cl⁻ | H₂CO₃/HCO₃⁻ | HCO₃⁻/CO₃²⁻ | HNO₃/NO₃⁻ | NH₄⁺/NH₃ | RNH₃⁺/RNH₂ | CH₃NH₃⁺/CH₃NH₂`
- **tags** : couples, memorisation

### K-03
- **chapitre** : C1
- **theme** : Lewis
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Comment reconnaît-on un acide et une base sur un schéma de Lewis ?
- **verso_texte** : `Acide : liaison polarisée entre un H et un atome plus électronégatif (O, N, Cl) → rupture et libération de H⁺. Base : un ou plusieurs doublets non liants sur O ou N → le doublet comble la lacune électronique du H⁺.`
- **tags** : lewis, structure, identification

### K-04
- **chapitre** : C1
- **theme** : Indicateurs colorés
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Zones de virage des trois indicateurs colorés usuels ?
- **verso_texte** : `Hélianthine : rouge (pH<3,0) → jaune (pH>4,5). BBT : jaune (pH<6,0) → vert (6,0–7,6) → bleu (pH>7,6). Phénolphtaléine : incolore (pH<8,2) → rose (pH>10,0).`
- **tags** : indicateurs-colores, pH, memorisation

### K-05
- **chapitre** : C1
- **theme** : pH-mètre
- **niveau** : terminale
- **difficulte** : 1
- **recto** : Précision d'un pH-mètre et procédure préalable à son utilisation ?
- **verso_texte** : `Précision : 0,1 unité de pH (donc tout résultat de pH s'arrondit au dixième). Avant usage : étalonnage avec deux solutions tampons de pH connu.`
- **tags** : pH-metre, mesure, protocole

### K-06
- **chapitre** : C0
- **theme** : Protocole
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Protocole de préparation d'une solution par dissolution ?
- **verso_texte** : `1) Peser le soluté à la balance de précision, l'introduire intégralement dans une fiole jaugée de volume V (rincer coupelle et entonnoir avec le solvant au-dessus de la fiole). 2) Remplir la fiole aux 2/3 de solvant, agiter pour dissoudre. 3) Compléter jusqu'au trait de jauge et homogénéiser.`
- **tags** : protocole, dissolution, TP

### K-07
- **chapitre** : C0
- **theme** : Protocole
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Protocole de préparation d'une solution par dilution ?
- **verso_texte** : `1) Calculer V = C'V'/C. 2) Choisir la verrerie jaugée (pipette jaugée pour V, fiole jaugée pour V'). 3) Prélever V de solution-mère avec la verrerie rincée à l'eau distillée puis à la solution-mère. 4) Introduire dans la fiole jaugée de volume V' rincée à l'eau distillée. 5) Compléter au trait de jauge. 6) Agiter pour homogénéiser.`
- **piege** : La verrerie de prélèvement se rince à la **solution-mère** ; la fiole jaugée, à l'**eau distillée** seulement.
- **tags** : protocole, dilution, TP

### K-08
- **chapitre** : C0
- **theme** : Verrerie
- **niveau** : premiere
- **difficulte** : 1
- **recto** : Verrerie jaugée vs verrerie graduée : laquelle choisir et pourquoi ?
- **verso_texte** : `Jaugée (pipette jaugée, fiole jaugée) : un seul volume, toujours plus précise → à privilégier. Graduée (pipette, burette, éprouvette) : plusieurs volumes, moins précise → si le volume voulu ne correspond à aucune pipette jaugée disponible. Précautions : propipette obligatoire, prélever depuis un bécher jamais depuis le flacon, éviter la parallaxe, lire au bas du ménisque.`
- **tags** : verrerie, TP, precision

### K-09
- **chapitre** : C0
- **theme** : Notations
- **niveau** : premiere
- **difficulte** : 2
- **recto** : Quelles notations de quantité de matière faut-il distinguer, et pourquoi ?
- **verso_texte** : `n(X)apporté (ou initial), n(X)consommé, n(X)formé, n(X)restant. Écrire n(X) sans indice n'a aucun sens suffisamment précis. Seules les quantités consommées et formées entrent dans la relation de proportionnalité stœchiométrique.`
- **tags** : notations, rigueur, avancement

### K-10
- **chapitre** : C2
- **theme** : Spectrophotomètre
- **niveau** : terminale
- **difficulte** : 1
- **recto** : En quoi consiste « faire le blanc » et pourquoi ?
- **verso_texte** : `Régler l'absorbance à zéro avec une cuve contenant le solvant et toutes les espèces sauf celle à étudier (le « blanc » ou solution de référence). Objectif : s'affranchir de la réflexion sur les parois, de l'absorption de la cuve, du solvant et des autres espèces. À refaire à chaque changement de longueur d'onde.`
- **tags** : spectrophotometrie, protocole, blanc

### K-11
- **chapitre** : C2
- **theme** : Spectrophotomètre
- **niveau** : terminale
- **difficulte** : 1
- **recto** : De quoi dépend l'absorbance d'une solution ? (4 facteurs)
- **verso_texte** : `1) La nature de l'espèce chimique absorbante. 2) La longueur d'onde λ. 3) La concentration C. 4) L'épaisseur ℓ de solution traversée.`
- **tags** : absorbance, beer-lambert, cours

### K-12
- **chapitre** : C2
- **theme** : Couleur
- **niveau** : terminale
- **difficulte** : 2
- **recto** : Comment déduit-on la couleur d'une solution de son spectre d'absorbance ?
- **verso_texte** : `On repère λ_max (maximum d'absorption) → couleur absorbée. La couleur perçue est la couleur complémentaire, diamétralement opposée sur le cercle chromatique.`
- **tags** : couleur, cercle-chromatique, UV-visible
