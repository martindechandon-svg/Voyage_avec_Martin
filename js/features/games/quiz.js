// ===== QUIZ GAME =====
// Fichier: js/features/games/quiz.js

window.QuizGame = {
    // Variables du jeu
    currentQuestion: 0,
    score: 0,
    correct: 0,
    wrong: 0,
    currentQuestions: [],
    currentDifficulty: 'mix',
    
    // Base de données des questions (gardez toutes vos questions existantes)
    database: [
				// Faciles
				{ type: 'text', difficulty: 1, question: '🏰 Dans quel pays se trouve le château de Versailles ?', answer: 'France', hint: 'Roi Louis XIV' },
				{ type: 'text', difficulty: 1, question: '🗽 Dans quel pays se trouve le Mont Rushmore ?', answer: 'États-Unis', hint: '4 présidents sculptés' },
				{ type: 'text', difficulty: 1, question: '🌉 Dans quel pays se trouve le pont du Golden Gate ?', answer: 'États-Unis', hint: 'San Francisco' },
				{ type: 'text', difficulty: 1, question: '🏛️ Dans quel pays se trouve l\'Acropole ?', answer: 'Grèce', hint: 'Athènes' },
				{ type: 'text', difficulty: 1, question: '🗼 Dans quel pays se trouve la Tour CN ?', answer: 'Canada', hint: 'Toronto' },
				{ type: 'text', difficulty: 1, question: '🍕 Dans quel pays les gelatos sont-ils originaires ?', answer: 'Italie', hint: 'Glace artisanale' },
				{ type: 'text', difficulty: 1, question: '🥨 Dans quel pays les bretzels sont-ils traditionnels ?', answer: 'Allemagne', hint: 'Pain torsadé' },
				{ type: 'text', difficulty: 1, question: '🌮 Dans quel pays le guacamole est-il originaire ?', answer: 'Mexique', hint: 'À base d\'avocat' },
				{ type: 'text', difficulty: 1, question: '🍜 Dans quel pays les ramen sont-ils populaires ?', answer: 'Japon', hint: 'Soupe de nouilles' },
				{ type: 'text', difficulty: 1, question: '🧇 Dans quel pays les gaufres sont-elles spécialité ?', answer: 'Belgique', hint: 'Bruxelles et Liège' },
				{ type: 'text', difficulty: 1, question: '🏛️ Oslo est la capitale de quel pays ?', answer: 'Norvège', hint: 'Pays scandinave' },
				{ type: 'text', difficulty: 1, question: '🏛️ Bruxelles est la capitale de quel pays ?', answer: 'Belgique', hint: 'Capitale européenne' },
				{ type: 'text', difficulty: 1, question: '🏛️ Prague est la capitale de quel pays ?', answer: 'Tchéquie', hint: 'Ville aux 100 tours' },
				{ type: 'text', difficulty: 1, question: '🏛️ Rome est la capitale de quel pays ?', answer: 'Italie', hint: 'Ville éternelle' },
				{ type: 'text', difficulty: 1, question: '⚽ Quel pays a inventé le basket-ball ?', answer: 'États-Unis', hint: 'Sport avec panier' },
				{ type: 'text', difficulty: 1, question: '🎾 Dans quel pays se déroule Roland-Garros ?', answer: 'France', hint: 'Tournoi sur terre battue' },
				{ type: 'text', difficulty: 1, question: '🦅 Quel pays a l\'aigle comme symbole national ?', answer: 'États-Unis', hint: 'Aigle à tête blanche' },
				{ type: 'text', difficulty: 1, question: '🐼 Quel pays a le panda comme symbole ?', answer: 'Chine', hint: 'Animal menacé' },
				{ type: 'text', difficulty: 1, question: '🦁 Dans quel pays vivent les lions en liberté (safari) ?', answer: 'Kenya', hint: 'Safaris africains' },
				{ type: 'text', difficulty: 1, question: '🎬 Dans quel pays se trouve Hollywood ?', answer: 'États-Unis', hint: 'Los Angeles' },
				{ type: 'text', difficulty: 1, question: '🏔️ Berne est la capitale de quel pays ?', answer: 'Suisse', hint: 'Pays neutre et montagneux' },
				{ type: 'text', difficulty: 1, question: '🏛️ Copenhague est la capitale de quel pays ?', answer: 'Danemark', hint: 'Pays de la Petite Sirène' },
				{ type: 'text', difficulty: 1, question: '☕ Quel pays est célèbre pour son café et le canal qui relie deux océans ?', answer: 'Panama', hint: 'Situé en Amérique centrale' },
				{ type: 'text', difficulty: 1, question: '🏛️ Varsovie est la capitale de quel pays ?', answer: 'Pologne', hint: 'Pays d\'Europe de l\'Est' },
				{ type: 'text', difficulty: 1, question: '🏛️ Séoul est la capitale de quel pays ?', answer: 'Corée du Sud', hint: 'Pays de la K-Pop' },
				{ type: 'text', difficulty: 1, question: '🦁 Dans quel pays peut-on voir le Sphinx devant les pyramides ?', answer: 'Égypte', hint: 'Pays traversé par le Nil' },
				{ type: 'text', difficulty: 1, question: '🏯 Dans quel pays se trouve la ville impériale de Kyoto ?', answer: 'Japon', hint: 'Archipel asiatique' },
				{ type: 'text', difficulty: 1, question: '🏛️ Dublin est la capitale de quel pays ?', answer: 'Irlande', hint: 'L\'île d\'Émeraude' },
				{ type: 'text', difficulty: 1, question: '🏰 Quel pays est célèbre pour ses contes d\'Andersen et ses briques LEGO ?', answer: 'Danemark', hint: 'Royaume scandinave' },
				{ type: 'text', difficulty: 1, question: '🥃 Quel pays est le plus grand du monde par sa superficie ?', answer: 'Russie', hint: 'S\'étend sur deux continents' },
				{ type: 'text', difficulty: 1, question: '🏛️ Ottawa est la capitale de quel pays ?', answer: 'Canada', hint: 'Au nord des États-Unis' },
				{ type: 'text', difficulty: 1, question: '🏟️ Dans quel pays se trouve le stade du Maracanã ?', answer: 'Brésil', hint: 'Temple du football' },
				{ type: 'text', difficulty: 1, question: '🏛️ Stockholm est la capitale de quel pays ?', answer: 'Suède', hint: 'Pays du groupe ABBA' },
				{ type: 'text', difficulty: 1, question: '🐮 Quel pays est célèbre pour ses vaches, son lait et ses banques ?', answer: 'Suisse', hint: 'Pays des Alpes' },
				{ type: 'text', difficulty: 1, question: '🏛️ Vienne est la capitale de quel pays ?', answer: 'Autriche', hint: 'Ville de la valse' },
				{ type: 'text', difficulty: 1, question: '🏰 Quel pays européen est dirigé par un Grand-Duc ?', answer: 'Luxembourg', hint: 'Petit pays entre France et Allemagne' },
				{ type: 'text', difficulty: 1, question: '🏛️ Budapest est la capitale de quel pays ?', answer: 'Hongrie', hint: 'Traversée par le Danube' },
				{ type: 'text', difficulty: 1, question: '🛶 Dans quel pays se trouve la ville de Venise ?', answer: 'Italie', hint: 'La cité des Doges' },
				{ type: 'text', difficulty: 1, question: '🏛️ Bangkok est la capitale de quel pays ?', answer: 'Thaïlande', hint: 'Anciennement le Siam' },
				{ type: 'text', difficulty: 1, question: '🛥️ Quel pays est une petite principauté sur la Côte d\'Azur ?', answer: 'Monaco', hint: 'Célèbre pour son Grand Prix' },
				{ type: 'text', difficulty: 1, question: '🏛️ Manille est la capitale de quel pays ?', answer: 'Philippines', hint: 'Archipel d\'Asie du Sud-Est' },
				{ type: 'text', difficulty: 1, question: '🏏 Quel pays est une grande île au sud de l\'Inde ?', answer: 'Sri Lanka', hint: 'Anciennement Ceylan' },
				{ type: 'text', difficulty: 1, question: '🏛️ Buenos Aires est la capitale de quel pays ?', answer: 'Argentine', hint: 'Pays de Maradona' },
				{ type: 'text', difficulty: 1, question: '🏰 Dans quel pays se trouve le Rocher de Gibraltar (territoire lié) ?', answer: 'Espagne', hint: 'À la pointe sud de l\'Europe' },
				{ type: 'text', difficulty: 1, question: '🏛️ Pékin est la capitale de quel pays ?', answer: 'Chine', hint: 'Plus de 1,4 milliard d\'habitants' },
				{ type: 'text', difficulty: 1, question: '🐑 Quel pays est célèbre pour ses moutons et ses paysages du Seigneur des Anneaux ?', answer: 'Nouvelle-Zélande', hint: 'Capitale : Wellington' },
				{ type: 'text', difficulty: 1, question: '🏛️ New Delhi est la capitale de quel pays ?', answer: 'Inde', hint: 'Deuxième pays le plus peuplé' },
				{ type: 'text', difficulty: 1, question: '🥨 Dans quel pays se trouve la région de Bavière ?', answer: 'Allemagne', hint: 'Sa capitale est Berlin' },
				{ type: 'text', difficulty: 1, question: '🏛️ Le Caire est la capitale de quel pays ?', answer: 'Égypte', hint: 'Pays des pharaons' },
				{ type: 'text', difficulty: 1, question: '🥖 Quel pays est le premier producteur mondial de vin ?', answer: 'France', hint: 'Pays de la gastronomie' },
				{ type: 'text', difficulty: 1, question: '🏛️ Athènes est la capitale de quel pays ?', answer: 'Grèce', hint: 'Berceau de la démocratie' },
				{ type: 'text', difficulty: 1, question: '🏙️ Dans quel pays se trouve la ville de Dubaï ?', answer: 'Émirats Arabes Unis', hint: 'Moyen-Orient' },
				{ type: 'text', difficulty: 1, question: '🏛️ Tokyo est la capitale de quel pays ?', answer: 'Japon', hint: 'Pays du soleil levant' },
				{ type: 'text', difficulty: 1, question: '🍫 Dans quel pays se trouve la ville de Zurich ?', answer: 'Suisse', hint: 'Centre financier mondial' },
				{ type: 'text', difficulty: 1, question: '🏛️ Oslo est la capitale de quel pays ?', answer: 'Norvège', hint: 'Pays des Vikings' },
				{ type: 'text', difficulty: 1, question: '🕌 Quel pays possède le plus grand nombre de musulmans au monde ?', answer: 'Indonésie', hint: 'Immense archipel' },
				{ type: 'text', difficulty: 1, question: '🏛️ Lisbonne est la capitale de quel pays ?', answer: 'Portugal', hint: 'Pays de Vasco de Gama' },
				{ type: 'text', difficulty: 1, question: '⚽ Quel pays a remporté le plus de Coupes du Monde de football ?', answer: 'Brésil', hint: '5 titres' },
				{ type: 'text', difficulty: 1, question: '🏛️ Canberra est la capitale de quel pays ?', answer: 'Australie', hint: 'Souvent confondue avec Sydney' },
				{ type: 'text', difficulty: 1, question: '🌊 Quel pays est composé de plus de 17 000 îles ?', answer: 'Indonésie', hint: 'Asie du Sud-Est' },
				
				// Moyennes
				
				{ type: 'text', difficulty: 2, question: '🗿 Dans quel pays se trouve Chichén Itzá ?', answer: 'Mexique', hint: 'Pyramide maya' },
				{ type: 'text', difficulty: 2, question: '🏰 Dans quel pays se trouve le Palais de l\'Alhambra ?', answer: 'Espagne', hint: 'Grenade, architecture mauresque' },
				{ type: 'text', difficulty: 2, question: '⛩️ Dans quel pays se trouvent les milliers de torii de Fushimi Inari ?', answer: 'Japon', hint: 'Kyoto' },
				{ type: 'text', difficulty: 2, question: '🕌 Dans quel pays se trouve la Grande Mosquée de Kairouan ?', answer: 'Tunisie', hint: 'Ville sainte' },
				{ type: 'text', difficulty: 2, question: '🏰 Dans quel pays se trouve le château d\'Édimbourg ?', answer: 'Royaume-Uni', hint: 'Écosse' },
				{ type: 'text', difficulty: 2, question: '🍷 Dans quel pays le vin de Rioja est-il produit ?', answer: 'Espagne', hint: 'Région viticole' },
				{ type: 'text', difficulty: 2, question: '🧀 Dans quel pays le Parmigiano-Reggiano est-il produit ?', answer: 'Italie', hint: 'Parmesan authentique' },
				{ type: 'text', difficulty: 2, question: '🥃 Dans quel pays le whisky est-il traditionnel ?', answer: 'Royaume-Uni', hint: 'Écosse principalement' },
				{ type: 'text', difficulty: 2, question: '🍫 Dans quel pays Lindt est-il fabriqué ?', answer: 'Suisse', hint: 'Chocolat premium' },
				{ type: 'text', difficulty: 2, question: '🦞 Dans quel pays les homards sont-ils spécialité ?', answer: 'Canada', hint: 'Côte atlantique' },
				{ type: 'text', difficulty: 2, question: '🏛️ Helsinki est la capitale de quel pays ?', answer: 'Finlande', hint: 'Pays nordique' },
				{ type: 'text', difficulty: 2, question: '🏛️ Dublin est la capitale de quel pays ?', answer: 'Irlande', hint: 'Île verte' },
				{ type: 'text', difficulty: 2, question: '🏛️ Varsovie est la capitale de quel pays ?', answer: 'Pologne', hint: 'Europe de l\'Est' },
				{ type: 'text', difficulty: 2, question: '🏛️ Budapest est la capitale de quel pays ?', answer: 'Hongrie', hint: 'Divisée par le Danube' },
				{ type: 'text', difficulty: 2, question: '🏛️ Bucarest est la capitale de quel pays ?', answer: 'Roumanie', hint: 'Paris de l\'Est' },
				{ type: 'text', difficulty: 2, question: '🏐 Dans quel pays le volley-ball de plage est-il très populaire ?', answer: 'Brésil', hint: 'Copacabana' },
				{ type: 'text', difficulty: 2, question: '🏏 Dans quel pays le cricket est-il sport national ?', answer: 'Inde', hint: 'Sport britannique adopté' },
				{ type: 'text', difficulty: 2, question: '🎭 Dans quel pays le kabuki est-il originaire ?', answer: 'Japon', hint: 'Théâtre traditionnel' },
				{ type: 'text', difficulty: 2, question: '🎨 Dans quel pays Picasso est-il né ?', answer: 'Espagne', hint: 'Malaga' },
				{ type: 'text', difficulty: 2, question: '🎵 Dans quel pays le fado est-il chanté ?', answer: 'Portugal', hint: 'Musique mélancolique' },
				{ type: 'text', difficulty: 2, question: '🏰 Dans quel pays se trouve la ville de Bruges, la "Venise du Nord" ?', answer: 'Belgique', hint: 'Région flamande' },
				{ type: 'text', difficulty: 2, question: '🏛️ Santiago est la capitale de quel pays ?', answer: 'Chili', hint: 'Pays tout en longueur' },
				{ type: 'text', difficulty: 2, question: '🐪 Dans quel pays se trouve la ville de Pétra ?', answer: 'Jordanie', hint: 'Cité sculptée dans la roche' },
				{ type: 'text', difficulty: 2, question: '🏛️ Bogota est la capitale de quel pays ?', answer: 'Colombie', hint: 'Amérique du Sud' },
				{ type: 'text', difficulty: 2, question: '⛰️ Dans quel pays se trouve le massif du Kilimandjaro ?', answer: 'Tanzanie', hint: 'Toit de l\'Afrique' },
				{ type: 'text', difficulty: 2, question: '🏛️ Hanoï est la capitale de quel pays ?', answer: 'Vietnam', hint: 'Asie du Sud-Est' },
				{ type: 'text', difficulty: 2, question: '🥃 Dans quel pays est produit le Tequila ?', answer: 'Mexique', hint: 'État de Jalisco' },
				{ type: 'text', difficulty: 2, question: '🏛️ Reykjavik est la capitale de quel pays ?', answer: 'Islande', hint: 'Capitale la plus septentrionale' },
				{ type: 'text', difficulty: 2, question: '🐉 Quel pays est surnommé le "Pays du Dragon Tonnerre" ?', answer: 'Bhoutan', hint: 'Royaume de l\'Himalaya' },
				{ type: 'text', difficulty: 2, question: '🏛️ Téhéran est la capitale de quel pays ?', answer: 'Iran', hint: 'Ancienne Perse' },
				{ type: 'text', difficulty: 2, question: '🍫 Quel pays d\'Afrique est le premier producteur mondial de cacao ?', answer: 'Côte d\'Ivoire', hint: 'Capitale : Yamoussoukro' },
				{ type: 'text', difficulty: 2, question: '🏛️ Helsinki est la capitale de quel pays ?', answer: 'Finlande', hint: 'Pays aux mille lacs' },
				{ type: 'text', difficulty: 2, question: '🐆 Dans quel pays se trouve le delta de l\'Okavango ?', answer: 'Botswana', hint: 'Sud de l\'Afrique' },
				{ type: 'text', difficulty: 2, question: '🏛️ Kaboul est la capitale de quel pays ?', answer: 'Afghanistan', hint: 'Asie centrale' },
				{ type: 'text', difficulty: 2, question: '🏰 Dans quel pays se trouve le palais de Peterhof ?', answer: 'Russie', hint: 'Près de Saint-Pétersbourg' },
				{ type: 'text', difficulty: 2, question: '🏛️ Alger est la capitale de quel pays ?', answer: 'Algérie', hint: 'Plus grand pays d\'Afrique' },
				{ type: 'text', difficulty: 2, question: '🕍 Dans quel pays se trouve le Mur des Lamentations ?', answer: 'Israël', hint: 'Jérusalem' },
				{ type: 'text', difficulty: 2, question: '🏛️ Lima est la capitale de quel pays ?', answer: 'Pérou', hint: 'Pays des Incas' },
				{ type: 'text', difficulty: 2, question: '🦢 Dans quel pays se trouvent les chutes d\'Iguazú (côté principal) ?', answer: 'Argentine', hint: 'Frontière avec le Brésil' },
				{ type: 'text', difficulty: 2, question: '🏛️ Nairobi est la capitale de quel pays ?', answer: 'Kenya', hint: 'Afrique de l\'Est' },
				{ type: 'text', difficulty: 2, question: '🚢 Dans quel pays se trouve le port d\'Anvers ?', answer: 'Belgique', hint: 'Deuxième port d\'Europe' },
				{ type: 'text', difficulty: 2, question: '🏛️ Bagdad est la capitale de quel pays ?', answer: 'Irak', hint: 'Berceau de la Mésopotamie' },
				{ type: 'text', difficulty: 2, question: '🦅 Dans quel pays se trouve la chaîne de montagnes de l\'Atlas ?', answer: 'Maroc', hint: 'Afrique du Nord' },
				{ type: 'text', difficulty: 2, question: '🏛️ Riyad est la capitale de quel pays ?', answer: 'Arabie Saoudite', hint: 'Péninsule arabique' },
				{ type: 'text', difficulty: 2, question: '🧊 Dans quel pays peut-on voir le glacier Perito Moreno ?', answer: 'Argentine', hint: 'Patagonie' },
				{ type: 'text', difficulty: 2, question: '🏛️ Sofia est la capitale de quel pays ?', answer: 'Bulgarie', hint: 'Europe de l\'Est' },
				{ type: 'text', difficulty: 2, question: '🐯 Dans quel pays se trouve le parc national de Sundarbans ?', answer: 'Bangladesh', hint: 'Delta du Gange' },
				{ type: 'text', difficulty: 2, question: '🏛️ Addis-Abeba est la capitale de quel pays ?', answer: 'Éthiopie', hint: 'Siège de l\'Union Africaine' },
				{ type: 'text', difficulty: 2, question: '🦘 Dans quel pays se trouve le monolithe d\'Uluru (Ayers Rock) ?', answer: 'Australie', hint: 'Au centre du pays' },
				{ type: 'text', difficulty: 2, question: '🏛️ Kiev est la capitale de quel pays ?', answer: 'Ukraine', hint: 'Europe de l\'Est' },
				{ type: 'text', difficulty: 2, question: '⛰️ Dans quel pays se trouve le Mont Blanc (sommet partagé) ?', answer: 'France', hint: 'Frontière avec l\'Italie' },
				{ type: 'text', difficulty: 2, question: '🏛️ Managua est la capitale de quel pays ?', answer: 'Nicaragua', hint: 'Amérique centrale' },
				{ type: 'text', difficulty: 2, question: '☕ Quel pays est le premier producteur mondial de café ?', answer: 'Brésil', hint: 'Amérique latine' },
				{ type: 'text', difficulty: 2, question: '🏛️ Belgrade est la capitale de quel pays ?', answer: 'Serbie', hint: 'Ex-Yougoslavie' },
				{ type: 'text', difficulty: 2, question: '🌿 Dans quel pays se trouve la réserve de Monteverde ?', answer: 'Costa Rica', hint: 'Pionnier de l\'écotourisme' },
				{ type: 'text', difficulty: 2, question: '🏛️ Dakar est la capitale de quel pays ?', answer: 'Sénégal', hint: 'Point le plus à l\'ouest de l\'Afrique' },
				{ type: 'text', difficulty: 2, question: '🏛️ Phnom Penh est la capitale de quel pays ?', answer: 'Cambodge', hint: 'Asie du Sud-Est' },
				{ type: 'text', difficulty: 2, question: '🏛️ Kingston est la capitale de quel pays ?', answer: 'Jamaïque', hint: 'Pays de Bob Marley' },
				{ type: 'text', difficulty: 2, question: '🛶 Quel pays est célèbre pour ses maisons colorées sur l\'eau à Curaçao (pays lié) ?', answer: 'Pays-Bas', hint: 'Royaume des...' },
				{ type: 'text', difficulty: 2, question: '🏛️ Quito est la capitale de quel pays ?', answer: 'Équateur', hint: 'Sur la ligne imaginaire du même nom' },
				{ type: 'text', difficulty: 2, question: '🏰 Dans quel pays se trouve le quartier historique de Nyhavn aux maisons colorées ?', answer: 'Danemark', hint: 'Sa capitale est Copenhague' },
				{ type: 'text', difficulty: 2, question: '🏛️ Dans quel pays se trouve la ville de Genève, siège de nombreuses organisations mondiales ?', answer: 'Suisse', hint: 'Au bord du lac Léman' },
				{ type: 'text', difficulty: 2, question: '🦁 Dans quel pays se trouve le cratère du Ngorongoro, sanctuaire sauvage ?', answer: 'Tanzanie', hint: 'Afrique de l\'Est' },
				{ type: 'text', difficulty: 2, question: '🏔️ Dans quel pays se trouve la région de la Transylvanie ?', answer: 'Roumanie', hint: 'Légende du comte Dracula' },
				{ type: 'text', difficulty: 2, question: '🏺 Dans quel pays se trouve le site antique d\'Éphèse ?', answer: 'Turquie', hint: 'Anatolie' },
				
				
				// Difficiles	
				
				{ type: 'text', difficulty: 3, question: '🏛️ Dans quel pays se trouve Borobudur ?', answer: 'Indonésie', hint: 'Plus grand temple bouddhiste' },
				{ type: 'text', difficulty: 3, question: '🗿 Dans quel pays se trouve Lalibela ?', answer: 'Éthiopie', hint: 'Églises creusées dans la roche' },
				{ type: 'text', difficulty: 3, question: '🏰 Dans quel pays se trouve le Palais du Potala ?', answer: 'Chine', hint: 'Tibet, résidence du Dalaï-lama' },
				{ type: 'text', difficulty: 3, question: '⛪ Dans quel pays se trouve la cathédrale de Brasília ?', answer: 'Brésil', hint: 'Architecture moderne' },
				{ type: 'text', difficulty: 3, question: '🕌 Dans quel pays se trouve la mosquée du Vendredi d\'Ispahan ?', answer: 'Iran', hint: 'Architecture persane' },
				{ type: 'text', difficulty: 3, question: '🏛️ Oulan-Bator est la capitale de quel pays ?', answer: 'Mongolie', hint: 'Pays d\'Asie centrale' },
				{ type: 'text', difficulty: 3, question: '🏛️ Asunción est la capitale de quel pays ?', answer: 'Paraguay', hint: 'Amérique du Sud' },
				{ type: 'text', difficulty: 3, question: '🏛️ Tbilissi est la capitale de quel pays ?', answer: 'Géorgie', hint: 'Caucase' },
				{ type: 'text', difficulty: 3, question: '🏛️ Tallinn est la capitale de quel pays ?', answer: 'Estonie', hint: 'Pays balte' },
				{ type: 'text', difficulty: 3, question: '🏛️ Ljubljana est la capitale de quel pays ?', answer: 'Slovénie', hint: 'Ex-Yougoslavie' },
				{ type: 'text', difficulty: 3, question: '🌊 Dans quel pays se trouve le lac Baïkal ?', answer: 'Russie', hint: 'Plus profond lac du monde' },
				{ type: 'text', difficulty: 3, question: '🏔️ Dans quel pays se trouve l\'Aconcagua ?', answer: 'Argentine', hint: 'Plus haut sommet des Amériques' },
				{ type: 'text', difficulty: 3, question: '🌋 Dans quel pays se trouve le mont Erebus ?', answer: 'Antarctique', hint: 'Volcan actif le plus austral' },
				{ type: 'text', difficulty: 3, question: '🏜️ Dans quel pays se trouve le désert du Kalahari ?', answer: 'Botswana', hint: 'Afrique australe' },
				{ type: 'text', difficulty: 3, question: '🌊 Dans quel pays se trouve le delta de l\'Okavango ?', answer: 'Botswana', hint: 'Delta intérieur' },
				{ type: 'text', difficulty: 3, question: '🎨 Dans quel pays Frida Kahlo est-elle née ?', answer: 'Mexique', hint: 'Peintre surréaliste' },
				{ type: 'text', difficulty: 3, question: '🎭 Dans quel pays le kathakali est-il pratiqué ?', answer: 'Inde', hint: 'Danse-théâtre du Kerala' },
				{ type: 'text', difficulty: 3, question: '🎵 Dans quel pays le gamelan est-il joué ?', answer: 'Indonésie', hint: 'Orchestre traditionnel' },
				{ type: 'text', difficulty: 3, question: '📚 Dans quel pays se trouve la bibliothèque de Joanina ?', answer: 'Portugal', hint: 'Université de Coimbra' },
				{ type: 'text', difficulty: 3, question: '🏺 Dans quel pays se trouve Göbekli Tepe ?', answer: 'Turquie', hint: 'Plus ancien temple du monde' },
				{ type: 'text', difficulty: 3, question: '🏛️ Achgabat est la capitale de quel pays ?', answer: 'Turkménistan', hint: 'Asie centrale' },
				{ type: 'text', difficulty: 3, question: '🏺 Dans quel pays se trouve le site archéologique de Persépolis ?', answer: 'Iran', hint: 'Empire achéménide' },
				{ type: 'text', difficulty: 3, question: '🏛️ Windhoek est la capitale de quel pays ?', answer: 'Namibie', hint: 'Sud de l\'Afrique' },
				{ type: 'text', difficulty: 3, question: '🏰 Dans quel pays se trouve le monastère d\'Ostrog, encastré dans une falaise ?', answer: 'Monténégro', hint: 'Balkans' },
				{ type: 'text', difficulty: 3, question: '🏛️ Bichkek est la capitale de quel pays ?', answer: 'Kirghizistan', hint: 'Pays des montagnes célestes' },
				{ type: 'text', difficulty: 3, question: '🌊 Dans quel pays se trouve le lac Retba (Lac Rose) ?', answer: 'Sénégal', hint: 'Près de la presqu\'île du Cap-Vert' },
				{ type: 'text', difficulty: 3, question: '🏛️ Antananarivo est la capitale de quel pays ?', answer: 'Madagascar', hint: 'L\'île rouge' },
				{ type: 'text', difficulty: 3, question: '🏜️ Dans quel pays se trouve le désert du Namib ?', answer: 'Namibie', hint: 'Plus vieux désert du monde' },
				{ type: 'text', difficulty: 3, question: '🏛️ Mascate est la capitale de quel pays ?', answer: 'Oman', hint: 'Sultanat du Moyen-Orient' },
				{ type: 'text', difficulty: 3, question: '🏔️ Dans quel pays se trouve le mont Ararat ?', answer: 'Turquie', hint: 'Où l\'arche de Noé se serait posée' },
				{ type: 'text', difficulty: 3, question: '🏛️ Gaborone est la capitale de quel pays ?', answer: 'Botswana', hint: 'Afrique australe' },
				{ type: 'text', difficulty: 3, question: '🗿 Dans quel pays se trouve le site de Tiwanaku ?', answer: 'Bolivie', hint: 'Près du lac Titicaca' },
				{ type: 'text', difficulty: 3, question: '🏛️ Erevan est la capitale de quel pays ?', answer: 'Arménie', hint: 'Caucase' },
				{ type: 'text', difficulty: 3, question: '🌿 Dans quel pays se trouve la forêt impénétrable de Bwindi ?', answer: 'Ouganda', hint: 'Refuge des gorilles de montagne' },
				{ type: 'text', difficulty: 3, question: '🏛️ Naypyidaw est la capitale de quel pays ?', answer: 'Myanmar', hint: 'Anciennement la Birmanie' },
				{ type: 'text', difficulty: 3, question: '🏰 Dans quel pays se trouve le château de Mir de style gothique biélorusse ?', answer: 'Biélorussie', hint: 'Europe de l\'Est' },
				{ type: 'text', difficulty: 3, question: '🏛️ Achkhabad est une ville de quel pays ?', answer: 'Turkménistan', hint: 'Ville de marbre blanc' },
				{ type: 'text', difficulty: 3, question: '🌊 Dans quel pays se trouve le Grand Trou Bleu ?', answer: 'Belize', hint: 'Amérique centrale' },
				{ type: 'text', difficulty: 3, question: '🏛️ Douchanbé est la capitale de quel pays ?', answer: 'Tadjikistan', hint: 'Asie centrale' },
				{ type: 'text', difficulty: 3, question: '🕌 Dans quel pays se trouve la mosquée de Cristal ?', answer: 'Malaisie', hint: 'Kuala Terengganu' },
				{ type: 'text', difficulty: 3, question: '🏛️ Chisinau est la capitale de quel pays ?', answer: 'Moldavie', hint: 'Entre la Roumanie et l\'Ukraine' },
				{ type: 'text', difficulty: 3, question: '🏜️ Dans quel pays se trouve le désert du Thar ?', answer: 'Inde', hint: 'Frontière avec le Pakistan' },
				{ type: 'text', difficulty: 3, question: '🏛️ Bandar Seri Begawan est la capitale de quel pays ?', answer: 'Brunei', hint: 'Sultanat sur l\'île de Bornéo' },
				{ type: 'text', difficulty: 3, question: '⚓ Dans quel pays se trouve le port de Djibouti ?', answer: 'Djibouti', hint: 'Corne de l\'Afrique' },
				{ type: 'text', difficulty: 3, question: '🏛️ Noursoultan (ex-Astana) est la capitale de quel pays ?', answer: 'Kazakhstan', hint: 'Plus grand pays enclavé' },
				{ type: 'text', difficulty: 3, question: '🏰 Dans quel pays se trouve la forteresse de Masada ?', answer: 'Israël', hint: 'Surplombant la mer Morte' },
				{ type: 'text', difficulty: 3, question: '🏛️ Ouagadougou est la capitale de quel pays ?', answer: 'Burkina Faso', hint: 'Afrique de l\'Ouest' },
				{ type: 'text', difficulty: 3, question: '🌋 Dans quel pays se trouve le volcan Mayon, au cône parfait ?', answer: 'Philippines', hint: 'Île de Luçon' },
				{ type: 'text', difficulty: 3, question: '🏛️ Vientiane est la capitale de quel pays ?', answer: 'Laos', hint: 'Seul pays enclavé d\'Asie du Sud-Est' },
				{ type: 'text', difficulty: 3, question: '⛪ Dans quel pays se trouve l\'église de bois de Heddal ?', answer: 'Norvège', hint: 'Stavkirke' },
				{ type: 'text', difficulty: 3, question: '🏛️ Paramaribo est la capitale de quel pays ?', answer: 'Suriname', hint: 'Amérique du Sud' },
				{ type: 'text', difficulty: 3, question: '🐫 Dans quel pays se trouve la cité de Tombouctou ?', answer: 'Mali', hint: 'Afrique de l\'Ouest' },
				{ type: 'text', difficulty: 3, question: '🏛️ Lusaka est la capitale de quel pays ?', answer: 'Zambie', hint: 'Afrique australe' },
				{ type: 'text', difficulty: 3, question: '🏺 Dans quel pays se trouve le site antique de Leptis Magna ?', answer: 'Libye', hint: 'Afrique du Nord' },
				{ type: 'text', difficulty: 3, question: '🏛️ Khartoum est la capitale de quel pays ?', answer: 'Soudan', hint: 'Confluent du Nil Blanc et Bleu' },
				{ type: 'text', difficulty: 3, question: '🏔️ Dans quel pays se trouve le mont Elbrouz, point culminant de l\'Europe ?', answer: 'Russie', hint: 'Dans le Caucase' },
				{ type: 'text', difficulty: 3, question: '🏛️ Suva est la capitale de quel pays ?', answer: 'Fidji', hint: 'Archipel du Pacifique' },
				{ type: 'text', difficulty: 3, question: '🦏 Dans quel pays se trouve le parc national de Kaziranga ?', answer: 'Inde', hint: 'État d\'Assam' },
				{ type: 'text', difficulty: 3, question: '🏛️ Tachkent est la capitale de quel pays ?', answer: 'Ouzbékistan', hint: 'Asie centrale' },
				{ type: 'text', difficulty: 3, question: '🏛️ Podgorica est la capitale de quel pays ?', answer: 'Monténégro', hint: 'Anciennement Titograd' },
				{ type: 'text', difficulty: 3, question: '🏛️ Minsk est la capitale de quel pays ?', answer: 'Biélorussie', hint: 'Europe de l\'Est' },
				{ type: 'text', difficulty: 3, question: '🏛️ Achgabat est la capitale de quel pays ?', answer: 'Turkménistan', hint: 'Asie centrale' },
				{ type: 'text', difficulty: 3, question: '🏛️ Bandar Seri Begawan est la capitale de quel pays ?', answer: 'Brunei', hint: 'Sur l\'île de Bornéo' },
				{ type: 'text', difficulty: 3, question: '🏛️ Riga est la capitale de quel pays ?', answer: 'Lettonie', hint: 'Un pays balte' },
				{ type: 'text', difficulty: 3, question: '🏛️ Windhoek est la capitale de quel pays ?', answer: 'Namibie', hint: 'Afrique australe' },	
				
			    // Monuments célèbres
			    { type: 'text', difficulty: 1, question: '🗼 Dans quel pays se trouve la Tour Eiffel ?', answer: 'France', hint: 'Capitale: Paris' },
			    { type: 'text', difficulty: 1, question: '🗽 Dans quel pays se trouve la Statue de la Liberté ?', answer: 'États-Unis', hint: 'Ville: New York' },
			    { type: 'text', difficulty: 1, question: '🕌 Dans quel pays se trouve le Taj Mahal ?', answer: 'Inde', hint: 'Situé à Agra' },
			    { type: 'text', difficulty: 1, question: '🗿 Dans quel pays se trouve le Colisée ?', answer: 'Italie', hint: 'Capitale: Rome' },
			    { type: 'text', difficulty: 2, question: '🏰 Dans quel pays se trouve le château de Neuschwanstein ?', answer: 'Allemagne', hint: 'En Bavière' },
			    { type: 'text', difficulty: 2, question: '🕌 Dans quel pays se trouve la mosquée bleue ?', answer: 'Turquie', hint: 'Ville: Istanbul' },
			    { type: 'text', difficulty: 1, question: '🗼 Dans quel pays se trouve Big Ben ?', answer: 'Royaume-Uni', hint: 'Capitale: Londres' },
			    { type: 'text', difficulty: 1, question: '🏛️ Dans quel pays se trouve le Parthénon ?', answer: 'Grèce', hint: 'Capitale: Athènes' },
			    { type: 'text', difficulty: 1, question: '🕍 Dans quel pays se trouve la Sagrada Família ?', answer: 'Espagne', hint: 'Ville: Barcelone' },
			    { type: 'text', difficulty: 1, question: '🏯 Dans quel pays se trouve le Mont Fuji ?', answer: 'Japon', hint: 'Volcan sacré' },
    
			    // Anecdotes présidents/dirigeants
			    { type: 'text', difficulty: 1, question: '👔 Le président de ce pays est Emmanuel Macron', answer: 'France', hint: 'Élu en 2017' },
			    { type: 'text', difficulty: 1, question: '👔 Le président de ce pays est Joe Biden', answer: 'États-Unis', hint: 'Élu en 2020' },
				{ type: 'text', difficulty: 1, question: '👔 Le chancelier de ce pays est Friedrich Merz', answer: 'Allemagne', hint: 'Succède à Olaf Scholz en 2025' },
				{ type: 'text', difficulty: 2, question: '👑 Le roi de ce pays est Felipe VI', answer: 'Espagne', hint: 'Monarchie constitutionnelle' },
			    { type: 'text', difficulty: 2, question: '👔 Le Premier ministre de ce pays est Rishi Sunak', answer: 'Royaume-Uni', hint: 'Élu en 2022' },
    
			    // Faits culturels
			    { type: 'text', difficulty: 1, question: '🍕 Dans quel pays la pizza a-t-elle été inventée ?', answer: 'Italie', hint: 'Ville: Naples' },
			    { type: 'text', difficulty: 1, question: '🍣 Dans quel pays les sushis sont-ils originaires ?', answer: 'Japon', hint: 'Cuisine traditionnelle' },
			    { type: 'text', difficulty: 1, question: '🥐 Dans quel pays le croissant a-t-il été popularisé ?', answer: 'France', hint: 'Petit-déjeuner typique' },
			    { type: 'text', difficulty: 1, question: '🌮 Dans quel pays les tacos sont-ils originaires ?', answer: 'Mexique', hint: 'Cuisine traditionnelle' },
			    { type: 'text', difficulty: 1, question: '🍺 Dans quel pays se déroule l\'Oktoberfest ?', answer: 'Allemagne', hint: 'Ville: Munich' },
    
			    // Géographie
			    { type: 'text', difficulty: 1, question: '🏔️ Dans quel pays se trouve le Mont Everest (côté népalais) ?', answer: 'Népal', hint: 'Plus haute montagne du monde' },
			    { type: 'text', difficulty: 2, question: '🏜️ Dans quel pays se trouve le désert du Sahara (principalement) ?', answer: 'Algérie', hint: 'Plus grand désert chaud' },
			    { type: 'text', difficulty: 1, question: '🌊 Dans quel pays se trouve la Grande Barrière de Corail ?', answer: 'Australie', hint: 'Plus grand récif corallien' },
			    { type: 'text', difficulty: 1, question: '🌋 Dans quel pays se trouve le volcan Vésuve ?', answer: 'Italie', hint: 'Près de Naples' },
			    { type: 'text', difficulty: 1, question: '🏞️ Dans quel pays se trouvent les fjords les plus célèbres ?', answer: 'Norvège', hint: 'Pays scandinave' },
    
			    // Capitales
			    { type: 'text', difficulty: 1, question: '🏛️ Berlin est la capitale de quel pays ?', answer: 'Allemagne', hint: 'Pays d\'Europe centrale' },
			    { type: 'text', difficulty: 1, question: '🏛️ Madrid est la capitale de quel pays ?', answer: 'Espagne', hint: 'Pays ibérique' },
			    { type: 'text', difficulty: 1, question: '🏛️ Lisbonne est la capitale de quel pays ?', answer: 'Portugal', hint: 'À l\'ouest de l\'Espagne' },
			    { type: 'text', difficulty: 1, question: '🏛️ Amsterdam est la capitale de quel pays ?', answer: 'Pays-Bas', hint: 'Célèbre pour ses canaux' },
			    { type: 'text', difficulty: 1, question: '🏛️ Vienne est la capitale de quel pays ?', answer: 'Autriche', hint: 'Pays germanophone' },
    
			    // Sports
			    { type: 'text', difficulty: 2, question: '⚽ Dans quel pays le football a-t-il été inventé ?', answer: 'Royaume-Uni', hint: 'Angleterre, précisément' },
			    { type: 'text', difficulty: 1, question: '🏉 Dans quel pays le rugby est-il né ?', answer: 'Royaume-Uni', hint: 'Angleterre' },
			    { type: 'text', difficulty: 1, question: '🥋 Dans quel pays le judo a-t-il été créé ?', answer: 'Japon', hint: 'Art martial' },
			    { type: 'text', difficulty: 1, question: '⚽ Quel pays a remporté la Coupe du Monde 2018 ?', answer: 'France', hint: 'Équipe de Mbappé et Griezmann' },
				{ type: 'text', difficulty: 1, question: '🎾 De quel pays est originaire le champion Rafael Nadal ?', answer: 'Espagne', hint: 'Le roi de la terre battue' },
				{ type: 'text', difficulty: 1, question: '⚽ De quel pays est originaire la légende Pelé ?', answer: 'Brésil', hint: 'Il a remporté trois Coupes du Monde' },
				{ type: 'text', difficulty: 1, question: '🏒 Dans quel pays le hockey sur glace est-il le sport national par excellence ?', answer: 'Canada', hint: 'Célèbre pour ses hivers rigoureux' },
				{ type: 'text', difficulty: 1, question: '🏀 De quel pays est originaire la superstar LeBron James ?', answer: 'États-Unis', hint: 'Joueur de la NBA' },
				{ type: 'text', difficulty: 1, question: '🏎️ De quel pays est originaire le pilote de Formule 1 Max Verstappen ?', answer: 'Pays-Bas', hint: 'Il court sous les couleurs Red Bull' },
				{ type: 'text', difficulty: 2, question: '🥋 Dans quel pays l\'art martial du Taekwondo a-t-il été créé ?', answer: 'Corée du Sud', hint: 'Pays d\'Asie de l\'Est' },
				{ type: 'text', difficulty: 2, question: '⚽ De quel pays est originaire le footballeur Erling Haaland ?', answer: 'Norvège', hint: 'Un attaquant scandinave redoutable' },
				{ type: 'text', difficulty: 2, question: '🎾 De quel pays est originaire le joueur Roger Federer ?', answer: 'Suisse', hint: 'Maître de l\'élégance sur le court' },
				{ type: 'text', difficulty: 2, question: '🥊 De quel pays est originaire le boxeur Manny Pacquiao ?', answer: 'Philippines', hint: 'Légende vivante en Asie du Sud-Est' },
				{ type: 'text', difficulty: 2, question: '🏃 De quel pays est originaire le marathonien Eliud Kipchoge ?', answer: 'Kenya', hint: 'Domine les courses de fond mondiales' },
				{ type: 'text', difficulty: 3, question: '🎾 De quel pays est originaire la championne Ons Jabeur ?', answer: 'Tunisie', hint: 'Surnommée la Ministre du Bonheur' },
				{ type: 'text', difficulty: 3, question: '⚽ De quel pays est originaire l\'attaquant Khvicha Kvaratskhelia ?', answer: 'Géorgie', hint: 'Pays situé dans le Caucase' },
				{ type: 'text', difficulty: 3, question: '🏏 De quel pays est originaire l\'athlète Rashid Khan ?', answer: 'Afghanistan', hint: 'Star mondiale du cricket' },
				{ type: 'text', difficulty: 3, question: '🏎️ De quel pays est originaire le pilote de Formule 1 Charles Leclerc ?', answer: 'Monaco', hint: 'Il roule pour la Scuderia Ferrari' },
				{ type: 'text', difficulty: 3, question: '🏀 De quel pays est originaire le joueur NBA Giannis Antetokounmpo ?', answer: 'Grèce', hint: 'Surnommé le Greek Freak' },
    
			    // Drapeaux/Symboles
			    { type: 'text', difficulty: 1, question: '🦘 Quel pays a le kangourou comme symbole ?', answer: 'Australie', hint: 'Continent-pays' },
			    { type: 'text', difficulty: 1, question: '🐻 Quel pays a l\'ours comme symbole national ?', answer: 'Russie', hint: 'Plus grand pays du monde' },
			    { type: 'text', difficulty: 1, question: '🍁 Quel pays a une feuille d\'érable sur son drapeau ?', answer: 'Canada', hint: 'Drapeau rouge et blanc' },
				
// Monuments
{ type: 'text', difficulty: 3, question: '🗿 Dans quel pays se trouvent les Moaï ?', answer: 'Chili', hint: 'Île de Pâques' },
{ type: 'text', difficulty: 3, question: '🕌 Dans quel pays se trouve Angkor Wat ?', answer: 'Cambodge', hint: 'Temple bouddhiste' },
{ type: 'text', difficulty: 1, question: '🏛️ Dans quel pays se trouve Machu Picchu ?', answer: 'Pérou', hint: 'Cité inca dans les Andes' },

// Gastronomie
{ type: 'text', difficulty: 1, question: '🍝 Dans quel pays les pâtes sont-elles originaires ?', answer: 'Italie', hint: 'Cuisine méditerranéenne' },
{ type: 'text', difficulty: 1, question: '🥘 Dans quel pays la paella est-elle originaire ?', answer: 'Espagne', hint: 'Plat à base de riz' },
{ type: 'text', difficulty: 1, question: '🧀 Dans quel pays le fromage Gouda est-il originaire ?', answer: 'Pays-Bas', hint: 'Pays des moulins' },

// Nature
{ type: 'text', difficulty: 2, question: '🌊 Dans quel pays se trouvent les chutes Victoria ?', answer: 'Zimbabwe', hint: 'Frontière avec la Zambie' },
{ type: 'text', difficulty: 3, question: '🏜️ Dans quel pays se trouve le désert d\'Atacama ?', answer: 'Chili', hint: 'Le plus aride du monde' },
{ type: 'text', difficulty: 1, question: '🌳 Dans quel pays se trouve la forêt amazonienne (majoritairement) ?', answer: 'Brésil', hint: 'Poumon de la planète' },

// Culture
{ type: 'text', difficulty: 2, question: '🎭 Dans quel pays l\'opéra a-t-il été inventé ?', answer: 'Italie', hint: 'Renaissance italienne' },
{ type: 'text', difficulty: 2, question: '💃 Dans quel pays le tango est-il né ?', answer: 'Argentine', hint: 'Danse sensuelle' },
{ type: 'text', difficulty: 1, question: '🎸 Dans quel pays le flamenco est-il originaire ?', answer: 'Espagne', hint: 'Andalousie' },
				
// Monuments ultra-célèbres
{ type: 'text', difficulty: 1, question: '🗿 Dans quel pays se trouvent les pyramides de Gizeh ?', answer: 'Égypte', hint: 'Pharaons et Nil', difficulty: 1 },
{ type: 'text', difficulty: 1, question: '🎡 Dans quel pays se trouve la Grande Muraille ?', answer: 'Chine', hint: 'Visible depuis l\'espace' },
{ type: 'text', difficulty: 1, question: '🗼 Dans quel pays se trouve la Tour de Pise ?', answer: 'Italie', hint: 'Tour penchée célèbre' },
{ type: 'text', difficulty: 1, question: '🦘 Dans quel pays se trouve l\'Opéra de Sydney ?', answer: 'Australie', hint: 'Forme de coquillages' },
{ type: 'text', difficulty: 1, question: '🌉 Dans quel pays se trouve le Golden Gate ?', answer: 'États-Unis', hint: 'San Francisco' },

// Culture populaire
{ type: 'text', difficulty: 1, question: '🍕 Dans quel pays la pizza Margherita a-t-elle été créée ?', answer: 'Italie', hint: 'Naples, berceau de la pizza' },
{ type: 'text', difficulty: 1, question: '🥖 Dans quel pays la baguette est-elle un symbole national ?', answer: 'France', hint: 'Pain traditionnel' },
{ type: 'text', difficulty: 1, question: '🎅 Dans quel pays vit le Père Noël selon la légende ?', answer: 'Finlande', hint: 'Laponie' },
{ type: 'text', difficulty: 1, question: '🍫 Dans quel pays le chocolat suisse est-il fabriqué ?', answer: 'Suisse', hint: 'Montres et chocolat' },
{ type: 'text', difficulty: 1, question: '🦁 Dans quel pays se déroule le film Le Roi Lion ?', answer: 'Kenya', hint: 'Savane africaine' },
				
// Géographie et nature
{ type: 'text', difficulty: 2, question: '🌋 Dans quel pays se trouve le Kilimandjaro ?', answer: 'Tanzanie', hint: 'Plus haut sommet d\'Afrique' },
{ type: 'text', difficulty: 2, question: '🏔️ Dans quel pays se trouve le Cervin/Matterhorn ?', answer: 'Suisse', hint: 'Frontière italo-suisse' },
{ type: 'text', difficulty: 2, question: '🌊 Dans quel pays se trouvent les fjords de Geiranger ?', answer: 'Norvège', hint: 'Pays scandinave' },
{ type: 'text', difficulty: 2, question: '🏜️ Dans quel pays se trouve le désert de Gobi ?', answer: 'Mongolie', hint: 'Entre Chine et Mongolie' },
{ type: 'text', difficulty: 3, question: '💎 Dans quel pays se trouve le mine de diamants de Kimberley ?', answer: 'Afrique du Sud', hint: 'Ville des diamants' },

// Monuments moins connus
{ type: 'text', difficulty: 2, question: '🕌 Dans quel pays se trouve la mosquée Hassan II ?', answer: 'Maroc', hint: 'Casablanca' },
{ type: 'text', difficulty: 3, question: '🏛️ Dans quel pays se trouve Petra, la cité rose ?', answer: 'Jordanie', hint: 'Taillée dans la roche' },
{ type: 'text', difficulty: 2, question: '⛩️ Dans quel pays se trouvent plus de 10 000 temples bouddhistes ?', answer: 'Thaïlande', hint: 'Pays du sourire' },
{ type: 'text', difficulty: 3, question: '🏰 Dans quel pays se trouve le château de Bran (Dracula) ?', answer: 'Roumanie', hint: 'Transylvanie' },
{ type: 'text', difficulty: 2, question: '🗿 Dans quel pays se trouve Stonehenge ?', answer: 'Royaume-Uni', hint: 'Monument mégalithique' },

// Culture et traditions
{ type: 'text', difficulty: 1, question: '💃 Dans quel pays le carnaval de Rio est-il célébré ?', answer: 'Brésil', hint: 'Samba et couleurs' },
{ type: 'text', difficulty: 2, question: '🎭 Dans quel pays le théâtre Nô est-il originaire ?', answer: 'Japon', hint: 'Théâtre masqué' },
{ type: 'text', difficulty: 1, question: '🥘 Dans quel pays le curry est-il un plat national ?', answer: 'Inde', hint: 'Épices et saveurs' },
{ type: 'text', difficulty: 1, question: '🍷 Dans quel pays se trouve la région viticole de Porto ?', answer: 'Portugal', hint: 'Vin fortifié' },
{ type: 'text', difficulty: 2, question: '🎿 Dans quel pays se sont déroulés les premiers Jeux Olympiques d\'hiver ?', answer: 'France', hint: 'Chamonix 1924' },
				
// Géographie pointue
{ type: 'text', difficulty: 3, question: '🏔️ Dans quel pays se trouve le K2, deuxième sommet mondial ?', answer: 'Pakistan', hint: 'Frontière avec la Chine' },
{ type: 'text', difficulty: 3, question: '🌋 Dans quel pays se trouve le volcan Eyjafjallajökull ?', answer: 'Islande', hint: 'Éruption de 2010' },
{ type: 'text', difficulty: 3, question: '🏝️ Dans quel pays se trouve l\'archipel de Socotra ?', answer: 'Yémen', hint: 'Arbres dragon' },
{ type: 'text', difficulty: 3, question: '🏛️ Dans quel pays se trouve la cité antique de Carthage ?', answer: 'Tunisie', hint: 'Empire punique' },
{ type: 'text', difficulty: 3, question: '⛰️ Dans quel pays se trouve le mont Ararat ?', answer: 'Turquie', hint: 'Arche de Noé selon la Bible' },

// Histoire et culture
{ type: 'text', difficulty: 1, question: '🎭 Dans quel pays le Festival d\'Avignon a-t-il été créé ?', answer: 'France', hint: 'Théâtre et culture' },
{ type: 'text', difficulty: 1, question: '🎵 Dans quel pays Mozart est-il né ?', answer: 'Autriche', hint: 'Salzbourg' },
{ type: 'text', difficulty: 1, question: '🏛️ Dans quel pays se trouvait l\'Empire romain à son origine ?', answer: 'Italie', hint: 'La ville aux sept collines' },
{ type: 'text', difficulty: 1, question: '⚔️ Dans quel pays s\'est déroulée la Révolution française de 1789 ?', answer: 'France', hint: 'Prise de la Bastille' },
{ type: 'text', difficulty: 1, question: '⛩️ Quel pays a été dirigé par des Samouraïs pendant des siècles ?', answer: 'Japon', hint: 'Ère Edo' },
{ type: 'text', difficulty: 1, question: '🛡️ Quel pays actuel était le cœur de l\'Empire de Gengis Khan ?', answer: 'Mongolie', hint: 'Peuple cavalier nomade' },
{ type: 'text', difficulty: 1, question: '🚢 De quel pays est parti Christophe Colomb en 1492 ?', answer: 'Espagne', hint: 'Rois Catholiques' },
{ type: 'text', difficulty: 2, question: '🏛️ Dans quel pays se trouve le mur d\'Hadrien, vestige de l\'Empire romain ?', answer: 'Royaume-Uni', hint: 'Au nord de l\'Angleterre' },
{ type: 'text', difficulty: 2, question: '🏰 Quel pays a été le lieu de naissance de la Réforme protestante avec Martin Luther ?', answer: 'Allemagne', hint: 'Wittenberg, 1517' },
{ type: 'text', difficulty: 2, question: '🏺 Dans quel pays se trouvait l\'ancienne cité de Carthage ?', answer: 'Tunisie', hint: 'Ennemie de Rome' },
{ type: 'text', difficulty: 2, question: '🎭 Dans quel pays est née la Renaissance au XVe siècle ?', answer: 'Italie', hint: 'Florence en est le berceau' },
{ type: 'text', difficulty: 2, question: '🧱 Quel pays a été divisé par un mur de 1961 à 1989 ?', answer: 'Allemagne', hint: 'Guerre Froide' },
{ type: 'text', difficulty: 3, question: '👑 Dans quel pays se trouvait le royaume d\'Axoum ?', answer: 'Éthiopie', hint: 'Afrique de l\'Est' },
{ type: 'text', difficulty: 3, question: '⚔️ Dans quel pays se trouve le site de la bataille de Waterloo ?', answer: 'Belgique', hint: 'Défaite finale de Napoléon' },
{ type: 'text', difficulty: 3, question: '📜 Quel pays a vu naître la Magna Carta en 1215 ?', answer: 'Royaume-Uni', hint: 'Jean sans Terre' },
{ type: 'text', difficulty: 3, question: '🕌 Quel pays actuel était le centre de l\'Empire Ottoman ?', answer: 'Turquie', hint: 'Chute de Constantinople en 1453' },
{ type: 'text', difficulty: 3, question: '🏛️ Dans quel pays se trouvait la Mésopotamie (entre le Tigre et l\'Euphrate) ?', answer: 'Irak', hint: 'Berceau de l\'écriture' },
{ type: 'text', difficulty: 3, question: '📚 Dans quel pays se trouve la bibliothèque de Celsius ?', answer: 'Turquie', hint: 'Éphèse, ruines romaines' },
{ type: 'text', difficulty: 3, question: '🏺 Dans quel pays se trouve le site de Palmyre ?', answer: 'Syrie', hint: 'Reine Zénobie' },
{ type: 'text', difficulty: 3, question: '🎨 Dans quel pays le mouvement Bauhaus est-il né ?', answer: 'Allemagne', hint: 'École d\'art et d\'architecture' },
				
// Cinéma
{ type: 'text', difficulty: 1, question: '🧙 Dans quel pays a été filmée la trilogie du "Seigneur des Anneaux" ?', answer: 'Nouvelle-Zélande', hint: 'Paysages de la Terre du Milieu' },
{ type: 'text', difficulty: 1, question: '🎥 Dans quel pays se trouve le quartier de Bollywood ?', answer: 'Inde', hint: 'Ville de Mumbai' },
{ type: 'text', difficulty: 1, question: '🧛 De quel pays est originaire le personnage historique de Dracula ?', answer: 'Roumanie', hint: 'Région de Transylvanie' },
{ type: 'text', difficulty: 1, question: '🎩 Dans quel pays est né le cinéma avec les frères Lumière ?', answer: 'France', hint: 'Première projection en 1895' },
{ type: 'text', difficulty: 1, question: '🍿 Dans quel pays se déroule la majorité des films de Super-Héros Marvel ?', answer: 'États-Unis', hint: 'New York est souvent le décor' },

{ type: 'text', difficulty: 2, question: '🎬 Quel pays a produit le film oscarisé "Parasite" ?', answer: 'Corée du Sud', hint: 'Réalisé par Bong Joon-ho' },
{ type: 'text', difficulty: 2, question: '🕵️ Dans quel pays se déroule l\'intrigue de la série "La Casa de Papel" ?', answer: 'Espagne', hint: 'La Fabrique nationale de la monnaie' },
{ type: 'text', difficulty: 2, question: '🤖 De quel pays est originaire le réalisateur de "Blade Runner", Ridley Scott ?', answer: 'Royaume-Uni', hint: 'Réalisateur britannique' },
{ type: 'text', difficulty: 2, question: '🧟 Quel pays a produit le film d\'horreur culte "Ring" (l\'original) ?', answer: 'Japon', hint: 'Hideo Nakata, 1998' },
{ type: 'text', difficulty: 2, question: '🎞️ Dans quel pays se déroule le film "La Cité de Dieu" ?', answer: 'Brésil', hint: 'Favelas de Rio de Janeiro' },

{ type: 'text', difficulty: 3, question: '🎥 De quel pays est originaire le réalisateur Pedro Almodóvar ?', answer: 'Espagne', hint: 'Cinéaste de la Movida' },
{ type: 'text', difficulty: 3, question: '🎬 Dans quel pays a été tourné le film "Star Wars : Un nouvel espoir" pour les scènes de Tatooine ?', answer: 'Tunisie', hint: 'Décors de Matmata' },
{ type: 'text', difficulty: 3, question: '🎥 Quel pays est le lieu de naissance du mouvement cinématographique "Dogme 95" ?', answer: 'Danemark', hint: 'Lars von Trier' },
{ type: 'text', difficulty: 3, question: '🎞️ Quel pays a produit le célèbre film "Le Labyrinthe de Pan" ?', answer: 'Mexique', hint: 'Guillermo del Toro' },
{ type: 'text', difficulty: 3, question: '🎥 De quel pays est originaire l\'actrice Charlize Theron ?', answer: 'Afrique du Sud', hint: 'Née à Benoni'},												
				
// Extrêmement pointu
{ type: 'text', difficulty: 3, question: '🏛️ Dans quel pays se trouve Samarcande, sur la Route de la Soie ?', answer: 'Ouzbékistan', hint: 'Asie centrale' },
{ type: 'text', difficulty: 3, question: '⛪ Dans quel pays se trouve le monastère de Rila ?', answer: 'Bulgarie', hint: 'Patrimoine UNESCO' },
{ type: 'text', difficulty: 3, question: '🏰 Dans quel pays se trouve le fort de Gwalior ?', answer: 'Inde', hint: 'État du Madhya Pradesh' },
{ type: 'text', difficulty: 3, question: '🕌 Dans quel pays se trouve la mosquée de Djenné ?', answer: 'Mali', hint: 'Plus grande structure en terre' },
{ type: 'text', difficulty: 3, question: '🏛️ Dans quel pays se trouve la ville antique de Sigiriya ?', answer: 'Sri Lanka', hint: 'Rocher du Lion' },
    ],
    
    // Démarrer le jeu
    start(difficulty) {
        this.currentDifficulty = difficulty;
        this.currentQuestion = 0;
        this.score = 0;
        this.correct = 0;
        this.wrong = 0;
        
        // Filtrer les questions selon le niveau
        let filteredQuestions = [];
        
        if (difficulty === 'mix') {
            filteredQuestions = [...this.database];
        } else {
            filteredQuestions = this.database.filter(q => q.difficulty === difficulty);
        }
        
        if (filteredQuestions.length < 10) {
            alert(`⚠️ Pas assez de questions pour ce niveau (${filteredQuestions.length} disponibles).`);
            return;
        }
        
        // Sélectionner 10 questions aléatoires
        this.currentQuestions = filteredQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
        
        // Afficher le jeu
        document.getElementById('games-menu').style.display = 'none';
        document.getElementById('quiz-end').style.display = 'none';
        document.getElementById('quiz-game').style.display = 'block';
        document.getElementById('quiz-levels-menu').style.display = 'none';
        
        this.updateHeader();
        this.loadQuestion();
    },
    
    // Charger une question
    loadQuestion() {
        if (this.currentQuestion >= this.currentQuestions.length) {
            this.end();
            return;
        }
        
        const question = this.currentQuestions[this.currentQuestion];
        
        // Mettre à jour le score
        document.getElementById('quiz-score').textContent = `${this.currentQuestion + 1}`;
        document.getElementById('quiz-correct').textContent = this.correct;
        document.getElementById('quiz-wrong').textContent = this.wrong;
        
        // Afficher la question
        document.getElementById('quiz-question').textContent = question.question;
        document.getElementById('quiz-hint').textContent = '💡 ' + question.hint;
        
        // Masquer le feedback
        document.getElementById('quiz-feedback').style.display = 'none';
        document.getElementById('quiz-next-btn').style.display = 'none';
        
	    // Générer les options
	    const correctAnswer = question.answer;
	    const allCountries = [];
    
	    // ✅ CORRECTION : Vérifier que continents existe
	    if (!window.continents) {
	        console.error('❌ continents.js n\'est pas chargé !');
	        return;
	    }
    
	    Object.values(window.continents).forEach(continent => {
	        continent.countries.forEach(country => {
	            if (country !== correctAnswer) {
	                allCountries.push(country);
	            }
	        });
	    });
        
        const wrongAnswers = allCountries.sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
        
        // Afficher les options
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.style.cssText = 'padding: 20px; background: rgba(100, 100, 100, 0.3); border: 2px solid #666; border-radius: 10px; color: white; cursor: pointer; font-size: 16px; font-weight: bold; transition: all 0.3s;';
            
            btn.addEventListener('mouseenter', () => {
                if (!btn.disabled) {
                    btn.style.background = 'rgba(156, 39, 176, 0.4)';
                    btn.style.borderColor = '#9C27B0';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                if (!btn.disabled && !btn.classList.contains('correct') && !btn.classList.contains('wrong')) {
                    btn.style.background = 'rgba(100, 100, 100, 0.3)';
                    btn.style.borderColor = '#666';
                }
            });
            
            btn.onclick = () => this.checkAnswer(option, correctAnswer, btn);
            optionsContainer.appendChild(btn);
        });
    },
    
    // Vérifier la réponse
    checkAnswer(selected, correct, button) {
        const feedback = document.getElementById('quiz-feedback');
        const allButtons = document.querySelectorAll('#quiz-options button');
        
        // Désactiver tous les boutons
        allButtons.forEach(btn => btn.disabled = true);
        
        if (selected === correct) {
            this.score++;
            this.correct++;
            button.style.background = '#4CAF50';
            button.style.borderColor = '#4CAF50';
            button.classList.add('correct');
            
            feedback.style.display = 'block';
            feedback.style.background = 'rgba(76, 175, 80, 0.3)';
            feedback.style.color = '#4CAF50';
            feedback.textContent = '✓ Correct ! Bien joué !';
        } else {
            this.wrong++;
            button.style.background = '#f44336';
            button.style.borderColor = '#f44336';
            button.classList.add('wrong');
            
            allButtons.forEach(btn => {
                if (btn.textContent === correct) {
                    btn.style.background = '#4CAF50';
                    btn.style.borderColor = '#4CAF50';
                    btn.classList.add('correct');
                }
            });
            
            feedback.style.display = 'block';
            feedback.style.background = 'rgba(244, 67, 54, 0.3)';
            feedback.style.color = '#f44336';
            feedback.textContent = `✗ Incorrect ! La bonne réponse était ${correct}`;
        }
        
        document.getElementById('quiz-next-btn').style.display = 'inline-block';
    },
    
    // Question suivante
    next() {
        this.currentQuestion++;
        this.loadQuestion();
    },
    
    // Terminer le jeu
    end() {
        document.getElementById('quiz-game').style.display = 'none';
        document.getElementById('quiz-end').style.display = 'block';
        
        document.getElementById('final-score').textContent = this.score;
        
        const difficultyNames = {
            1: '🟢 Facile',
            2: '🟡 Moyen',
            3: '🔴 Difficile',
            'mix': '🎯 Mix'
        };
        
        const levelPlayed = document.createElement('div');
        levelPlayed.style.cssText = 'font-size: 16px; color: #888; margin-bottom: 20px;';
        levelPlayed.textContent = `Niveau: ${difficultyNames[this.currentDifficulty]}`;
        
        const finalScoreEl = document.getElementById('final-score');
        if (finalScoreEl.parentElement.querySelector('[style*="color: #888"]')) {
            finalScoreEl.parentElement.querySelector('[style*="color: #888"]').remove();
        }
        finalScoreEl.parentElement.appendChild(levelPlayed);
        
        const messageEl = document.getElementById('quiz-message');
        let message = '';
        
        if (this.score === 10) {
            message = this.currentDifficulty === 3 ? 
                '🏆 INCROYABLE ! Tu es un EXPERT absolu en géographie !' : 
                '🎉 Parfait ! Tu es un vrai expert !';
            messageEl.style.color = '#FFD700';
        } else if (this.score >= 7) {
            message = this.currentDifficulty === 3 ? 
                '🌟 Excellent ! Très impressionnant pour ce niveau !' : 
                '👍 Excellent travail ! Tu connais bien le monde !';
            messageEl.style.color = '#4CAF50';
        } else if (this.score >= 5) {
            message = this.currentDifficulty === 1 ? 
                '😊 Pas mal ! Continue à explorer !' : 
                '💪 Bon effort ! Ce niveau est difficile !';
            messageEl.style.color = '#FF9800';
        } else {
            message = this.currentDifficulty === 3 ? 
                '🎯 Ce niveau est très difficile ! Réessaie en mode Facile d\'abord !' : 
                '💪 C\'est un début ! Voyage plus pour améliorer ton score !';
            messageEl.style.color = '#2196F3';
        }
        
        messageEl.textContent = message;
    },
    
    // Mettre à jour l'en-tête
    updateHeader() {
        const header = document.querySelector('#quiz-game > div:first-child');
        
        let difficultyBadge = '';
        let color = '';
        
        switch(this.currentDifficulty) {
            case 1:
                difficultyBadge = '🟢 FACILE';
                color = '#4CAF50';
                break;
            case 2:
                difficultyBadge = '🟡 MOYEN';
                color = '#FF9800';
                break;
            case 3:
                difficultyBadge = '🔴 DIFFICILE';
                color = '#f44336';
                break;
            case 'mix':
                difficultyBadge = '🎯 MIX';
                color = '#9C27B0';
                break;
        }
        
        if (!document.getElementById('difficulty-badge')) {
            const badge = document.createElement('div');
            badge.id = 'difficulty-badge';
            badge.style.cssText = `display: inline-block; padding: 8px 16px; background: ${color}; border-radius: 20px; font-size: 14px; font-weight: bold; margin-left: 15px;`;
            badge.textContent = difficultyBadge;
            
            header.querySelector('span').insertAdjacentElement('afterend', badge);
        }
    }
};

// Fonctions globales pour les boutons HTML
window.showQuizLevels = function() {
    document.getElementById('games-menu').style.display = 'none';
    document.getElementById('quiz-levels-menu').style.display = 'block';
};

window.startQuizGame = function(difficulty) {
    window.QuizGame.start(difficulty);
};

window.nextQuizQuestion = function() {
    window.QuizGame.next();
};