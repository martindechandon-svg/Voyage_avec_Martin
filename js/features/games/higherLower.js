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
		// Terminer le jeu
		async end() {
		    document.getElementById('higher-lower-game').style.display = 'none';
		    document.getElementById('higher-lower-end').style.display = 'block';
    
		    // Afficher le score actuel
		    document.getElementById('hl-final-streak').textContent = this.currentStreak;
    
		    // Message selon le score
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
    
		    // 🆕 Sauvegarder le score
		    await saveGameScore('higher_lower', this.currentStreak, null, this.currentCategory);
    
		    // 🆕 Afficher les statistiques (ton record + record mondial)
		    await this.displayLeaderboard();
		},

		// 🆕 NOUVELLE FONCTION : Afficher le leaderboard
		async displayLeaderboard() {
		    const statsDiv = document.getElementById('hl-leaderboard');
		    if (!statsDiv) return;

		    const user = await getCurrentUser();

		    if (!user) {
		        statsDiv.innerHTML = `
		            <div style="padding: 15px; background: rgba(255, 152, 0, 0.2); border-radius: 8px; text-align: center; font-size: 14px; color: #FF9800;">
		                🔒 Connecte-toi pour sauvegarder ton score et voir le classement !
		            </div>
		        `;
		        return;
		    }

		    // ✨ AFFICHAGE IMMÉDIAT avec loader
		    statsDiv.innerHTML = `
		        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
		            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(76, 175, 80, 0.2); border-radius: 8px; border-left: 4px solid #4CAF50;">
		                <div>
		                    <div style="font-size: 11px; color: #4CAF50; font-weight: bold; margin-bottom: 4px;">✨ TON RECORD</div>
		                    <div style="font-size: 13px; color: #fff;">Chargement...</div>
		                </div>
		                <div style="font-size: 24px; font-weight: bold; color: #4CAF50;">
		                    ${this.currentStreak}
		                </div>
		            </div>
            
		            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2)); border-radius: 8px; border-left: 4px solid #FFD700;">
		                <div>
		                    <div style="font-size: 11px; color: #FFD700; font-weight: bold; margin-bottom: 4px;">🏆 RECORD MONDIAL</div>
		                    <div style="font-size: 13px; color: #fff;">Chargement...</div>
		                </div>
		                <div style="font-size: 24px; font-weight: bold; color: #FFD700;">
		                    ...
		                </div>
		            </div>
		        </div>
		    `;

		    try {
		        // 🔍 DEBUG : Afficher la catégorie recherchée
		        console.log('🔍 Catégorie actuelle:', this.currentCategory);

				// 🚀 PARALLÉLISER toutes les requêtes en même temps
				const [profileResult, personalBestResult, globalBestResult] = await Promise.all([
				    getUserProfile(),
				    supabaseClient
				        .from('game_scores')
				        .select('score')
				        .eq('user_id', user.id)
				        .eq('game_type', 'higher_lower')
				        .eq('category', this.currentCategory)
				        .order('score', { ascending: false })
				        .limit(1)
				        .maybeSingle(),
				    supabaseClient.rpc('get_world_record', {
				        p_game_type: 'higher_lower',
				        p_category: this.currentCategory
					}).abortSignal(new AbortController().signal)			
				    })
				]);

				// 🔍 DEBUG : Afficher les résultats
				console.log('🔍 Profil:', profileResult);
				console.log('🔍 Meilleur score personnel:', personalBestResult);
				console.log('🔍 Meilleur score mondial:', globalBestResult);

				const currentUsername = profileResult?.username || 'Anonyme';
				const myBestScore = personalBestResult.data?.score || this.currentStreak;

				// ✅ CHANGEMENT ICI : .rpc() retourne un tableau, prendre le premier élément
				const globalBest = globalBestResult.data?.[0];  // ⬅️ AJOUTE [0] ici

				let worldRecordHTML = '';

				if (globalBest) {
				    const championName = globalBest.username || 'Champion';
				    const isYou = globalBest.user_id === user.id;

				    console.log('🔍 Champion:', championName, 'Score:', globalBest.score);
    
				    // ... le reste du code

		            worldRecordHTML = `
		                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2)); border-radius: 8px; border-left: 4px solid #FFD700;">
		                    <div>
		                        <div style="font-size: 11px; color: #FFD700; font-weight: bold; margin-bottom: 4px;">🏆 RECORD MONDIAL</div>
		                        <div style="font-size: 13px; color: #fff;">
		                            ${isYou ? '🎉 C\'EST TOI !' : championName}
		                        </div>
		                    </div>
		                    <div style="font-size: 24px; font-weight: bold; color: #FFD700;">
		                        ${globalBest.score}
		                    </div>
		                </div>
		            `;
		        } else {
		            console.log('⚠️ Aucun record mondial trouvé');
		        }

		        // 🎯 MISE À JOUR FINALE
		        statsDiv.innerHTML = `
		            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
		                <!-- Ton meilleur score -->
		                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(76, 175, 80, 0.2); border-radius: 8px; border-left: 4px solid #4CAF50;">
		                    <div>
		                        <div style="font-size: 11px; color: #4CAF50; font-weight: bold; margin-bottom: 4px;">✨ TON RECORD</div>
		                        <div style="font-size: 13px; color: #fff;">${currentUsername}</div>
		                    </div>
		                    <div style="font-size: 24px; font-weight: bold; color: #4CAF50;">
		                        ${myBestScore}
		                    </div>
		                </div>
                
		                <!-- Record mondial -->
		                ${worldRecordHTML}
		            </div>
		        `;

		    } catch (error) {
		        console.error('❌ Erreur chargement leaderboard:', error);
		        statsDiv.innerHTML = `
		            <div style="padding: 10px; background: rgba(244, 67, 54, 0.2); border-radius: 8px; text-align: center; font-size: 13px; color: #f44336;">
		                ⚠️ Erreur de chargement des statistiques
		            </div>
		        `;
		    }
		},
        
        // Rejouer
        restart() {
            this.leftCountry = null;
            this.start(this.currentCategory);
        }
    };
	
	async function saveGameScore(gameType, score, difficulty, category = null) {
	    const user = await getCurrentUser();
	    if (!user) return;

	    // ✅ Récupérer le username depuis profiles
	    const profile = await getUserProfile();
	    const username = profile?.username || 'Anonyme';

	    const { error } = await supabaseClient
	        .from('game_scores')
	        .insert({
	            user_id: user.id,
	            username: username,  // ✅ AJOUT du username
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
