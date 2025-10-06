// --- The Writer's Academy Authentication System ---

// This is where your valid student keys are stored.
// For security, we only store a "hash" of the key, not the key itself.
// I have started you with one key. You will add more using your admin page.
const VALID_KEY_HASHES = new Set([
    "1f43899a613c90714c6b8a82914207906b864b41a02715761358606c116d123d" // This is the SHA-256 hash for the key "academy-key-123"
    "17621ce3228ab52045cb85b2f3efdce08c38b2a50bc474fe7248dd5debac6f5b",
    "56eb32d6e3ef4487863c00619824cb8d49624904a3679ea6c2084c365f97954c",
]);

const auth = {
    // A simple but effective hashing function to protect the keys.
    async sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    // --- Student Functions ---

    // Checks if the entered key is valid.
    async login(key) {
        const keyHash = await this.sha256(key);
        if (VALID_KEY_HASHES.has(keyHash)) {
            // If valid, store a session token in the browser's memory.
            localStorage.setItem('academy_session_token', JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
            return true;
        }
        return false;
    },

    // Logs the user out by deleting the session token.
    logout() {
        localStorage.removeItem('academy_session_token');
        window.location.href = './index.html';
    },

    // Checks if the user has a valid session token.
    isLoggedIn() {
        const token = localStorage.getItem('academy_session_token');
        if (!token) return false;
        // Optional: You could add a check here to make the token expire.
        return JSON.parse(token).loggedIn === true;
    },

    // --- Admin-Only Functions ---

    // Generates a new key and its hash for the admin page.
    async generateKey() {
        const newKey = `academy-key-${Math.random().toString(36).substr(2, 9)}`;
        const newHash = await this.sha256(newKey);
        return { newKey, newHash };
    }
};
