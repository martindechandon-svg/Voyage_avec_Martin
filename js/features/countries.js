// ===== COUNTRIES FEATURE =====
// Fichier: js/features/countries.js

(function() {
    'use strict';
    
    const CountriesManager = {
        visitedCountries: {},
        currentRating: 0,
        selectedCountry: null,
        
        // Charger les données
        loadData() {
            const saved = localStorage.getItem('travelData');
            if (saved) {
                this.visitedCountries = JSON.parse(saved);
            }
        },
        
        // Sauvegarder les données
        saveData() {
            localStorage.setItem('travelData', JSON.stringify(this.visitedCountries));
        },
        
        // Initialiser la liste des continents
        initContinentsList() {
            const container = document.getElementById('continents-list');
            
            Object.keys(continents).forEach(continentName => {
                const continent = continents[continentName];
                const section = document.createElement('div');
                section.className = 'continent-section';
                
                const header = document.createElement('div');
                header.className = 'continent-header';
                
                const nameDiv = document.createElement('div');
                nameDiv.className = 'continent-name';
                nameDiv.innerHTML = `<span class="arrow">▶</span> ${continent.emoji} ${continentName}`;
                
                const stats = document.createElement('div');
                stats.className = 'continent-stats';
                const visited = continent.countries.filter(c => this.visitedCountries[c]).length;
                const total = continent.countries.length;
                stats.textContent = `${visited}/${total}`;
                
                header.appendChild(nameDiv);
                header.appendChild(stats);
                
                const countriesDiv = document.createElement('div');
                countriesDiv.className = 'continent-countries';
                
                const sortedCountries = continent.countries.sort();
                sortedCountries.forEach(countryName => {
                    const item = this.createCountryItem(countryName);
                    countriesDiv.appendChild(item);
                });
                
                header.addEventListener('click', () => {
                    countriesDiv.classList.toggle('open');
                    header.querySelector('.arrow').classList.toggle('open');
                });
                
                section.appendChild(header);
                section.appendChild(countriesDiv);
                container.appendChild(section);
            });
            
            this.updateStats();
        },
        
        // Créer un élément de pays
        createCountryItem(countryName) {
            const item = document.createElement('div');
            item.className = 'country-item';
            if (this.visitedCountries[countryName]) {
                item.classList.add('visited');
            }
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'country-checkbox';
            checkbox.checked = !!this.visitedCountries[countryName];
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation();
                this.toggleCountry(countryName, e.target.checked);
            });
            
            const name = document.createElement('span');
            name.className = 'country-name';
            name.textContent = countryName;
            
            const rating = document.createElement('span');
            rating.className = 'country-rating';
            if (this.visitedCountries[countryName] && this.visitedCountries[countryName].rating) {
                rating.textContent = '⭐'.repeat(this.visitedCountries[countryName].rating);
            }
            
            item.appendChild(checkbox);
            item.appendChild(name);
            item.appendChild(rating);
            
            item.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    this.openModal(countryName);
                }
            });
            
            return item;
        },
        
        // Basculer l'état d'un pays
        toggleCountry(countryName, isVisited) {
            if (isVisited) {
                if (!this.visitedCountries[countryName]) {
                    this.visitedCountries[countryName] = {
                        visited: true,
                        notes: '',
                        rating: 0,
                        date: new Date().toISOString(),
                        photos: [],
                        budget: 0,
                        activities: {
                            plage: false,
                            montagne: false,
                            musees: false,
                            gastronomie: false,
                            nightlife: false,
                            shopping: false,
                            nature: false,
                            aventure: false
                        },
                        companions: []
                    };
                }
            } else {
                delete this.visitedCountries[countryName];
            }
            
            this.saveData();
            window.GlobeManager.updateGlobeColors();
            this.updateCountryItem(countryName);
            this.updateAllContinentStats();
            this.updateStats();
        },
        
        // Mettre à jour l'affichage d'un pays
        updateCountryItem(countryName) {
            const items = document.querySelectorAll('.country-item');
            items.forEach(item => {
                const name = item.querySelector('.country-name').textContent;
                if (name === countryName) {
                    const checkbox = item.querySelector('.country-checkbox');
                    const rating = item.querySelector('.country-rating');
                    
                    if (this.visitedCountries[countryName]) {
                        item.classList.add('visited');
                        checkbox.checked = true;
                        if (this.visitedCountries[countryName].rating) {
                            rating.textContent = '⭐'.repeat(this.visitedCountries[countryName].rating);
                        } else {
                            rating.textContent = '';
                        }
                    } else {
                        item.classList.remove('visited');
                        checkbox.checked = false;
                        rating.textContent = '';
                    }
                }
            });
        },
        
        // Mettre à jour les statistiques de tous les continents
        updateAllContinentStats() {
            const headers = document.querySelectorAll('.continent-header');
            headers.forEach((header, index) => {
                const continentName = Object.keys(continents)[index];
                const continent = continents[continentName];
                const visited = continent.countries.filter(c => this.visitedCountries[c]).length;
                const total = continent.countries.length;
                header.querySelector('.continent-stats').textContent = `${visited}/${total}`;
            });
        },
        
        // Mettre à jour les statistiques globales
        updateStats() {
            let visitedCount = 0;
            let totalCount = 0;
            let totalRating = 0;
            let ratedCount = 0;
            let lastVisit = null;
            let lastCountry = null;
            
            Object.values(continents).forEach(continent => {
                totalCount += continent.countries.length;
                continent.countries.forEach(country => {
                    if (this.visitedCountries[country]) {
                        visitedCount++;
                        if (this.visitedCountries[country].rating > 0) {
                            totalRating += this.visitedCountries[country].rating;
                            ratedCount++;
                        }
                        const visitDate = new Date(this.visitedCountries[country].date);
                        if (!lastVisit || visitDate > lastVisit) {
                            lastVisit = visitDate;
                            lastCountry = country;
                        }
                    }
                });
            });
            
            document.getElementById('visited-count').textContent = visitedCount;
            document.getElementById('total-count').textContent = totalCount;
            
            if (ratedCount > 0) {
                const avgRating = (totalRating / ratedCount).toFixed(1);
                document.getElementById('avg-rating').textContent = avgRating;
            } else {
                document.getElementById('avg-rating').textContent = '-';
            }
            
            if (lastCountry) {
                document.getElementById('last-country').textContent = lastCountry;
            } else {
                document.getElementById('last-country').textContent = '-';
            }
        },
        
        // Ouvrir le modal d'un pays
        openModal(countryName) {
            this.selectedCountry = countryName;
            document.getElementById('modal-title').textContent = countryName;
            
            const addBucketBtn = document.getElementById('add-bucket-btn');
            const saveBtn = document.getElementById('save-btn');
            const exportPdfBtn = document.getElementById('export-pdf-btn');
            
            if (this.visitedCountries[countryName]) {
                const data = this.visitedCountries[countryName];
                
                document.getElementById('notes-input').value = data.notes || '';
                document.getElementById('budget-input').value = data.budget || '';
                this.currentRating = data.rating || 0;
                
                document.querySelectorAll('.activity-checkbox').forEach(checkbox => {
                    const activity = checkbox.dataset.activity;
                    checkbox.checked = data.activities && data.activities[activity];
                });
                
                document.querySelectorAll('.companion-checkbox').forEach(checkbox => {
                    const companion = checkbox.dataset.companion;
                    checkbox.checked = data.companions && data.companions.includes(companion);
                });
                
                this.displayPhotos(data.photos || []);
                
                addBucketBtn.style.display = 'none';
                saveBtn.style.display = 'block';
                exportPdfBtn.style.display = 'block';
            } else if (window.BucketListManager && window.BucketListManager.bucketList[countryName]) {
                this.resetModalForm();
                addBucketBtn.textContent = '✅ Déjà dans la Bucket List';
                addBucketBtn.style.background = '#888';
                addBucketBtn.disabled = true;
                saveBtn.style.display = 'block';
                exportPdfBtn.style.display = 'none';
            } else {
                this.resetModalForm();
                addBucketBtn.style.display = 'block';
                addBucketBtn.textContent = '🎯 Ajouter à ma Bucket List';
                addBucketBtn.style.background = '#FF9800';
                addBucketBtn.disabled = false;
                saveBtn.style.display = 'block';
                exportPdfBtn.style.display = 'none';
            }
            
            this.updateStars();
            document.getElementById('modal').classList.add('active');
            document.getElementById('overlay').classList.add('active');
        },
        
        // Réinitialiser le formulaire du modal
        resetModalForm() {
            document.getElementById('notes-input').value = '';
            document.getElementById('budget-input').value = '';
            this.currentRating = 0;
            document.querySelectorAll('.activity-checkbox').forEach(cb => cb.checked = false);
            document.querySelectorAll('.companion-checkbox').forEach(cb => cb.checked = false);
            document.getElementById('photos-preview').innerHTML = '';
        },
        
        // Fermer le modal
        closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
            this.selectedCountry = null;
        },
        
        // Sauvegarder les détails d'un pays
        saveCountryDetails() {
            const notes = document.getElementById('notes-input').value;
            const budget = parseFloat(document.getElementById('budget-input').value) || 0;
            
            const activities = {};
            document.querySelectorAll('.activity-checkbox').forEach(checkbox => {
                activities[checkbox.dataset.activity] = checkbox.checked;
            });
            
            const companions = [];
            document.querySelectorAll('.companion-checkbox').forEach(checkbox => {
                if (checkbox.checked) {
                    companions.push(checkbox.dataset.companion);
                }
            });
            
            const photos = [];
            document.querySelectorAll('#photos-preview img').forEach(img => {
                photos.push(img.src);
            });
            
            this.visitedCountries[this.selectedCountry] = {
                visited: true,
                notes: notes,
                rating: this.currentRating,
                date: new Date().toISOString(),
                budget: budget,
                activities: activities,
                companions: companions,
                photos: photos
            };
            
            this.saveData();
            window.GlobeManager.updateGlobeColors();
            this.updateCountryItem(this.selectedCountry);
            this.updateAllContinentStats();
            this.updateStats();
            this.closeModal();
        },
        
        // Mettre à jour les étoiles
        updateStars() {
            document.querySelectorAll('.star').forEach(star => {
                const rating = parseInt(star.dataset.rating);
                if (rating <= this.currentRating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        },
        
        // Afficher les photos
        displayPhotos(photos) {
            const preview = document.getElementById('photos-preview');
            preview.innerHTML = '';
            
            photos.forEach((photoUrl, index) => {
                const img = document.createElement('div');
                img.style.cssText = 'position: relative; width: 100px; height: 100px; border-radius: 8px; overflow: hidden; border: 2px solid #4CAF50;';
                img.innerHTML = `
                    <img src="${photoUrl}" style="width: 100%; height: 100%; object-fit: cover;">
                    <button onclick="window.CountriesManager.removePhoto(${index})" style="position: absolute; top: 5px; right: 5px; background: #f44336; border: none; border-radius: 50%; width: 25px; height: 25px; color: white; cursor: pointer; font-size: 14px;">×</button>
                `;
                preview.appendChild(img);
            });
        },
        
        // Supprimer une photo
        removePhoto(index) {
            const data = this.visitedCountries[this.selectedCountry];
            if (data && data.photos) {
                data.photos.splice(index, 1);
                this.displayPhotos(data.photos);
                this.saveData();
            }
        },
        
        // Gérer l'upload de photos
        handlePhotoUpload() {
            const photosInput = document.getElementById('photos-input');
            
            photosInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files).slice(0, 5);
                const preview = document.getElementById('photos-preview');
                preview.innerHTML = '';
                
                files.forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement('div');
                        img.style.cssText = 'position: relative; width: 100px; height: 100px; border-radius: 8px; overflow: hidden; border: 2px solid #4CAF50;';
                        img.innerHTML = `
                            <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">
                            <button onclick="removePhoto(${index})" style="position: absolute; top: 5px; right: 5px; background: #f44336; border: none; border-radius: 50%; width: 25px; height: 25px; color: white; cursor: pointer; font-size: 14px;">×</button>
                        `;
                        preview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                });
            });
        },
        
        // Export PDF
        exportToPDF() {
            if (!this.visitedCountries[this.selectedCountry]) return;
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const data = this.visitedCountries[this.selectedCountry];
            
            doc.setFontSize(20);
            doc.setTextColor(76, 175, 80);
            doc.text(this.selectedCountry, 20, 20);
            
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text(`Visite le: ${new Date(data.date).toLocaleDateString('fr-FR')}`, 20, 30);
            
            doc.setTextColor(0, 0, 0);
            doc.text(`Note: ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}`, 20, 40);
            
            if (data.budget) {
                doc.text(`Budget: ${data.budget}€`, 20, 50);
            }
            
            let y = 60;
            doc.text('Activites:', 20, y);
            y += 7;
            Object.keys(data.activities).forEach(activity => {
                if (data.activities[activity]) {
                    doc.text(`- ${activity}`, 25, y);
                    y += 7;
                }
            });
            
            if (data.companions.length > 0) {
                y += 5;
                doc.text(`Voyage avec: ${data.companions.join(', ')}`, 20, y);
                y += 10;
            }
            
            if (data.notes) {
                y += 5;
                doc.text('Notes:', 20, y);
                y += 7;
                const splitNotes = doc.splitTextToSize(data.notes, 170);
                doc.text(splitNotes, 20, y);
            }
            
            doc.save(`${this.selectedCountry}_carnet.pdf`);
        },
        
        // Initialiser la recherche
        initSearch() {
            const searchBox = document.getElementById('search-box');
            searchBox.addEventListener('input', (e) => {
                const search = e.target.value.toLowerCase();
                const items = document.querySelectorAll('.country-item');
                const sections = document.querySelectorAll('.continent-section');
                
                if (search === '') {
                    items.forEach(item => item.style.display = 'flex');
                    sections.forEach(section => section.style.display = 'block');
                    return;
                }
                
                items.forEach(item => {
                    const countryName = item.querySelector('.country-name').textContent.toLowerCase();
                    if (countryName.includes(search)) {
                        item.style.display = 'flex';
                        item.parentElement.classList.add('open');
                        item.closest('.continent-section').style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                sections.forEach(section => {
                    const visibleItems = section.querySelectorAll('.country-item[style="display: flex;"]');
                    if (visibleItems.length === 0) {
                        section.style.display = 'none';
                    }
                });
            });
        },
        
        // Initialiser le filtre de notes
        initRatingFilter() {
            const ratingFilter = document.getElementById('rating-filter');
            ratingFilter.addEventListener('change', (e) => {
                const filterValue = e.target.value;
                const items = document.querySelectorAll('.country-item');
                const sections = document.querySelectorAll('.continent-section');
                
                items.forEach(item => {
                    const countryName = item.querySelector('.country-name').textContent;
                    const countryData = this.visitedCountries[countryName];
                    
                    if (filterValue === 'all') {
                        item.style.display = 'flex';
                    } else if (filterValue === '0') {
                        if (countryData && countryData.rating === 0) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    } else {
                        const minRating = parseInt(filterValue);
                        if (countryData && countryData.rating >= minRating) {
                            item.style.display = 'flex';
                            item.parentElement.classList.add('open');
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
                
                sections.forEach(section => {
                    const visibleItems = section.querySelectorAll('.country-item[style="display: flex;"]');
                    if (visibleItems.length === 0) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = 'block';
                    }
                });
            });
        },
        
        // Initialisation complète
        init() {
            this.loadData();
            this.initContinentsList();
            this.initSearch();
            this.initRatingFilter();
            this.handlePhotoUpload();
            
            // Event listeners
            document.getElementById('save-btn').addEventListener('click', () => this.saveCountryDetails());
            document.getElementById('cancel-btn').addEventListener('click', () => this.closeModal());
            document.getElementById('overlay').addEventListener('click', () => this.closeModal());
            document.getElementById('export-pdf-btn').addEventListener('click', () => this.exportToPDF());
            
            document.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', () => {
                    this.currentRating = parseInt(star.dataset.rating);
                    this.updateStars();
                });
            });
            
            document.getElementById('add-bucket-btn').addEventListener('click', () => {
                if (window.BucketListManager && !window.BucketListManager.bucketList[this.selectedCountry]) {
                    window.BucketListManager.addToBucketList(this.selectedCountry, 'Ajouté depuis le globe');
                    alert(`${this.selectedCountry} a été ajouté à votre Bucket List ! 🎯`);
                    this.closeModal();
                }
            });
        }
    };
    
    // Exposer globalement
    window.CountriesManager = CountriesManager;
    
    // Fonction globale pour removePhoto
    window.removePhoto = function(index) {
        CountriesManager.removePhoto(index);
    };
    
    console.log('✅ Countries module chargé');
})();