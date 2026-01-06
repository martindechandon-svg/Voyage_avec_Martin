// Inscription
// Inscription
async function signUp(email, password, username) {
    // D'abord créer l'utilisateur avec le username dans les metadata
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username
            }
        }
    });
    
    if (error) {
        alert('Erreur inscription : ' + error.message);
        return null;
    }
    
    // Créer manuellement le profil (au cas où le trigger ne marche pas)
    if (data.user) {
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert({
                id: data.user.id,
                username: username
            });
        
        if (profileError) {
            console.error('Erreur création profil:', profileError);
        }
    }
    
    alert('✅ Compte créé ! Tu peux maintenant te connecter.');
    closeAuthModal();
    return data.user;
}

// Connexion
async function signIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) {
        alert('Erreur connexion : ' + error.message);
        return null;
    }
    
    // 1 - D'abord synchroniser local -> cloud
    await syncLocalToCloud();
    
    // 2 - Puis telecharger cloud -> local (pour avoir la version fusionnee)
    await syncCloudToLocal();
    
    alert('Connexion reussie !');
    window.location.reload();
    return data.user;
}

// Déconnexion
async function signOut() {
    await supabaseClient.auth.signOut();
    alert('✅ Déconnexion réussie');
    window.location.reload();
}

// Synchroniser localStorage → Supabase
// Remplace syncLocalToCloud par cette version amelioree dans auth.js

async function syncLocalToCloud() {
    const user = await getCurrentUser();
    if (!user) return;
    
    console.log('Synchronisation intelligente en cours...');
    
    // 1 - Recuperer les donnees locales
    const localVisited = JSON.parse(localStorage.getItem('travelData') || '{}');
    const localBucket = JSON.parse(localStorage.getItem('bucketList') || '{}');
    const localItineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
    
    // 2 - Recuperer les donnees cloud
    const { data: cloudVisited } = await supabaseClient
        .from('visited_countries')
        .select('*')
        .eq('user_id', user.id);
    
    const { data: cloudBucket } = await supabaseClient
        .from('bucket_list')
        .select('*')
        .eq('user_id', user.id);
    
    const { data: cloudItineraries } = await supabaseClient
        .from('itineraries')
        .select('*')
        .eq('user_id', user.id);
    
    // 3 - FUSIONNER LES PAYS VISITES
    const cloudCountries = new Set((cloudVisited || []).map(c => c.country_name));
    
    for (const [country, data] of Object.entries(localVisited)) {
        if (!cloudCountries.has(country)) {
            // Pays uniquement en local -> Ajouter au cloud
            await supabaseClient.from('visited_countries').insert({
                user_id: user.id,
                country_name: country,
                notes: data.notes,
                rating: data.rating,
                budget: data.budget,
                visit_date: data.date,
                photos: data.photos || [],
                activities: data.activities || {},
                companions: data.companions || []
            });
            console.log(`${country} ajoute au cloud`);
        } else {
            // Pays existe deja -> Garder la version la plus recente
            const cloudVersion = cloudVisited.find(c => c.country_name === country);
            const localDate = new Date(data.date);
            const cloudDate = new Date(cloudVersion.visit_date);
            
            if (localDate > cloudDate) {
                // Version locale plus recente -> Mettre a jour le cloud
                await supabaseClient.from('visited_countries')
                    .update({
                        notes: data.notes,
                        rating: data.rating,
                        budget: data.budget,
                        visit_date: data.date,
                        photos: data.photos || [],
                        activities: data.activities || {},
                        companions: data.companions || []
                    })
                    .eq('user_id', user.id)
                    .eq('country_name', country);
                console.log(`${country} mis a jour (version locale plus recente)`);
            } else {
                console.log(`${country} deja a jour sur le cloud`);
            }
        }
    }
    
    // 4 - FUSIONNER LA BUCKET LIST
    const cloudBucketCountries = new Set((cloudBucket || []).map(c => c.country_name));
    
    for (const [country, data] of Object.entries(localBucket)) {
        if (!cloudBucketCountries.has(country)) {
            await supabaseClient.from('bucket_list').insert({
                user_id: user.id,
                country_name: country,
                added_date: data.addedDate,
                reason: data.reason,
                priority: data.priority
            });
            console.log(`Bucket: ${country} ajoute au cloud`);
        }
    }
    
    // 5 - FUSIONNER LES ITINERAIRES
    const cloudItineraryNames = new Set((cloudItineraries || []).map(i => i.name));
    
    for (const itinerary of localItineraries) {
        if (!cloudItineraryNames.has(itinerary.name)) {
            await supabaseClient.from('itineraries').insert({
                user_id: user.id,
                name: itinerary.name,
                steps: itinerary.steps,
                created_at: itinerary.createdAt
            });
            console.log(`Itineraire: ${itinerary.name} ajoute au cloud`);
        }
    },
	// A ajouter dans auth.js
	async function syncCloudToLocal() {
	    const user = await getCurrentUser();
	    if (!user) return;
    
	    console.log('Telechargement depuis le cloud...');
    
	    // Recuperer toutes les donnees cloud
	    const { data: cloudVisited } = await supabaseClient
	        .from('visited_countries')
	        .select('*')
	        .eq('user_id', user.id);
    
	    const { data: cloudBucket } = await supabaseClient
	        .from('bucket_list')
	        .select('*')
	        .eq('user_id', user.id);
    
	    const { data: cloudItineraries } = await supabaseClient
	        .from('itineraries')
	        .select('*')
	        .eq('user_id', user.id);
    
	    // Convertir en format localStorage
	    const visitedCountries = {};
	    (cloudVisited || []).forEach(row => {
	        visitedCountries[row.country_name] = {
	            visited: true,
	            notes: row.notes,
	            rating: row.rating,
	            date: row.visit_date,
	            budget: row.budget,
	            photos: row.photos || [],
	            activities: row.activities || {},
	            companions: row.companions || []
	        };
	    });
    
	    const bucketList = {};
	    (cloudBucket || []).forEach(row => {
	        bucketList[row.country_name] = {
	            addedDate: row.added_date,
	            reason: row.reason,
	            priority: row.priority
	        };
	    });
    
	    const itineraries = (cloudItineraries || []).map(row => ({
	        name: row.name,
	        steps: row.steps,
	        createdAt: row.created_at
	    }));
    
	    // Sauver en localStorage
	    localStorage.setItem('travelData', JSON.stringify(visitedCountries));
	    localStorage.setItem('bucketList', JSON.stringify(bucketList));
	    localStorage.setItem('itineraries', JSON.stringify(itineraries));
    
	    console.log('Donnees cloud sauvegardees en local');
	}
    
    console.log('Synchronisation terminee !');
}
    
    console.log('✅ Données synchronisées vers Supabase');
}

window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;
window.syncCloudToLocal = syncCloudToLocal;
