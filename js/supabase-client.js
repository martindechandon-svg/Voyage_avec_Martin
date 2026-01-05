// Configuration Supabase
const SUPABASE_URL = 'https://thwotqbtokxagqysakvs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRod290cWJ0b2t4YWdxeXNha3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MTEzNjgsImV4cCI6MjA4MzE4NzM2OH0.zVamNV1pNBhbWeopBZMsCeXAyxaaVg4_s2wDQnIsspI';

// Créer le client Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Vérifier si l'utilisateur est connecté
async function getCurrentUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

// Mode de stockage : 'local' ou 'cloud'
let storageMode = 'local';

async function initStorageMode() {
    const user = await getCurrentUser();
    storageMode = user ? 'cloud' : 'local';
    console.log('📦 Mode stockage:', storageMode);
}
// Récupérer le profil complet de l'utilisateur
async function getUserProfile() {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const { data, error } = await supabaseClient
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
    
    if (error) {
        console.error('Erreur récupération profil:', error);
        return null;
    }
    
    return data;
}

// À la fin du fichier, ajoute :
window.getUserProfile = getUserProfile;

// Rendre accessible globalement
window.supabaseClient = supabaseClient;
window.getCurrentUser = getCurrentUser;
window.storageMode = storageMode;
window.initStorageMode = initStorageMode;