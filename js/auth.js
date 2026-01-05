// Inscription
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
        console.error('Erreur inscription:', error);
        showNotification(error.message, 'error', 'Erreur d\'inscription');
    } else {
        showNotification('Vérifie ton email pour confirmer ton compte', 'success', 'Inscription réussie');
        
        // Créer le profil
        await supabaseClient.from('profiles').insert({
            id: data.user.id,
            username: username,
            email: email
        });
    }
}

// Connexion
async function signIn(email, password) {
    const { error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error('Erreur connexion:', error);
        showNotification(error.message, 'error', 'Erreur de connexion');
    } else {
        showNotification('Tu es maintenant connecté', 'success', 'Connexion réussie');
        location.reload();
    }
}

// Déconnexion
async function signOut() {
    await supabaseClient.auth.signOut();
    alert('✅ Déconnexion réussie');
    window.location.reload();
}

// Synchroniser localStorage → Supabase
async function syncLocalToCloud() {
    const user = await getCurrentUser();
    if (!user) return;
    
    // Récupérer les données localStorage
    const localData = JSON.parse(localStorage.getItem('travelData') || '{}');
    
    // Envoyer chaque pays visité vers Supabase
    for (const [country, data] of Object.entries(localData)) {
        await supabaseClient.from('visited_countries').upsert({
            user_id: user.id,
            country_name: country,
            notes: data.notes,
            rating: data.rating,
            budget: data.budget,
            visit_date: data.date,
            photos: data.photos,
            activities: data.activities,
            companions: data.companions
        });
    }
    
    console.log('✅ Données synchronisées vers Supabase');
}

window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;
