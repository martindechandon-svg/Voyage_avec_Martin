// Inscription
async function signUp(email, password, username) {
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
    
    if (data.user) {
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert({
                id: data.user.id,
                username: username
            });
        
        if (profileError) {
            console.error('Erreur creation profil:', profileError);
        }
    }
    
    alert('Compte cree ! Tu peux maintenant te connecter.');
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
    
    await syncLocalToCloud();
    await syncCloudToLocal();
    
    alert('Connexion reussie !');
    window.location.reload();
    return data.user;
}

// Deconnexion
async function signOut() {
    await supabaseClient.auth.signOut();
    alert('Deconnexion reussie');
    window.location.reload();
}

// Synchroniser localStorage -> Supabase
async function syncLocalToCloud() {
    const user = await getCurrentUser();
    if (!user) return;
    
    console.log('Synchronisation intelligente en cours...');
    
    const localVisited = JSON.parse(localStorage.getItem('travelData') || '{}');
    const localBucket = JSON.parse(localStorage.getItem('bucketList') || '{}');
    const localItineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
    
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
    
    const cloudCountries = new Set((cloudVisited || []).map(c => c.country_name));
    
    for (const [country, data] of Object.entries(localVisited)) {
        if (!cloudCountries.has(country)) {
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
            console.log(country + ' ajoute au cloud');
        } else {
            const cloudVersion = cloudVisited.find(c => c.country_name === country);
            const localDate = new Date(data.date);
            const cloudDate = new Date(cloudVersion.visit_date);
            
            if (localDate > cloudDate) {
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
                console.log(country + ' mis a jour');
            }
        }
    }
    
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
            console.log('Bucket: ' + country + ' ajoute au cloud');
        }
    }
    
    const cloudItineraryNames = new Set((cloudItineraries || []).map(i => i.name));
    
    for (const itinerary of localItineraries) {
        if (!cloudItineraryNames.has(itinerary.name)) {
            await supabaseClient.from('itineraries').insert({
                user_id: user.id,
                name: itinerary.name,
                steps: itinerary.steps,
                created_at: itinerary.createdAt
            });
            console.log('Itineraire: ' + itinerary.name + ' ajoute au cloud');
        }
    }
    
    console.log('Synchronisation terminee !');
}

// Synchroniser Supabase -> localStorage
async function syncCloudToLocal() {
    const user = await getCurrentUser();
    if (!user) return;
    
    console.log('Telechargement depuis le cloud...');
    
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
    
    localStorage.setItem('travelData', JSON.stringify(visitedCountries));
    localStorage.setItem('bucketList', JSON.stringify(bucketList));
    localStorage.setItem('itineraries', JSON.stringify(itineraries));
    
    console.log('Donnees cloud sauvegardees en local');
}

window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;
window.syncCloudToLocal = syncCloudToLocal;
