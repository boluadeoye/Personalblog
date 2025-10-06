import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// --- PASTE YOUR SUPABASE CREDENTIALS HERE ---
const SUPABASE_URL = 'https://tymxwenhyhzzpanncbym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bXh3ZW5oeWh6enBhbm5jYnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTQwMjEsImV4cCI6MjA3NTMzMDAyMX0.qQZakoPPmwE2zEBDEra5JM0aI0_3joxlSc5SJ9XZDP0';
// ---------------------------------------------

const supabase = createClient(https://tymxwenhyhzzpanncbym.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bXh3ZW5oeWh6enBhbm5jYnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTQwMjEsImV4cCI6MjA3NTMzMDAyMX0.qQZakoPPmwE2zEBDEra5JM0aI0_3joxlSc5SJ9XZDP0);

const auth = {
    getUser: () => supabase.auth.user(),
    login: async (email, password) => {
        const { user, error } = await supabase.auth.signIn({ email, password });
        return { user, error };
    },
    logout: async () => {
        await supabase.auth.signOut();
        window.location.reload();
    },
    onAuthStateChange: (callback) => {
        supabase.auth.onAuthStateChange((event, session) => {
            callback(session?.user || null);
        });
    }
};

const database = {
    async getLessons() {
        const { data, error } = await supabase.from('lessons').select('*').order('id');
        return { data, error };
    },
    // NEW FUNCTION ADDED HERE
    async getSingleLesson(lessonId) {
        const { data, error } = await supabase.from('lessons').select('*').eq('id', lessonId).single();
        return { data, error };
    }
};

export { auth, database };
