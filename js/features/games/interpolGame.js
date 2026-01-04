// ===== INTERPOL GAME =====
// Fichier: js/features/games/interpolGame.js

(function() {
    'use strict';
    
    // ===== DATA =====
    const interpolMissions = [
        {
            country: "France",
            clues: [
                "🍷 Grand producteur de vin",
                "🗼 Possède une tour emblématique de 330m",
                "🇪🇺 Membre fondateur de l'Union Européenne",
                "🥖 Célèbre pour sa baguette",
                "🎨 Abrite le musée du Louvre"
            ]
        },
        {
            country: "Japon",
            clues: [
                "🗻 Mont Fuji culminant à 3776m",
                "🍣 Inventeur des sushis",
                "🌸 Célèbre pour ses cerisiers en fleurs",
                "🤖 Leader mondial en robotique",
                "🏯 Architecture traditionnelle unique"
            ]
        },
        {
            country: "Brésil",
            clues: [
                "⚽ 5 fois champion du monde de football",
                "🌳 Abrite la plus grande forêt tropicale",
                "🎭 Carnaval de Rio mondialement connu",
                "🗿 Statue du Christ Rédempteur",
                "🇧🇷 Plus grand pays d'Amérique du Sud"
            ]
        },
        {
            country: "Égypte",
            clues: [
                "🏜️ Désert du Sahara",
                "🔺 Pyramides de Gizeh",
                "🦁 Sphinx gardien des pyramides",
                "🌊 Traversé par le Nil",
                "📜 Berceau des pharaons"
            ]
        },
        {
            country: "Australie",
            clues: [
                "🦘 Pays des kangourous",
                "🏝️ Plus de 10 000 plages",
                "🎭 Opéra de Sydney iconique",
                "🪃 Inventeur du boomerang",
                "🐨 Habitat naturel du koala"
            ]
        },
        {
            country: "Inde",
            clues: [
                "🕌 Taj Mahal à Agra",
                "🐘 Population importante d'éléphants",
                "🍛 Berceau du curry",
                "🙏 Spiritualité et yoga",
                "👥 Plus de 1,4 milliard d'habitants"
            ]
        },
        {
            country: "Canada",
            clues: [
                "🍁 Feuille d'érable sur le drapeau",
                "🏒 Hockey sur glace sport national",
                "❄️ Climat très froid l'hiver",
                "🗻 Rocheuses canadiennes",
                "🇨🇦 Deuxième plus grand pays du monde"
            ]
        },
        {
            country: "Italie",
            clues: [
                "🍕 Inventeur de la pizza",
                "🏛️ Colisée à Rome",
                "🗼 Tour de Pise penchée",
                "🎨 Renaissance italienne",
                "🇮🇹 Forme de botte"
            ]
        },
        {
            country: "Chine",
            clues: [
                "🏯 Grande Muraille visible de l'espace",
                "🐼 Panda géant endémique",
                "👥 Plus de 1,4 milliard d'habitants",
                "🥡 Inventeur des nouilles",
                "🎎 Cité interdite à Pékin"
            ]
        },
        {
            country: "Russie",
            clues: [
                "❄️ Plus grand pays du monde",
                "🏛️ Place Rouge à Moscou",
                "🚂 Transsibérien mythique",
                "🪆 Poupées russes matriochkas",
                "🐻 Symbole de l'ours brun"
            ]
        },
        {
            country: "Mexique",
            clues: [
                "🌮 Inventeur des tacos",
                "🗿 Pyramides aztèques et mayas",
                "🌶️ Cuisine épicée renommée",
                "💀 Fête des Morts colorée",
                "🏖️ Plages de Cancún"
            ]
        },
        {
            country: "Royaume-Uni",
            clues: [
                "👑 Monarchie constitutionnelle",
                "🏰 Big Ben à Londres",
                "☕ Culture du thé",
                "🚌 Bus rouges à deux étages",
                "🎭 Shakespeare et théâtre"
            ]
        },
        {
            country: "Allemagne",
            clues: [
                "🍺 Oktoberfest à Munich",
                "🏰 Château de Neuschwanstein",
                "🚗 Industrie automobile puissante",
                "🧱 Ancien mur de Berlin",
                "🎼 Beethoven et musique classique"
            ]
        },
        {
            country: "Argentine",
            clues: [
                "💃 Berceau du tango",
                "🥩 Viande de bœuf réputée",
                "⚽ Maradona et Messi",
                "🏔️ Cordillère des Andes",
                "🧊 Glacier Perito Moreno"
            ]
        },
        {
            country: "Afrique du Sud",
            clues: [
                "🦁 Safaris et Big Five",
                "💎 Mines de diamants",
                "🏔️ Table Mountain au Cap",
                "🏉 Champion du monde de rugby",
                "🌍 Nation arc-en-ciel"
            ]
        },
        {
            country: "Espagne",
            clues: [
                "💃 Flamenco et corrida",
                "🏰 Sagrada Familia à Barcelone",
                "🥘 Inventeur de la paella",
                "☀️ Plus de 300 jours de soleil par an",
                "🏖️ Îles Baléares et Canaries"
            ]
        },
        {
            country: "Thaïlande",
            clues: [
                "🐘 Pays aux éléphants sacrés",
                "🛕 Plus de 40 000 temples bouddhistes",
                "🌶️ Cuisine épicée renommée",
                "🏝️ Îles paradisiaques de Phuket",
                "👑 Royaume du Siam"
            ]
        },
        {
            country: "Grèce",
            clues: [
                "🏛️ Berceau de la démocratie",
                "🏺 Mythologie et dieux de l'Olympe",
                "🏝️ Plus de 6000 îles",
                "🫒 Grand producteur d'huile d'olive",
                "⚡ Zeus et Athéna"
            ]
        },
        {
            country: "Pérou",
            clues: [
                "🏔️ Machu Picchu dans les Andes",
                "🦙 Lamas et alpagas",
                "🗿 Civilisation inca",
                "🌊 Lignes de Nazca mystérieuses",
                "🍴 Ceviche traditionnel"
            ]
        },
        {
            country: "Maroc",
            clues: [
                "🕌 Mosquées et médinas",
                "🏜️ Désert du Sahara",
                "🍵 Culture du thé à la menthe",
                "🎨 Artisanat et tapis berbères",
                "🐪 Chameaux et dromadaires"
            ]
        },
        {
            country: "Norvège",
            clues: [
                "🌊 Fjords spectaculaires",
                "🌌 Aurores boréales",
                "⛷️ Ski et sports d'hiver",
                "🐟 Grand exportateur de saumon",
                "👑 Royaume scandinave"
            ]
        },
        {
            country: "Turquie",
            clues: [
                "🕌 Sainte-Sophie à Istanbul",
                "🎈 Montgolfières de Cappadoce",
                "🌉 Pont entre Europe et Asie",
                "🍢 Kebabs et baklava",
                "🛁 Bains turcs hammam"
            ]
        },
        {
            country: "Nouvelle-Zélande",
            clues: [
                "🐑 Plus de moutons que d'habitants",
                "🏔️ Décors du Seigneur des Anneaux",
                "🏉 All Blacks et haka",
                "🌋 Activité géothermique importante",
                "🥝 Kiwi oiseau endémique"
            ]
        },
        {
            country: "Pays-Bas",
            clues: [
                "🌷 Champs de tulipes",
                "🚲 Plus de vélos que d'habitants",
                "🧀 Fromage Gouda et Edam",
                "💨 Moulins à vent emblématiques",
                "🏛️ Amsterdam et ses canaux"
            ]
        },
        {
            country: "Suisse",
            clues: [
                "🏔️ Alpes suisses",
                "🧀 Fondue et raclette",
                "🕐 Horlogerie de précision",
                "🏦 Place financière mondiale",
                "🍫 Chocolat réputé"
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
        end(won) {
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