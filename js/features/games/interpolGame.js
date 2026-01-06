// ===== INTERPOL GAME =====
// Fichier: js/features/games/interpolGame.js

(function() {
    'use strict';
    
    // ===== DATA =====
	const interpolMissions = [
	    {
	        country: "France",
	        clues: [
	            "Détient le record mondial du nombre de fuseaux horaires (12 au total)",
	            "Sa plus longue frontière terrestre est partagée avec le Brésil",
	            "C'est le pays le plus vaste de l'Union Européenne",
	            "Berceau historique de l'invention du cinéma et de la photographie",
	            "Plus grande puissance agricole d'Europe, célèbre pour sa gastronomie et ses vins"
	        ]
	    },
	    {
	        country: "Japon",
	        clues: [
	            "Abrite la plus ancienne entreprise encore en activité au monde (fondée en 578)",
	            "Le relief est occupé à 70% par des montagnes et des forêts",
	            "Archipel composé de 4 îles principales et plus de 6 000 petites îles",
	            "Nation pionnière de la robotique et de la technologie de pointe",
	            "Célèbre pour ses rituels ancestraux, ses samouraïs et ses cerisiers en fleurs"
	        ]
	    },
	    {
	        country: "Brésil",
	        clues: [
	            "Seul pays des Amériques à avoir été le siège d'une monarchie européenne",
	            "Partage une frontière avec presque tous les pays de son continent (sauf deux)",
	            "Détient la plus grande biodiversité végétale et animale de la planète",
	            "Plus grand producteur mondial de café depuis plus d'un siècle",
	            "Territoire abritant le plus grand fleuve du monde par son débit d'eau"
	        ]
	    },
	    {
	        country: "Égypte",
	        clues: [
	            "Considéré comme l'un des plus anciens États-nations de l'humanité",
	            "Sa capitale abrite la plus ancienne université encore active au monde",
	            "Le pays est le plus peuplé du monde arabe",
	            "Contrôle une voie maritime artificielle vitale pour le commerce mondial",
	            "Terre des pharaons dont la vie est rythmée par les crues d'un fleuve mythique"
	        ]
	    },
	    {
	        country: "Australie",
	        clues: [
	            "C'est le pays le plus plat et le plus sec au monde (hors Antarctique)",
	            "Ancienne colonie pénitentiaire britannique devenue une grande puissance",
	            "Abrite une barrière de corail si vaste qu'elle se voit depuis l'espace",
	            "C'est le seul pays qui occupe la totalité d'un continent",
	            "Terre isolée célèbre pour ses espèces animales uniques comme les marsupiaux"
	        ]
	    },
	    {
	        country: "Inde",
	        clues: [
	            "Possède le plus grand réseau ferroviaire de tout le continent asiatique",
	            "Plus grande démocratie du monde en nombre de citoyens votants",
	            "Deuxième pays le plus peuplé de la planète après une récente bascule",
	            "Le plus gros producteur de films au monde (plus de 1500 par an)",
	            "Berceau de grandes religions et de la pratique du yoga"
	        ]
	    },
	    {
	        country: "Canada",
	        clues: [
	            "Possède la plus longue façade maritime (littoral) au monde",
	            "Abrite plus de la moitié des lacs d'eau douce de la planète",
	            "Son nom provient d'un mot indigène signifiant 'le village'",
	            "C'est le deuxième plus vaste pays de la terre après la Russie",
	            "Nation nordique dont l'emblème est une feuille d'arbre et le sport le hockey"
	        ]
	    },
	    {
	        country: "Italie",
	        clues: [
	            "Détient les trois seuls volcans encore actifs d'Europe continentale",
	            "Enclave deux micro-États souverains sur son propre territoire",
	            "Le pays qui possède le plus grand nombre de sites classés à l'UNESCO",
	            "Berceau de la Renaissance artistique et du système bancaire moderne",
	            "Péninsule célèbre en forme de botte plongeant dans la Méditerranée"
	        ]
	    },
	    {
	        country: "Chine",
	        clues: [
	            "Impose un seul fuseau horaire sur tout son territoire malgré sa largeur",
	            "Détient la plus longue frontière terrestre totale (plus de 22 000 km)",
	            "Inventeur historique de la boussole, de la poudre et du papier",
	            "Possède le plus grand réseau de trains à grande vitesse au monde",
	            "Le pays le plus puissant d'Asie, célèbre pour sa 'Grande Muraille'"
	        ]
	    },
	    {
	        country: "Russie",
	        clues: [
	            "Le seul pays au monde dont le territoire est bordé par douze mers",
	            "Contient 20% des réserves d'eau douce non gelée de la planète (Lac Baïkal)",
	            "S'étend sur pas moins de onze fuseaux horaires différents",
	            "Premier pays de l'histoire à avoir envoyé un homme dans l'espace",
	            "C'est, de très loin, le pays le plus vaste de toute la surface terrestre"
	        ]
	    },
	    {
	        country: "Mexique",
	        clues: [
	            "Abrite la plus grande pyramide au monde en termes de volume de base",
	            "Lieu d'origine historique du chocolat, du maïs et du piment",
	            "Le pays compte le plus grand nombre de locuteurs espagnols au monde",
	            "Sa capitale est l'une des villes les plus hautes et peuplées du globe",
	            "Célèbre pour ses civilisations anciennes (Mayas, Aztèques) et ses plages"
	        ]
	    },
	    {
	        country: "Royaume-Uni",
	        clues: [
	            "Le pays n'a pas de constitution écrite sous forme de document unique",
	            "Sa monnaie, la Livre Sterling, est la plus ancienne encore utilisée",
	            "Berceau de la révolution industrielle qui a changé le monde",
	            "Ancienne puissance coloniale dont la langue est devenue universelle",
	            "Nation insulaire composée de quatre nations distinctes sous une couronne"
	        ]
	    },
	    {
	        country: "Allemagne",
	        clues: [
	            "Détient le record européen du nombre de pays limitrophes (neuf)",
	            "Inventeur de l'imprimerie moderne et de la musique classique majeure",
	            "Possède un réseau d'autoroutes célèbre pour l'absence de limites de vitesse",
	            "Première puissance économique et industrielle de l'Europe",
	            "Célèbre pour sa culture de la bière, de la précision et ses châteaux"
	        ]
	    },
	    {
	        country: "Argentine",
	        clues: [
	            "Détient à la fois le point le plus haut et le plus bas de l'hémisphère Sud",
	            "Premier pays à avoir utilisé les empreintes digitales pour une enquête",
	            "Sa pointe sud est le territoire habité le plus proche de l'Antarctique",
	            "Berceau du tango et grand exportateur de viande de bœuf",
	            "Terre de légeries du football et des sommets de la Cordillère des Andes"
	        ]
	    },
	    {
	        country: "Afrique du Sud",
	        clues: [
	            "A volontairement démantelé son propre programme d'armes nucléaires",
	            "Seul pays au monde à posséder officiellement trois capitales",
	            "Possède 11 langues officielles pour représenter sa population",
	            "Ancien pays de l'apartheid devenu la 'Nation Arc-en-ciel'",
	            "Célèbre pour ses safaris, ses mines de diamants et Nelson Mandela"
	        ]
	    },
	    {
	        country: "Espagne",
	        clues: [
	            "Possède le plus grand nombre de vignobles en superficie au monde",
	            "Son hymne national a la particularité de ne pas avoir de paroles",
	            "Seul pays européen à avoir une frontière terrestre directe avec l'Afrique",
	            "Ancien empire ayant dominé les mers et l'Amérique latine",
	            "Célèbre pour sa culture festive, le flamenco et ses îles ensoleillées"
	        ]
	    },
	    {
	        country: "Thaïlande",
	        clues: [
	            "Le nom de sa capitale est le plus long au monde dans sa version complète",
	            "Seul pays d'Asie du Sud-Est à n'avoir jamais été colonisé par l'Occident",
	            "Anciennement connu sous le nom mythique de 'Royaume du Siam'",
	            "Nation bouddhiste comptant plus de 40 000 temples sur son territoire",
	            "Célèbre pour sa cuisine épicée, ses éléphants et ses îles paradisiaques"
	        ]
	    },
	    {
	        country: "Grèce",
	        clues: [
	            "Le pays dont la marine marchande est la première puissance mondiale",
	            "Possède plus de 6 000 îles éparpillées dans plusieurs mers",
	            "Détient le record mondial du nombre de musées archéologiques",
	            "Considéré comme le berceau de la démocratie et de la philosophie",
	            "Terre de la mythologie antique, des dieux de l'Olympe et des JO"
	        ]
	    },
	    {
	        country: "Pérou",
	        clues: [
	            "Lieu d'origine de la pomme de terre (plus de 3 000 variétés)",
	            "Possède le lac navigable le plus élevé de la planète",
	            "Abrite la source la plus lointaine du fleuve Amazone",
	            "Cœur de l'ancien Empire Inca et de ses cités de pierre",
	            "Célèbre pour ses sites archéologiques perchés dans les montagnes"
	        ]
	    },
	    {
	        country: "Maroc",
	        clues: [
	            "Détient la plus ancienne université au monde encore en activité",
	            "Premier pays de l'histoire à avoir reconnu l'indépendance des États-Unis",
	            "Premier producteur et exportateur mondial de phosphate",
	            "Royaume situé au carrefour de l'Afrique, de l'Europe et du monde arabe",
	            "Célèbre pour ses médinas colorées, son thé à la menthe et le Sahara"
	        ]
	    },
	    {
	        country: "Norvège",
	        clues: [
	            "Possède le tunnel routier le plus long du monde (24,5 km)",
	            "Produit presque 100% de son électricité grâce à la force de l'eau",
	            "Détient l'un des fonds souverains les plus riches de la planète",
	            "Royaume scandinave réputé pour sa qualité de vie exceptionnelle",
	            "Célèbre pour ses fjords spectaculaires et ses aurores boréales"
	        ]
	    },
	    {
	        country: "Turquie",
	        clues: [
	            "Sa métropole principale est à cheval sur deux continents différents",
	            "C'est ici qu'ont été frappées les premières pièces de monnaie de l'histoire",
	            "Pont géographique et culturel majeur entre l'Orient et l'Occident",
	            "Ancien siège de l'Empire Ottoman pendant plusieurs siècles",
	            "Célèbre pour ses palais impériaux, ses bazars et ses bains turcs"
	        ]
	    },
	    {
	        country: "Nouvelle-Zélande",
	        clues: [
	            "Premier pays au monde à avoir accordé le droit de vote aux femmes",
	            "Possède la capitale la plus au sud (australe) de la planète",
	            "Le pays compte environ cinq fois plus de moutons que d'humains",
	            "Terre des Maoris et de leurs danses guerrières impressionnantes",
	            "Célèbre pour ses paysages sauvages ayant servi de décor au cinéma"
	        ]
	    },
	    {
	        country: "Pays-Bas",
	        clues: [
	            "Détient le record mondial de la taille moyenne la plus haute chez les humains",
	            "A créé la première bourse et la première multinationale de l'histoire",
	            "Environ un quart de son territoire se trouve sous le niveau de la mer",
	            "Nation de marins et de commerçants célèbre pour sa tolérance sociale",
	            "Pays des tulipes, des moulins à vent et de l'usage massif du vélo"
	        ]
	    },
	    {
	        country: "Suisse",
	        clues: [
	            "Possède assez d'abris atomiques pour loger toute sa population",
	            "Le drapeau national a la particularité rare d'être de forme carrée",
	            "N'est dirigé par aucun président unique, mais par un conseil de 7 membres",
	            "Pays neutre hébergeant de nombreuses organisations internationales",
	            "Réputé pour ses montagnes alpines, son chocolat et son horlogerie"
	        ]
	    },
	    {
	        country: "Indonésie",
	        clues: [
	            "Plus grand État archipel au monde avec plus de 17 000 îles",
	            "Abrite la plus grande population de confession musulmane de la planète",
	            "Seul endroit au monde où l'on trouve le plus grand lézard vivant",
	            "Le pays compte plus de 130 volcans actifs sur sa ceinture de feu",
	            "Nation d'Asie du Sud-Est célèbre pour ses jungles et ses îles aux temples millénaires"
	        ]
	    },
	    {
	        country: "Portugal",
	        clues: [
	            "Détient la plus ancienne frontière d'Europe, inchangée depuis le XIIe siècle",
	            "A établi la première route maritime directe entre l'Europe et l'Orient",
	            "Assure plus de la moitié de la production mondiale de liège",
	            "Premier empire colonial mondial à avoir aboli l'esclavage",
	            "Nation de navigateurs célèbre pour ses azulejos et son chant mélancolique (Fado)"
	        ]
	    },
	    {
	        country: "Corée du Sud",
	        clues: [
	            "A inventé les premiers caractères mobiles en métal bien avant Gutenberg",
	            "Possède l'un des systèmes de recyclage des déchets les plus stricts du globe",
	            "L'éducation y représente la part la plus importante du budget des familles",
	            "Leader mondial de la construction navale et de la haute technologie",
	            "Nation péninsulaire dont la culture pop (musique et séries) s'exporte partout"
	        ]
	    },
	    {
	        country: "Vietnam",
	        clues: [
	            "Abrite la plus grande grotte naturelle du monde (Hang Son Doong)",
	            "Deuxième plus grand exportateur mondial de café au monde",
	            "Le pays a une forme de 'S' étirée sur plus de 1 600 km",
	            "Possède une cuisine réputée pour son équilibre entre les cinq saveurs",
	            "Célèbre pour ses chapeaux coniques et ses rochers émergeant de la mer"
	        ]
	    },
	    {
	        country: "Arabie Saoudite",
	        clues: [
	            "Le plus grand pays au monde à ne posséder aucun fleuve permanent",
	            "Le pays construit actuellement une ville linéaire futuriste géante",
	            "Détient les deux lieux de pèlerinage les plus importants de l'Islam",
	            "Territoire recouvert à 95% par des zones désertiques",
	            "Royaume dont l'économie repose sur d'immenses réserves pétrolières"
	        ]
	    },
	    {
	        country: "Pologne",
	        clues: [
	            "A adopté la toute première constitution moderne d'Europe en 1791",
	            "Détient la plus grande forteresse médiévale en briques au monde",
	            "Le pays a totalement disparu de la carte pendant plus d'un siècle",
	            "Sa capitale a été reconstruite à l'identique après sa destruction totale",
	            "Nation d'Europe centrale située entre la mer Baltique et les Carpates"
	        ]
	    },
	    {
	        country: "Chili",
	        clues: [
	            "Possède le désert le plus aride de la planète (Atacama)",
	            "Premier exportateur mondial de cuivre",
	            "Possède l'un des cieux les plus purs pour l'observation astronomique",
	            "Territoire incluant une île célèbre pour ses géants de pierre (Moaï)",
	            "Le pays le plus long et étroit du monde, coincé entre l'océan et les Andes"
	        ]
	    },
	    {
	        country: "Israël",
	        clues: [
	            "Détient le record mondial de publications scientifiques par habitant",
	            "A ressuscité une langue antique pour en faire sa langue officielle",
	            "Possède le point le plus bas de la surface terrestre émergée",
	            "Nation pionnière dans la cybersécurité et l'irrigation désertique",
	            "Terre où se côtoient les lieux les plus sacrés des trois religions monothéistes"
	        ]
	    },
	    {
	        country: "Singapour",
	        clues: [
	            "Cité-État composée de 63 îles, souvent agrandies artificiellement",
	            "L'un des trois seuls pays au monde sans aucun arrière-pays agricole",
	            "L'importation de chewing-gum y est strictement interdite",
	            "Détient l'un des ports de commerce les plus automatisés de la planète",
	            "Ville-jardin ultra-moderne située à la pointe de la péninsule malaise"
	        ]
	    },
	    {
	        country: "Éthiopie",
	        clues: [
	            "Seul pays d'Afrique à posséder son propre alphabet ancien",
	            "Berceau originel de la plante du café (région de Kaffa)",
	            "Utilise un calendrier de 13 mois avec 7 ans de décalage sur le nôtre",
	            "L'un des rares pays africains à n'avoir jamais été colonisé",
	            "Nation des hauts plateaux de l'Est, surnommée le 'Toit de l'Afrique'"
	        ]
	    },
	    // --- 15 NOUVEAUX PAYS ---
	    {
	        country: "Islande",
	        clues: [
	            "Abrite le plus ancien parlement encore actif au monde (fondé en 930)",
	            "Le pays ne possède aucune force armée permanente ni chemin de fer",
	            "Environ 10% de son territoire est recouvert par des glaciers",
	            "La quasi-totalité de son chauffage provient de la géothermie",
	            "Terre volcanique surnommée 'L'île de glace et de feu'"
	        ]
	    },
	    {
	        country: "Suède",
	        clues: [
	            "Possède le plus grand nombre d'îles au monde (plus de 200 000)",
	            "Premier pays à avoir aboli la censure de la presse en 1766",
	            "Détient le record mondial de brevets déposés par habitant en Europe",
	            "Nation exportatrice de musique pop et de design fonctionnel",
	            "Royaume scandinave célèbre pour ses forêts, ses lacs et ses meubles en kit"
	        ]
	    },
	    {
	        country: "Colombie",
	        clues: [
	            "Le pays possède la plus grande variété d'espèces d'oiseaux au monde",
	            "Seule nation d'Amérique du Sud ayant des côtes sur deux océans",
	            "Premier producteur mondial d'émeraudes de haute qualité",
	            "C'est le deuxième plus grand exportateur de fleurs au monde",
	            "Terre du réalisme magique littéraire, du café doux et de la salsa"
	        ]
	    },
	    {
	        country: "Belgique",
	        clues: [
	            "Possède le réseau ferroviaire le plus dense au monde",
	            "Le pays détient le record du temps passé sans gouvernement officiel",
	            "C'est ici qu'a été inventé l'instrument de musique appelé saxophone",
	            "Siège principal de la plupart des institutions de l'Union Européenne",
	            "Nation célèbre pour ses bandes dessinées, ses frites et son chocolat"
	        ]
	    },
	    {
	        country: "Autriche",
	        clues: [
	            "Le pays est recouvert à plus de 60% par la chaîne des Alpes",
	            "Possède le plus ancien zoo du monde encore ouvert (créé en 1752)",
	            "Berceau de nombreux compositeurs ayant défini la musique classique",
	            "Sa capitale fut longtemps le centre d'un immense empire multiethnique",
	            "Nation célèbre pour sa culture des cafés, ses valses et ses palais baroques"
	        ]
	    },
	    {
	        country: "Kenya",
	        clues: [
	            "Berceau de certains des plus anciens fossiles humains jamais découverts",
	            "Le pays a banni totalement les sacs en plastique avec des peines sévères",
	            "Détient les coureurs de fond les plus titrés de l'histoire de l'athlétisme",
	            "Sa capitale est la seule au monde à avoir un parc national de grands fauves à ses portes",
	            "Destination phare pour les safaris et la culture des peuples Massaï"
	        ]
	    },
	    {
	        country: "Iran",
	        clues: [
	            "Abrite l'une des plus anciennes civilisations continues au monde",
	            "Détient le record de la température de surface la plus élevée (Désert de Lout)",
	            "Possède la plus grande réserve de gaz naturel de la planète",
	            "Héritier de l'art délicat de la miniature et du tissage de tapis légendaires",
	            "Anciennement connu sous le nom d'Empire Perse"
	        ]
	    },
	    {
	        country: "Finlande",
	        clues: [
	            "Régulièrement classé comme le pays le plus heureux du monde",
	            "Possède plus de saunas sur son territoire que de voitures particulières",
	            "Surnommé 'Le pays des mille lacs' (il en possède en réalité 188 000)",
	            "Détient l'un des systèmes éducatifs les plus performants et égalitaires",
	            "Nation nordique où l'on peut observer le soleil de minuit et les aurores"
	        ]
	    },
	    {
	        country: "Danemark",
	        clues: [
	            "Le drapeau national est le plus ancien encore utilisé par un État souverain",
	            "Royaume composé d'une péninsule et de 443 îles nommées",
	            "Plus de 60% de sa surface est dédiée à l'agriculture de pointe",
	            "Possède la souveraineté sur la plus grande île de la planète (le Groenland)",
	            "Terre des contes d'Andersen, des Vikings et des briques de jeu en plastique"
	        ]
	    },
	    {
	        country: "Irlande",
	        clues: [
	            "Le seul pays au monde dont le symbole national est un instrument de musique",
	            "N'abrite aucun serpent à l'état sauvage, une particularité géographique unique",
	            "Détient le plus grand nombre de victoires au concours de l'Eurovision",
	            "Sa population actuelle est toujours inférieure à celle d'avant la famine de 1845",
	            "Surnommée 'L'île Émeraude' en raison de ses paysages verdoyants"
	        ]
	    },
	    {
	        country: "Cuba",
	        clues: [
	            "Le pays possède l'un des taux d'alphabétisation les plus élevés au monde (99%)",
	            "Les voitures des années 50 y circulent encore par milliers pour des raisons historiques",
	            "Détient un système de santé reconnu et exporte ses médecins partout",
	            "C'est la plus grande île des Antilles, située à l'entrée du Golfe du Mexique",
	            "Célèbre pour ses cigares, sa musique rythmée et sa révolution"
	        ]
	    },
	    {
	        country: "Ukraine",
	        clues: [
	            "Abrite la station de métro la plus profonde du monde (105 mètres)",
	            "Possède d'immenses terres fertiles surnommées 'Le grenier à blé de l'Europe'",
	            "C'est le plus grand pays situé entièrement sur le continent européen",
	            "Lieu de l'une des plus graves catastrophes nucléaires du siècle dernier",
	            "Nation célèbre pour ses églises aux dômes dorés et son artisanat d'œufs peints"
	        ]
	    },
	    {
	        country: "Philippines",
	        clues: [
	            "Archipel composé de plus de 7 600 îles au cœur du Pacifique",
	            "Le pays possède la ligne de côte la plus discontinue au monde",
	            "Seule nation d'Asie à être majoritairement de confession catholique",
	            "Détient le record mondial de l'envoi de SMS par habitant",
	            "Célèbre pour ses rizières en terrasses millénaires et ses plages de sable blanc"
	        ]
	    },
	    {
	        country: "Hongrie",
	        clues: [
	            "Le pays possède l'un des plus grands réseaux de grottes thermales au monde",
	            "Le Rubik's Cube et le stylo à bille ont été inventés par des ressortissants de ce pays",
	            "Sa capitale est née de la fusion de deux villes situées de chaque côté d'un fleuve",
	            "Possède le plus grand lac d'Europe centrale (le lac Balaton)",
	            "Nation d'Europe centrale célèbre pour son folklore, son paprika et son architecture"
	        ]
	    },
	    {
	        country: "Malaisie",
	        clues: [
	            "Possède la seule monarchie tournante au monde (le roi change tous les 5 ans)",
	            "Abrite la fleur la plus grande et la plus odorante (Rafflesia) de la planète",
	            "Le pays est divisé en deux parties séparées par plus de 600 km de mer",
	            "Possédait autrefois les tours les plus hautes du monde (toujours les plus hautes tours jumelles)",
	            "Mélange unique de cultures malaise, chinoise et indienne en Asie du Sud-Est"
	        ]
	    }
	];
    
    // ===== VARIABLES DU JEU =====
    let interpolTargetCountry = '';
    let interpolCurrentClues = [];
    let interpolRevealedClues = 0;
    let interpolAttempts = 0;
    let interpolMaxAttempts = 10;
    let interpolDifficulty = 'easy';
    let interpolGameActive = false;
    let interpolAllClues = [];
    let interpolMapCountries = {};
    
    // ===== OBJET PRINCIPAL =====
    const InterpolGame = {
        // Afficher le menu des niveaux
        showLevels() {
            document.getElementById('games-menu').style.display = 'none';
            document.getElementById('interpol-levels-menu').style.display = 'block';
        },
        
        // Démarrer le jeu
        start(difficulty) {
            interpolDifficulty = difficulty;
            interpolGameActive = true;
            
            // Paramètres selon difficulté
            const settings = {
                easy: { clues: 5, attempts: 10 },
                medium: { clues: 4, attempts: 8 },
                hard: { clues: 3, attempts: 5 },
                expert: { clues: 2, attempts: 3 }
            };
            
            const config = settings[difficulty];
            interpolMaxAttempts = config.attempts;
            interpolAttempts = 0;
            interpolRevealedClues = 0;
            
            // Choisir une mission aléatoire
            const mission = interpolMissions[Math.floor(Math.random() * interpolMissions.length)];
            interpolTargetCountry = mission.country;
            
            // Mélanger et limiter les indices
            interpolAllClues = [...mission.clues].sort(() => Math.random() - 0.5).slice(0, config.clues);
            interpolCurrentClues = [];
            
            // Afficher le jeu
            document.getElementById('interpol-levels-menu').style.display = 'none';
            document.getElementById('interpol-game').style.display = 'block';
            
            // Créer le planisphère
            setTimeout(() => {
                this.createMap();
            }, 100);
            
            document.getElementById('interpol-attempts').textContent = interpolAttempts;
            document.getElementById('interpol-max-attempts').textContent = interpolMaxAttempts;
            document.getElementById('interpol-mission').textContent = `Un dangereux criminel s'est enfui ! Il se cache dans un pays mystère. Vous disposez de ${interpolMaxAttempts} tentatives pour le localiser. Révélez des indices et cliquez sur le pays suspect !`;
            document.getElementById('interpol-clues').innerHTML = '<p style="color: #888; font-style: italic;">Aucun indice révélé pour l\'instant...</p>';
            document.getElementById('interpol-next-clue-btn').style.display = 'inline-block';
            document.getElementById('interpol-next-clue-btn').disabled = false;
            document.getElementById('interpol-next-clue-btn').style.background = '#FFD700';
            document.getElementById('interpol-next-clue-btn').textContent = '💡 Révéler un indice';
        },
        
        // Créer la carte interactive
        createMap() {
            const searchInput = document.getElementById('interpol-search');
            const countriesList = document.getElementById('interpol-countries-list');
            
            let currentView = 'continents';
            let selectedContinent = null;
            
            const renderContinents = () => {
                countriesList.innerHTML = '';
                currentView = 'continents';
                
                Object.keys(continents).forEach(continentName => {
                    const continent = continents[continentName];
                    const countryCount = continent.countries.filter(c => countriesData[c]).length;
                    
                    const btn = document.createElement('button');
                    btn.innerHTML = `${continent.emoji} ${continentName}<br><span style="font-size: 11px; opacity: 0.8;">${countryCount} pays</span>`;
                    btn.style.cssText = `
                        padding: 15px 10px;
                        background: rgba(100, 100, 100, 0.4);
                        border: 2px solid #666;
                        border-radius: 8px;
                        color: white;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: bold;
                        transition: all 0.3s;
                        text-align: center;
                    `;
                    
                    btn.addEventListener('mouseenter', () => {
                        btn.style.background = 'rgba(220, 20, 60, 0.6)';
                        btn.style.borderColor = '#DC143C';
                        btn.style.transform = 'scale(1.05)';
                    });
                    
                    btn.addEventListener('mouseleave', () => {
                        btn.style.background = 'rgba(100, 100, 100, 0.4)';
                        btn.style.borderColor = '#666';
                        btn.style.transform = 'scale(1)';
                    });
                    
                    btn.onclick = () => {
                        selectedContinent = continentName;
                        renderCountries(continentName);
                    };
                    
                    countriesList.appendChild(btn);
                });
            };
            
            const renderCountries = (continentName, filter = '') => {
                countriesList.innerHTML = '';
                currentView = 'countries';
                
                // Bouton retour
                const backBtn = document.createElement('button');
                backBtn.innerHTML = '← Retour aux continents';
                backBtn.style.cssText = `
                    grid-column: 1/-1;
                    padding: 12px;
                    background: #555;
                    border: 2px solid #777;
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 10px;
                `;
                backBtn.onclick = renderContinents;
                countriesList.appendChild(backBtn);
                
                // Titre du continent
                const title = document.createElement('div');
                title.style.cssText = 'grid-column: 1/-1; text-align: center; color: #DC143C; font-size: 18px; font-weight: bold; margin-bottom: 10px;';
                title.textContent = `${continents[continentName].emoji} ${continentName}`;
                countriesList.appendChild(title);
                
                // Liste des pays
                const continentCountries = continents[continentName].countries
                    .filter(c => countriesData[c])
                    .filter(c => c.toLowerCase().includes(filter.toLowerCase()))
                    .sort();
                
                continentCountries.forEach(country => {
                    const btn = document.createElement('button');
                    btn.textContent = country;
                    btn.style.cssText = `
                        padding: 15px;
                        background: rgba(100, 100, 100, 0.4);
                        border: 2px solid #666;
                        border-radius: 8px;
                        color: white;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: bold;
                        transition: all 0.3s;
                        text-align: center;
                    `;
                    
                    btn.addEventListener('mouseenter', () => {
                        btn.style.background = 'rgba(220, 20, 60, 0.6)';
                        btn.style.borderColor = '#DC143C';
                        btn.style.transform = 'scale(1.05)';
                    });
                    
                    btn.addEventListener('mouseleave', () => {
                        btn.style.background = 'rgba(100, 100, 100, 0.4)';
                        btn.style.borderColor = '#666';
                        btn.style.transform = 'scale(1)';
                    });
                    
                    btn.onclick = () => {
                        if (interpolGameActive) {
                            this.checkGuess(country);
                        }
                    };
                    
                    countriesList.appendChild(btn);
                });
                
                if (continentCountries.length === 0) {
                    countriesList.innerHTML += '<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 40px;">Aucun pays trouvé...</p>';
                }
            };
            
            // Recherche
            searchInput.addEventListener('input', (e) => {
                const search = e.target.value;
                if (currentView === 'countries' && selectedContinent) {
                    renderCountries(selectedContinent, search);
                }
            });
            
            // Afficher les continents au démarrage
            renderContinents();
        },
        
        // Révéler un indice
        revealNextClue() {
            if (interpolRevealedClues >= interpolAllClues.length) {
                document.getElementById('interpol-next-clue-btn').style.display = 'none';
                return;
            }
            
            interpolCurrentClues.push(interpolAllClues[interpolRevealedClues]);
            interpolRevealedClues++;
            
            const cluesDiv = document.getElementById('interpol-clues');
            cluesDiv.innerHTML = '';
            
            interpolCurrentClues.forEach((clue, index) => {
                const clueEl = document.createElement('div');
                clueEl.style.cssText = 'padding: 12px; background: rgba(255, 215, 0, 0.2); border-left: 3px solid #FFD700; border-radius: 5px; margin-bottom: 10px; animation: slideIn 0.5s;';
                clueEl.innerHTML = `<strong>Indice ${index + 1}:</strong> ${clue}`;
                cluesDiv.appendChild(clueEl);
            });
            
            if (interpolRevealedClues >= interpolAllClues.length) {
                document.getElementById('interpol-next-clue-btn').textContent = '🔒 Tous les indices révélés';
                document.getElementById('interpol-next-clue-btn').disabled = true;
                document.getElementById('interpol-next-clue-btn').style.background = '#666';
            }
        },
        
        // Vérifier la réponse
        checkGuess(guessedCountry) {
            if (!interpolGameActive) return;
            
            interpolAttempts++;
            document.getElementById('interpol-attempts').textContent = interpolAttempts;
            
            const feedback = document.createElement('div');
            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(20, 20, 20, 0.98);
                padding: 40px 60px;
                border-radius: 15px;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                z-index: 2000;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.8);
                animation: popIn 0.3s ease-out;
                min-width: 400px;
            `;
            
            if (guessedCountry === interpolTargetCountry) {
                // VICTOIRE
                interpolGameActive = false;
                feedback.style.border = '3px solid #4CAF50';
                feedback.style.color = '#4CAF50';
                feedback.innerHTML = `
                    <div style="font-size: 60px; margin-bottom: 15px;">🎉</div>
                    <div>CAPTURÉ !</div>
                    <div style="font-size: 18px; margin-top: 15px; color: #ccc;">Vous avez trouvé le fugitif !</div>
                `;
                
                document.body.appendChild(feedback);
                setTimeout(() => {
                    feedback.remove();
                    this.end(true);
                }, 3000);
            } else {
                // Mauvaise réponse
                feedback.style.border = '3px solid #f44336';
                feedback.style.color = '#f44336';
                feedback.innerHTML = `
                    <div style="font-size: 60px; margin-bottom: 15px;">❌</div>
                    <div>Raté !</div>
                    <div style="font-size: 16px; margin-top: 15px; color: #ccc;">Ce n'est pas ${guessedCountry}</div>
                    <div style="font-size: 14px; margin-top: 10px; color: #DC143C;">Tentatives restantes: ${interpolMaxAttempts - interpolAttempts}</div>
                `;
                
                document.body.appendChild(feedback);
                
                if (interpolAttempts >= interpolMaxAttempts) {
                    interpolGameActive = false;
                    setTimeout(() => {
                        feedback.remove();
                        this.end(false);
                    }, 3000);
                } else {
                    setTimeout(() => {
                        feedback.remove();
                    }, 3000);
                }
            }
        },
        
        // Fin du jeu
        async end(won) {
            document.getElementById('interpol-game').style.display = 'none';
            document.getElementById('interpol-end').style.display = 'block';
            
            const icon = document.getElementById('interpol-end-icon');
            const title = document.getElementById('interpol-end-title');
            const message = document.getElementById('interpol-end-message');
            
            if (won) {
                icon.textContent = '🚔';
                title.textContent = 'MISSION RÉUSSIE !';
                title.style.color = '#4CAF50';
                message.innerHTML = `Vous avez capturé le fugitif caché en <strong>${interpolTargetCountry}</strong> en ${interpolAttempts} tentative${interpolAttempts > 1 ? 's' : ''} !<br><br>🎯 Excellent travail, détective !`;
            } else {
                icon.textContent = '💨';
                title.textContent = 'LE FUGITIF S\'EST ÉCHAPPÉ !';
                title.style.color = '#f44336';
                message.innerHTML = `Le criminel était caché en <strong>${interpolTargetCountry}</strong>.<br><br>😔 Il a réussi à fuir... Réessayez pour le capturer !`;
            }
			await saveGameScore('interpol', won ? 1 : 0, interpolDifficulty);
            
            this.destroyMap();
        },
        
        // Détruire la carte
        destroyMap() {
            interpolMapCountries = {};
            interpolGameActive = false;
        },
        
        // Rejouer
        restart() {
            this.start(interpolDifficulty);
        }
    };
	
	async function saveGameScore(gameType, score, difficulty, category = null) {
	    const user = await getCurrentUser();
	    if (!user) return;

	    const { error } = await supabaseClient
	        .from('game_scores')
	        .insert({
	            user_id: user.id,
	            game_type: gameType,
	            score: score,
	            difficulty: difficulty,
	            category: category
	        });

	    if (error) {
	        console.error('Erreur sauvegarde score:', error);
	    }
	}
    
    // Exposer globalement
    window.InterpolGame = InterpolGame;
    
    // Fonctions globales
    window.showInterpolLevels = function() {
        InterpolGame.showLevels();
    };
    
    window.startInterpolGame = function(difficulty) {
        InterpolGame.start(difficulty);
    };
    
    window.revealNextClue = function() {
        InterpolGame.revealNextClue();
    };
    
    window.restartInterpolGame = function() {
        InterpolGame.restart();
    };
    
    window.destroyInterpolMap = function() {
        InterpolGame.destroyMap();
    };
    
    console.log('✅ Interpol Game module chargé');
})();
