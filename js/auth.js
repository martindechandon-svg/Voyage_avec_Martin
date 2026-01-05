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
    
    alert('✅ Compte créé ! Vérifie ton email pour confirmer.');
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
    
    alert('✅ Connexion réussie !');
    await syncLocalToCloud(); // Synchroniser les données localStorage
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