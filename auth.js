import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// --- PASTE YOUR SUPABASE CREDENTIALS HERE ---
const SUPABASE_URL = 'https://tymxwenhyhzzpanncbym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bXh3ZW5oeWh6enBhbm5jYnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTQwMjEsImV4cCI6MjA3NTMzMDAyMX0.qQZakoPPmwE2zEBDEra5JM0aI0_3joxlSc5SJ9XZDP0';
// ---------------------------------------------

const supabase = createClient(https://tymxwenhyhzzpanncbym.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bXh3ZW5oeWh6enBhbm5jYnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTQwMjEsImV4cCI6MjA3NTMzMDAyMX0.qQZakoPPmwE2zEBDEra5JM0aI0_3joxlSc5SJ9XZDP0);

const auth = {
    // Get the currently logged-in user
    getUser: () => supabase.auth.user(),

    // Sign in a user with their email and password
    login: async (email, password) => {
        const { user, error } = await supabase.auth.signIn({ email, password });
        return { user, error };
    },

    // Sign out the current user
    logout: async () => {
        await supabase.auth.signOut();
        window.location.href = './index.html'; // Redirect to home after logout
    },

    // A listener that triggers when the user's auth state changes (login/logout)
    onAuthStateChange: (callback) => {
        supabase.auth.onAuthStateChange((event, session) => {
            callback(session?.user || null);
        });
    }
};

const database = {
    // Fetch all lessons based on whether the user is logged in
    async getLessons() {
        // Supabase RLS automatically filters the lessons based on the user's auth state
        const { data, error } = await supabase.from('lessons').select('*').order('id');
        return { data, error };
    }
};

// Export the auth and database objects to be used by other pages
export { auth, database };
