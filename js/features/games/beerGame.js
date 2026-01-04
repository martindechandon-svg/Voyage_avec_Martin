// ===== BEER GAME =====
// Fichier: js/features/games/beerGame.js

(function() {
    'use strict';
    
    // Objet principal du jeu
    const BeerGame = {
        // Variables d'état
        currentMode: '',
        currentQuestion: 0,
        score: 0,
        currentBrand: '',
        currentCountry: '',
        
        // Afficher le menu des modes
        showLevels() {
            document.getElementById('games-menu').style.display = 'none';
            document.getElementById('beer-levels-menu').style.display = 'block';
        },
        
        // Démarrer le jeu
        start(mode) {
            // Vérification des dépendances
            if (typeof window.beerData === 'undefined' || !beerData) {
                console.error('❌ beerData non chargé !');
                alert('Erreur : Les données des bières ne sont pas chargées.');
                return;
            }
            
            console.log('✅ Démarrage Beer Game - Mode:', mode);
            
            this.currentMode = mode;
            this.currentQuestion = 0;
            this.score = 0;
            
            document.getElementById('beer-levels-menu').style.display = 'none';
            document.getElementById('beer-end').style.display = 'none';
            
            if (mode === 'mixologue') {
                document.getElementById('beer-mixologue-game').style.display = 'block';
                document.getElementById('beer-tour-game').style.display = 'none';
                this.loadMixologueQuestion();
            } else {
                document.getElementById('beer-tour-game').style.display = 'block';
                document.getElementById('beer-mixologue-game').style.display = 'none';
                this.loadTourQuestion();
            }
        },
        
        // ===== MODE MIXOLOGUE =====
        loadMixologueQuestion() {
            if (this.currentQuestion >= 10) {
                this.end();
                return;
            }
            
            document.getElementById('beer-score').textContent = this.currentQuestion;
            document.getElementById('beer-feedback').style.display = 'none';
            
            // Choisir un pays aléatoire
            const countries = Object.keys(window.beerData);
            this.currentCountry = countries[Math.floor(Math.random() * countries.length)];
            const beers = beerData[this.currentCountry].beers;
            this.currentBrand = beers[Math.floor(Math.random() * beers.length)];
            
            document.getElementById('beer-brand').textContent = `🍺 ${this.currentBrand}`;
            
            // Créer une liste de 4 pays (le bon + 3 mauvais)
            const wrongCountries = countries.filter(c => c !== this.currentCountry);
            const selectedWrong = wrongCountries.sort(() => Math.random() - 0.5).slice(0, 3);
            const options = [this.currentCountry, ...selectedWrong].sort(() => Math.random() - 0.5);
            
            // Afficher la liste de 4 pays
            const listEl = document.getElementById('beer-countries-list');
            listEl.innerHTML = '';
            
            options.forEach(country => {
                const btn = document.createElement('button');
                btn.textContent = country;
                btn.style.cssText = 'padding: 12px; background: rgba(100, 100, 100, 0.3); border: 2px solid #666; border-radius: 8px; color: white; cursor: pointer; font-size: 14px; transition: all 0.3s;';
                
                btn.addEventListener('mouseenter', function() {
                    if (!this.disabled) {
                        this.style.background = 'rgba(255, 165, 0, 0.4)';
                        this.style.borderColor = '#FFA500';
                    }
                });
                
                btn.addEventListener('mouseleave', function() {
                    if (!this.disabled && !this.classList.contains('correct') && !this.classList.contains('wrong')) {
                        this.style.background = 'rgba(100, 100, 100, 0.3)';
                        this.style.borderColor = '#666';
                    }
                });
                
                btn.onclick = () => this.checkMixologueAnswer(country, btn);
                listEl.appendChild(btn);
            });
        },
        
        checkMixologueAnswer(selected, button) {
            const allButtons = document.querySelectorAll('#beer-countries-list button');
            allButtons.forEach(btn => btn.disabled = true);
            
            const feedback = document.getElementById('beer-feedback');
            feedback.style.display = 'block';
            
            if (selected === this.currentCountry) {
                this.score++;
                button.style.background = '#4CAF50';
                button.style.borderColor = '#4CAF50';
                feedback.style.background = 'rgba(76, 175, 80, 0.3)';
                feedback.style.color = '#4CAF50';
                feedback.innerHTML = `✓ Correct ! ${beerData[this.currentCountry].anecdote}`;
            } else {
                button.style.background = '#f44336';
                button.style.borderColor = '#f44336';
                
                allButtons.forEach(btn => {
                    if (btn.textContent === this.currentCountry) {
                        btn.style.background = '#4CAF50';
                        btn.style.borderColor = '#4CAF50';
                    }
                });
                
                feedback.style.background = 'rgba(244, 67, 54, 0.3)';
                feedback.style.color = '#f44336';
                feedback.innerHTML = `✗ Incorrect ! C'était ${this.currentCountry}. ${beerData[this.currentCountry].anecdote}`;
            }
            
            this.currentQuestion++;
            setTimeout(() => this.loadMixologueQuestion(), 3000);
        },
        
        // ===== MODE TOUR DU MONDE =====
        loadTourQuestion() {
            if (this.currentQuestion >= 10) {
                this.end();
                return;
            }
            
            document.getElementById('beer-tour-score').textContent = this.currentQuestion;
            document.getElementById('beer-tour-feedback').style.display = 'none';
            
            const countries = Object.keys(beerData);
            this.currentCountry = countries[Math.floor(Math.random() * countries.length)];
            const correctBeers = beerData[this.currentCountry].beers;
            const correctBeer = correctBeers[Math.floor(Math.random() * correctBeers.length)];
            
            document.getElementById('beer-tour-country').textContent = `🌍 ${this.currentCountry}`;
            
            // Générer 3 mauvaises réponses
            const wrongBeers = [];
            while (wrongBeers.length < 3) {
                const randomCountry = countries[Math.floor(Math.random() * countries.length)];
                if (randomCountry !== this.currentCountry) {
                    const randomBeer = beerData[randomCountry].beers[Math.floor(Math.random() * beerData[randomCountry].beers.length)];
                    if (!wrongBeers.includes(randomBeer) && randomBeer !== correctBeer) {
                        wrongBeers.push(randomBeer);
                    }
                }
            }
            
            const options = [correctBeer, ...wrongBeers].sort(() => Math.random() - 0.5);
            
            const optionsEl = document.getElementById('beer-tour-options');
            optionsEl.innerHTML = '';
            
            options.forEach(beer => {
                const btn = document.createElement('button');
                btn.textContent = beer;
                btn.style.cssText = 'padding: 20px; background: rgba(100, 100, 100, 0.3); border: 2px solid #666; border-radius: 10px; color: white; cursor: pointer; font-size: 16px; font-weight: bold; transition: all 0.3s;';
                
                btn.addEventListener('mouseenter', function() {
                    if (!this.disabled) {
                        this.style.background = 'rgba(255, 165, 0, 0.4)';
                        this.style.borderColor = '#FFA500';
                    }
                });
                
                btn.addEventListener('mouseleave', function() {
                    if (!this.disabled && !this.classList.contains('correct') && !this.classList.contains('wrong')) {
                        this.style.background = 'rgba(100, 100, 100, 0.3)';
                        this.style.borderColor = '#666';
                    }
                });
                
                btn.onclick = () => this.checkTourAnswer(beer, correctBeer, btn);
                optionsEl.appendChild(btn);
            });
        },
        
        checkTourAnswer(selected, correct, button) {
            const allButtons = document.querySelectorAll('#beer-tour-options button');
            allButtons.forEach(btn => btn.disabled = true);
            
            const feedback = document.getElementById('beer-tour-feedback');
            feedback.style.display = 'block';
            
            if (selected === correct) {
                this.score++;
                button.style.background = '#4CAF50';
                button.style.borderColor = '#4CAF50';
                feedback.style.background = 'rgba(76, 175, 80, 0.3)';
                feedback.style.color = '#4CAF50';
                feedback.innerHTML = `✓ Exact ! ${beerData[this.currentCountry].anecdote}`;
            } else {
                button.style.background = '#f44336';
                button.style.borderColor = '#f44336';
                
                allButtons.forEach(btn => {
                    if (btn.textContent === correct) {
                        btn.style.background = '#4CAF50';
                        btn.style.borderColor = '#4CAF50';
                    }
                });
                
                feedback.style.background = 'rgba(244, 67, 54, 0.3)';
                feedback.style.color = '#f44336';
                feedback.innerHTML = `✗ Raté ! C'était ${correct}. ${beerData[this.currentCountry].anecdote}`;
            }
            
            this.currentQuestion++;
            setTimeout(() => this.loadTourQuestion(), 3000);
        },
        
        // ===== FIN DU JEU =====
        end() {
            document.getElementById('beer-mixologue-game').style.display = 'none';
            document.getElementById('beer-tour-game').style.display = 'none';
            document.getElementById('beer-end').style.display = 'block';
            
            document.getElementById('beer-final-score').textContent = this.score;
            
            const message = document.getElementById('beer-end-message');
            if (this.score === 10) {
                message.textContent = '🍻 PARFAIT ! Tu es un véritable expert en bières du monde !';
                message.style.color = '#FFD700';
            } else if (this.score >= 7) {
                message.textContent = '🌟 Excellent ! Tu connais bien tes bières !';
                message.style.color = '#4CAF50';
            } else if (this.score >= 5) {
                message.textContent = '😊 Pas mal ! Continue à explorer !';
                message.style.color = '#FF9800';
            } else {
                message.textContent = '💪 C\'est un début ! Voyage plus pour découvrir de nouvelles bières !';
                message.style.color = '#2196F3';
            }
        },
        
        // Rejouer
        restart() {
            this.currentQuestion = 0;
            this.start(this.currentMode);
        }
    };
    
    // Exposer globalement
    window.BeerGame = BeerGame;
    
    // Fonctions globales pour les boutons HTML
    window.showBeerLevels = function() {
        BeerGame.showLevels();
    };
    
    window.startBeerGame = function(mode) {
        BeerGame.start(mode);
    };
    
    window.restartBeerGame = function() {
        BeerGame.restart();
    };
    
    console.log('✅ Beer Game module chargé');
})();