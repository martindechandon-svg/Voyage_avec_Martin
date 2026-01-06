// ===== INTERPOL GAME =====
// Fichier: js/features/games/interpolGame.js

(function() {
    'use strict';
    
    // ===== DATA =====
	const interpolMissions = [
	    {
	        country: "France",
	        clues: [
	            "Détient le record mondial du nombre de fuseaux horaires",
	            "Premier pays à avoir instauré un système de numérotation des maisons",
	            "Sa frontière terrestre la plus longue est partagée avec le Brésil",
	            "Berceau de l'invention du cinéma et de la photographie",
	            "Son territoire est bordé par trois mers et un océan"
	        ]
	    },
	    {
	        country: "Japon",
	        clues: [
	            "Le plus ancien empire encore en exercice au monde",
	            "Archipel composé de plus de 6 800 îles",
	            "Possède la plus forte densité de distributeurs automatiques par habitant",
	            "Abrite l'entreprise la plus vieille du monde (fondée en 578)",
	            "Le relief est occupé à 70% par des montagnes et des forêts"
	        ]
	    },
	    {
	        country: "Brésil",
	        clues: [
	            "Seul pays des Amériques à avoir été le siège d'une monarchie européenne",
	            "Détient la plus grande communauté japonaise hors du Japon",
	            "Frontalier de tous les pays d'Amérique du Sud, sauf deux",
	            "Premier producteur mondial de café depuis plus de 150 ans",
	            "Sa côte atlantique s'étend sur plus de 7 400 km"
	        ]
	    },
	    {
	        country: "Égypte",
	        clues: [
	            "Le pays le plus peuplé du monde arabe",
	            "Considéré comme l'un des premiers États-nations de l'histoire",
	            "Sa capitale abrite la plus ancienne université encore active au monde",
	            "Le secteur agricole dépend presque exclusivement d'un seul cours d'eau",
	            "Contrôle l'un des points de passage maritimes les plus stratégiques du globe"
	        ]
	    },
	    {
	        country: "Australie",
	        clues: [
	            "Le pays le plus plat et le plus sec du monde (hors Antarctique)",
	            "Possède une barrière de corail visible depuis l'espace",
	            "L'un des rares pays où la majorité de la population vit sur les côtes",
	            "Détient les plus grandes réserves d'uranium au monde",
	            "Ancienne colonie pénitentiaire devenue une puissance du Commonwealth"
	        ]
	    },
	    {
	        country: "Inde",
	        clues: [
	            "Plus grande démocratie du monde en nombre de votants",
	            "Berceau de quatre des plus grandes religions mondiales",
	            "Possède le plus grand réseau ferroviaire d'Asie",
	            "Le plus grand producteur de films au monde en volume annuel",
	            "Premier pays à avoir extrait et utilisé des diamants dès l'Antiquité"
	        ]
	    },
	    {
	        country: "Canada",
	        clues: [
	            "Possède la plus longue façade maritime au monde",
	            "Abrite plus de la moitié des lacs d'eau douce de la planète",
	            "Détient le record du nombre de parcs nationaux en zone arctique",
	            "Le pays possède plus de 3 millions de lacs",
	            "Son nom provient d'un mot indigène signifiant 'le village'"
	        ]
	    },
	    {
	        country: "Italie",
	        clues: [
	            "Le pays qui compte le plus grand nombre de sites inscrits à l'UNESCO",
	            "Enclave deux micro-États souverains sur son propre territoire",
	            "Détient les trois seuls volcans actifs d'Europe continentale",
	            "Berceau du système bancaire moderne à la Renaissance",
	            "Plus grand producteur de vin au monde en volume"
	        ]
	    },
	    {
	        country: "Chine",
	        clues: [
	            "Utilise un seul fuseau horaire malgré sa largeur géographique",
	            "Détient la plus longue frontière terrestre totale au monde",
	            "Inventeur de la boussole, de la poudre à canon et du papier",
	            "Le pays possède le plus grand réseau de trains à grande vitesse",
	            "Sa langue principale est la plus parlée au monde en locuteurs natifs"
	        ]
	    },
	    {
	        country: "Russie",
	        clues: [
	            "Le seul pays au monde bordé par douze mers",
	            "Contient 20% des réserves d'eau douce non gelée de la planète",
	            "Possède une forêt boréale plus vaste que l'Amazonie",
	            "A effectué le premier vol spatial habité de l'histoire",
	            "S'étend sur onze fuseaux horaires différents"
	        ]
	    },
	    {
	        country: "Mexique",
	        clues: [
	            "Le pays qui compte le plus grand nombre de locuteurs hispanophones",
	            "C'est ici que se trouve le plus petit volcan du monde (13m)",
	            "C'est le lieu d'origine du chocolat et du maïs",
	            "Sa capitale est construite sur les ruines d'une cité lacustre",
	            "Possède la plus grande pyramide au monde en termes de volume de base"
	        ]
	    },
	    {
	        country: "Royaume-Uni",
	        clues: [
	            "Le pays n'a pas de constitution écrite unique",
	            "L'anglais n'y est pas officiellement la langue d'État par la loi",
	            "C'est ici qu'est née la révolution industrielle",
	            "Sa monnaie est la plus ancienne encore en circulation",
	            "Possède un tunnel ferroviaire sous-marin le reliant au continent"
	        ]
	    },
	    {
	        country: "Allemagne",
	        clues: [
	            "Détient le record européen du nombre de pays frontaliers (neuf)",
	            "Inventeur de l'imprimerie à caractères mobiles",
	            "Certaines de ses autoroutes n'ont pas de limitation de vitesse globale",
	            "Plus grande économie de l'Union Européenne",
	            "Possède une tradition de jardins ouvriers très réglementée"
	        ]
	    },
	    {
	        country: "Argentine",
	        clues: [
	            "Détient le point le plus haut et le point le plus bas de l'hémisphère Sud",
	            "A eu cinq présidents en seulement deux semaines en 2001",
	            "Possède la plus large avenue du monde (140 mètres de large)",
	            "Premier pays à avoir utilisé les empreintes digitales pour une enquête",
	            "Sa partie sud est la région habitée la plus proche de l'Antarctique"
	        ]
	    },
	    {
	        country: "Afrique du Sud",
	        clues: [
	            "Seul pays au monde à posséder trois capitales différentes",
	            "A volontairement démantelé son propre programme d'armes nucléaires",
	            "Possède 11 langues officielles pour représenter sa diversité",
	            "Abrite les plus vieux restes fossilisés d'hominidés",
	            "Détient l'une des flores les plus riches de la planète (fynbos)"
	        ]
	    },
	    {
	        country: "Espagne",
	        clues: [
	            "Seul pays d'Europe à avoir une frontière physique avec un pays d'Afrique",
	            "L'hymne national n'a pas de paroles officielles",
	            "Possède le plus grand nombre de vignobles en termes de superficie",
	            "Le pays est le leader mondial de la transplantation d'organes",
	            "Deuxième pays le plus montagneux d'Europe après la Suisse"
	        ]
	    },
	    {
	        country: "Thaïlande",
	        clues: [
	            "Seul pays d'Asie du Sud-Est à n'avoir jamais été colonisé par l'Occident",
	            "Le nom de sa capitale est l'un des plus longs au monde",
	            "Considère la tête comme sacrée et les pieds comme impurs",
	            "Détient le record mondial du plus grand nombre d'espèces de chauves-souris",
	            "Anciennement connu sous le nom de Royaume de Rattanakosin"
	        ]
	    },
	    {
	        country: "Grèce",
	        clues: [
	            "Le pays dont la marine marchande est la première mondiale",
	            "Plus de 80% de son territoire est constitué de montagnes",
	            "Le pays n'a aucun fleuve navigable en raison du relief",
	            "Détient le record du nombre de musées archéologiques au monde",
	            "Son drapeau comporte 9 bandes représentant les syllabes de la liberté"
	        ]
	    },
	    {
	        country: "Pérou",
	        clues: [
	            "Lieu d'origine de la pomme de terre (plus de 3 000 variétés)",
	            "Abrite la source la plus lointaine du fleuve Amazone",
	            "Possède le lac navigable le plus haut du monde",
	            "Détient l'une des cités de terre les plus grandes de l'histoire (Chan Chan)",
	            "Son territoire comprend 84 des 104 zones climatiques existantes"
	        ]
	    },
	    {
	        country: "Maroc",
	        clues: [
	            "Détient la plus ancienne université au monde encore en activité",
	            "Premier pays à avoir reconnu l'indépendance des États-Unis en 1777",
	            "Le plus grand producteur mondial de phosphate",
	            "Possède le point culminant de l'Afrique du Nord",
	            "L'arabe et l'amazigh sont ses deux langues officielles"
	        ]
	    },
	    {
	        country: "Norvège",
	        clues: [
	            "Possède le tunnel routier le plus long du monde (24,5 km)",
	            "A introduit le sushi au saumon au Japon dans les années 80",
	            "Le pays produit presque 100% de son électricité grâce à l'hydroélectricité",
	            "Détient la plus grande réserve souveraine d'argent au monde",
	            "A offert le prix Nobel de la paix comme institution nationale"
	        ]
	    },
	    {
	        country: "Turquie",
	        clues: [
	            "Sa plus grande ville s'étend sur deux plaques tectoniques et deux continents",
	            "Le pays a introduit les tulipes en Europe au XVIe siècle",
	            "Abrite l'un des plus anciens et plus grands marchés couverts au monde",
	            "C'est ici qu'ont été frappées les premières pièces de monnaie (Lydie)",
	            "Le siège de sept églises de l'Apocalypse se trouve sur son territoire"
	        ]
	    },
	    {
	        country: "Nouvelle-Zélande",
	        clues: [
	            "Premier pays au monde à avoir accordé le droit de vote aux femmes",
	            "Le pays possède le nom de lieu le plus long du monde (85 lettres)",
	            "Il n'y a aucun serpent indigène sur tout le territoire",
	            "Possède la capitale la plus australe de la planète",
	            "L'un des deux seuls pays au monde à posséder deux hymnes nationaux"
	        ]
	    },
	    {
	        country: "Pays-Bas",
	        clues: [
	            "Environ 26% du territoire se situe en dessous du niveau de la mer",
	            "Premier pays au monde à avoir légalisé le mariage homosexuel",
	            "Le pays possède la plus forte densité de population d'Europe (hors micro-États)",
	            "Détient le record mondial de la taille moyenne des habitants",
	            "A créé la première multinationale et la première bourse au monde"
	        ]
	    },
	    {
	        country: "Suisse",
	        clues: [
	            "Le pays possède assez d'abris nucléaires pour loger toute sa population",
	            "Le drapeau national est l'un des deux seuls au monde à être carré",
	            "N'a pas de chef d'État unique, mais un conseil de sept membres",
	            "Le pays est neutre depuis 1815 et n'a pas connu de guerre depuis",
	            "Possède quatre langues nationales officielles"
	        ]
	    },
	    // --- NOUVEAUX PAYS ---
	    {
	        country: "Indonésie",
	        clues: [
	            "Plus grand État archipel du monde avec plus de 17 000 îles",
	            "Abrite la plus grande population musulmane de la planète",
	            "Seul endroit au monde où l'on trouve des dragons de Komodo à l'état sauvage",
	            "Contient la plus grande structure bouddhiste au monde (Borobudur)",
	            "Le pays compte plus de 130 volcans actifs"
	        ]
	    },
	    {
	        country: "Portugal",
	        clues: [
	            "A établi la première route maritime directe entre l'Europe et l'Asie",
	            "Premier empire colonial mondial à avoir aboli l'esclavage",
	            "Le pays produit 50% de la consommation mondiale de liège",
	            "Détient la plus ancienne frontière d'Europe (inchangée depuis 1139)",
	            "Ses explorateurs ont été les premiers Européens à atteindre le Japon"
	        ]
	    },
	    {
	        country: "Corée du Sud",
	        clues: [
	            "Le pays possède la vitesse internet moyenne la plus élevée au monde",
	            "Possède le système de recyclage des déchets le plus efficace du globe",
	            "Le port du masque y était une norme sociale bien avant les pandémies",
	            "L'éducation y occupe la part la plus importante du budget des familles",
	            "A inventé le premier caractère mobile en métal (avant l'imprimerie européenne)"
	        ]
	    },
	    {
	        country: "Vietnam",
	        clues: [
	            "Deuxième exportateur mondial de café après le Brésil",
	            "Abrite la plus grande grotte naturelle du monde",
	            "Le pays a une forme de 'S' étirée sur plus de 1 600 km",
	            "Possède un taux d'alphabétisation parmi les plus hauts d'Asie du Sud-Est",
	            "Réputé pour ses formations karstiques émergent de la mer"
	        ]
	    },
	    {
	        country: "Arabie Saoudite",
	        clues: [
	            "Le plus grand pays au monde à ne posséder aucun fleuve permanent",
	            "Détient les deux lieux les plus saints de l'Islam",
	            "Son économie repose sur les plus grandes réserves de pétrole conventionnel",
	            "Le pays construit actuellement une ville linéaire de 170 km de long",
	            "Territoire occupé à 95% par des zones désertiques ou semi-désertiques"
	        ]
	    },
	    {
	        country: "Pologne",
	        clues: [
	            "A adopté la première constitution moderne d'Europe en 1791",
	            "Détient la plus grande forteresse médiévale en briques au monde",
	            "Le pays a disparu de la carte du monde pendant 123 ans",
	            "Plus de 90% de son territoire est situé à moins de 300m d'altitude",
	            "Sa capitale a été reconstruite à l'identique après une destruction totale"
	        ]
	    },
	    {
	        country: "Chili",
	        clues: [
	            "Le pays le plus long et le plus étroit du monde",
	            "Possède le désert le plus aride de la planète (Atacama)",
	            "Territoire incluant une île célèbre pour ses statues monolithiques",
	            "Premier exportateur mondial de cuivre",
	            "Possède l'un des cieux les plus clairs pour l'observation astronomique"
	        ]
	    },
	    {
	        country: "Israël",
	        clues: [
	            "Seul pays au monde à être entré dans le XXIe siècle avec un gain net d'arbres",
	            "Détient le record mondial de publications scientifiques par habitant",
	            "Possède le point le plus bas de la surface terrestre émergée",
	            "A ressuscité une langue morte pour en faire sa langue officielle",
	            "Berceau des technologies de pointe en matière d'irrigation goutte-à-goutte"
	        ]
	    },
	    {
	        country: "Singapour",
	        clues: [
	            "Cité-État composée de 63 îles, la plupart artificielles",
	            "L'un des trois seuls pays au monde sans arrière-pays agricole",
	            "L'importation et la vente de chewing-gum y sont interdites",
	            "Possède le jardin botanique le plus visité et le plus riche d'Asie",
	            "Détient l'un des passeports les plus puissants du monde"
	        ]
	    },
	    {
	        country: "Éthiopie",
	        clues: [
	            "Seul pays d'Afrique à avoir un alphabet propre et ancien",
	            "Utilise un calendrier de 13 mois qui a 7 ans de retard sur le nôtre",
	            "Berceau originel de la plante du café (région de Kaffa)",
	            "L'un des rares pays africains à n'avoir jamais été colonisé",
	            "Possède le plus grand nombre de sites UNESCO en Afrique"
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
