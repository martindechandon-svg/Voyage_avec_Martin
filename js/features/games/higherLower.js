// ===== HIGHER OR LOWER GAME =====
// Fichier: js/features/games/higherLower.js

// Attendre que le DOM soit chargé
(function() {
    'use strict';
    
    // Objet principal du jeu
    const HigherLowerGame = {
        // Variables d'état
        currentCategory: '',
        currentStreak: 0,
        bestRecord: 0,
        leftCountry: null,
        rightCountry: null,
        usedCountries: [],
        currentDisplayCategory: '',
        
        // Afficher le menu des niveaux
        showLevels() {
            document.getElementById('games-menu').style.display = 'none';
            document.getElementById('higher-lower-menu').style.display = 'block';
        },
        
        // Démarrer le jeu
        start(category) {
            // Vérification des dépendances
            if (typeof window.countriesData === 'undefined' || !countriesData) {
                console.error('❌ countriesData non chargé !');
                alert('Erreur : Les données des pays ne sont pas chargées.');
                return;
            }
            
            console.log('✅ Démarrage Higher or Lower - Catégorie:', category);
            console.log('📊 Nombre de pays dans countriesData:', Object.keys(window.countriesData).length);
            
            this.currentCategory = category;
            this.currentStreak = 0;
            this.usedCountries = [];
            
            // Charger le record depuis localStorage
            const recordKey = `hl_record_${category}`;
            this.bestRecord = parseInt(localStorage.getItem(recordKey) || '0');
            
            document.getElementById('higher-lower-menu').style.display = 'none';
            document.getElementById('higher-lower-game').style.display = 'block';
            document.getElementById('higher-lower-end').style.display = 'none';
            
            this.loadNewRound();
        },
        
        // Charger un nouveau tour
        loadNewRound() {
            // 1️⃣ Déterminer la nouvelle catégorie EN PREMIER
            let displayCategory = this.currentCategory;
            if (this.currentCategory === 'random') {
                const categories = ['population', 'surface', 'pib', 'medaillesJO', 'batailles'];
                displayCategory = categories[Math.floor(Math.random() * categories.length)];
            }
            
            // 2️⃣ Sauvegarder la catégorie AVANT de manipuler les pays
            this.currentDisplayCategory = displayCategory;
            
            // 3️⃣ ENSUITE gérer les pays
            if (!this.leftCountry) {
                this.leftCountry = this.getRandomCountry();
            } else {
                this.leftCountry = this.rightCountry;
            }
            
            this.rightCountry = this.getRandomCountry();
            
            // 4️⃣ Vérification de sécurité
            if (!this.leftCountry || !this.rightCountry || 
                !countriesData[this.leftCountry] || !countriesData[this.rightCountry]) {
                console.error('Données manquantes pour', this.leftCountry, 'ou', this.rightCountry);
                this.leftCountry = null;
                this.loadNewRound();
                return;
            }
            
            // 5️⃣ Mettre à jour le score
            document.getElementById('hl-streak').textContent = this.currentStreak;
            document.getElementById('hl-record').textContent = this.bestRecord;
            
            // 6️⃣ Labels des catégories
            const categoryLabels = {
                population: '👥 Population',
                surface: '🗺️ Superficie',
                pib: '💰 PIB',
                medaillesJO: '🥇 Médailles JO',
                batailles: '⚔️ Batailles',
                random: '🎲 Aléatoire'
            };
            
            document.getElementById('hl-category').textContent = categoryLabels[displayCategory];
            
            // 7️⃣ Afficher les pays
            document.getElementById('hl-left-country').textContent = this.leftCountry;
            document.getElementById('hl-right-country').textContent = this.rightCountry;
            
            // 8️⃣ ⚠️ CRUCIAL : Récupérer les valeurs avec la NOUVELLE catégorie
            const leftValue = countriesData[this.leftCountry][displayCategory];
            const rightValue = countriesData[this.rightCountry][displayCategory];
            
            // 9️⃣ Afficher la valeur de gauche
            document.getElementById('hl-left-value').textContent = this.formatValue(leftValue, displayCategory);
            
            // 🔟 Cacher la valeur de droite
            const rightValueEl = document.getElementById('hl-right-value');
            rightValueEl.style.color = 'transparent';
            rightValueEl.style.textShadow = '0 0 20px rgba(255,255,255,0.3)';
            rightValueEl.textContent = '???';
            
            // Réactiver les boutons
            document.getElementById('hl-btn-higher').disabled = false;
            document.getElementById('hl-btn-lower').disabled = false;
            document.getElementById('hl-feedback').style.display = 'none';
        },
        
        // Obtenir un pays aléatoire
        getRandomCountry() {
            const availableCountries = Object.keys(countriesData).filter(c => !this.usedCountries.includes(c));
            
            if (availableCountries.length === 0) {
                this.usedCountries = [];
                return this.getRandomCountry();
            }
            
            const country = availableCountries[Math.floor(Math.random() * availableCountries.length)];
            this.usedCountries.push(country);
            return country;
        },
        
        // Formater les valeurs
        formatValue(value, category) {
            switch(category) {
                case 'population':
                    return (value / 1000000).toFixed(1) + 'M';
                case 'surface':
                    return value.toLocaleString() + ' km²';
                case 'pib':
                    return (value / 1000).toFixed(0) + ' Md$';
                case 'medaillesJO':
                case 'batailles':
                    return value.toLocaleString();
                default:
                    return value;
            }
        },
        
        // Vérifier la réponse
        guess(guess) {
            const category = this.currentDisplayCategory;
            
            const leftValue = countriesData[this.leftCountry][category];
            const rightValue = countriesData[this.rightCountry][category];
            
            const isCorrect = (guess === 'higher' && rightValue >= leftValue) || 
                              (guess === 'lower' && rightValue <= leftValue);
            
            // Afficher la valeur
            const rightValueEl = document.getElementById('hl-right-value');
            rightValueEl.style.color = isCorrect ? '#4CAF50' : '#f44336';
            rightValueEl.style.textShadow = 'none';
            rightValueEl.textContent = this.formatValue(rightValue, category);
            
            // Désactiver les boutons
            document.getElementById('hl-btn-higher').disabled = true;
            document.getElementById('hl-btn-lower').disabled = true;
            
            const feedback = document.getElementById('hl-feedback');
            feedback.style.display = 'block';
            
            if (isCorrect) {
                this.currentStreak++;
                feedback.style.background = 'rgba(76, 175, 80, 0.3)';
                feedback.style.color = '#4CAF50';
                feedback.textContent = '✓ Correct ! Continue...';
                
                if (this.currentStreak > this.bestRecord) {
                    this.bestRecord = this.currentStreak;
                    const recordKey = `hl_record_${this.currentCategory}`;
                    localStorage.setItem(recordKey, this.bestRecord);
                }
                
                setTimeout(() => this.loadNewRound(), 2000);
            } else {
                feedback.style.background = 'rgba(244, 67, 54, 0.3)';
                feedback.style.color = '#f44336';
                feedback.textContent = '✗ Perdu ! Game Over';
                
                setTimeout(() => this.end(), 2000);
            }
        },
        
        // Terminer le jeu
        end() {
            document.getElementById('higher-lower-game').style.display = 'none';
            document.getElementById('higher-lower-end').style.display = 'block';
            
            document.getElementById('hl-final-streak').textContent = this.currentStreak;
            
            const message = document.getElementById('hl-end-message');
            if (this.currentStreak >= 20) {
                message.textContent = '🏆 INCROYABLE ! Tu es un génie de la géographie !';
                message.style.color = '#FFD700';
            } else if (this.currentStreak >= 10) {
                message.textContent = '🌟 Excellent ! Tu connais bien le monde !';
                message.style.color = '#4CAF50';
            } else if (this.currentStreak >= 5) {
                message.textContent = '👍 Pas mal ! Continue à t\'entraîner !';
                message.style.color = '#FF9800';
            } else {
                message.textContent = '💪 C\'est un début ! Réessaie pour battre ton record !';
                message.style.color = '#2196F3';
            }
        },
        
        // Rejouer
        restart() {
            this.leftCountry = null;
            this.start(this.currentCategory);
        }
    };
    
    // Exposer globalement
    window.HigherLowerGame = HigherLowerGame;
    
    // Fonctions globales pour les boutons HTML
    window.showHigherLowerLevels = function() {
        HigherLowerGame.showLevels();
    };
    
    window.startHigherLower = function(category) {
        HigherLowerGame.start(category);
    };
    
    window.guessHigherLower = function(guess) {
        HigherLowerGame.guess(guess);
    };
    
    window.restartHigherLower = function() {
        HigherLowerGame.restart();
    };
    
    console.log('✅ Higher or Lower module chargé');
})();