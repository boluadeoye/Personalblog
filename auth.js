// --- The Writer's Academy Authentication System ---

const VALID_KEY_HASHES = new Set([
    "1f43899a613c90714c6b8a82914207906b864b41a02715761358606c116d123d" // Hash for "academy-key-123"
    "17621ce3228ab52045cb85b2f3efdce08c38b2a50bc474fe7248dd5debac6f5b",
    "56eb32d6e3ef4487863c00619824cb8d49624904a3679ea6c2084c365f97954c",
]);

const auth = {
    async sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    async login(key) {
        const keyHash = await this.sha256(key);
        if (VALID_KEY_HASHES.has(keyHash)) {
            localStorage.setItem('academy_session_token', JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem('academy_session_token');
        window.location.href = './index.html';
    },

    isLoggedIn() {
        const token = localStorage.getItem('academy_session_token');
        if (!token) return false;
        return JSON.parse(token).loggedIn === true;
    },

    async generateKey() {
        const newKey = `academy-key-${Math.random().toString(36).substr(2, 9)}`;
        const newHash = await this.sha256(newKey);
        return { newKey, newHash };
    }
};

// --- NEW LINE ADDED HERE ---
export { auth };
