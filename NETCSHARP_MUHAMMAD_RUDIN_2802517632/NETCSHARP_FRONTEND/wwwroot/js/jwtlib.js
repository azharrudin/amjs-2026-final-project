class JWTManager {
    constructor({ loginEndpoint = 'http://localhost:5189/api/v1/auth/login', validateEndpoint = 'http://localhost:5189/api/v1/auth/validation', cookieName = 'jwt_token' } = {}) {
        this.loginEndpoint = loginEndpoint;
        this.validateEndpoint = validateEndpoint;
        this.cookieName = cookieName;
    }

    async login(credentials) {
        const res = await fetch(this.loginEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        if (!res.ok) {
            const json = await res.json();
            return json
        }

        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (ct.includes('application/json')) {
            const json = await res.json();
            if (json?.token) this._setCookie(this.cookieName, json.token, json.expiresIn);
            return json;
        }

        return { ok: true };
    }
    async register(credentials) {
        const res = await fetch("http://localhost:5189/api/v1/auth/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        if (!res.ok) {
            const json = await res.json();
            return json
        }

        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (ct.includes('application/json')) {
            const json = await res.json();
            if (json?.token) this._setCookie(this.cookieName, json.token, json.expiresIn);
            return json;
        }

        return { ok: true };
    }
    async validate() {
        const token = this._getCookie(this.cookieName);
        console.log(token)
        if (token == null) {
            alert("session expired")
            return {
                valid: false,
                status: null
            }
        }
        const init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                token: token
            })
        };

        const res = await fetch(this.validateEndpoint, init);
        const json = await res.json()
        console.log(json)
        return { valid: json.validation, status: res.status, name: json.username};
    
     
    }

    unsetCookie() {
        this._deleteCookie(this.cookieName);
    }

    _setCookie(name, value, maxAgeSec) {
        const maxAge = Number.isFinite(maxAgeSec) ? `;max-age=${maxAgeSec}` : '';
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};path=/${maxAge};SameSite=Lax`;
    }

    _getCookie(name) {
        const key = encodeURIComponent(name) + '=';
        if (!document.cookie) return null;
        return document.cookie.split(';').map(s => s.trim()).reduce((found, part) => {
            return found ?? (part.startsWith(key) ? decodeURIComponent(part.substring(key.length)) : null);
        }, null);
    }

    _deleteCookie(name) {
        document.cookie = `${encodeURIComponent(name)}=;path=/;max-age=0;SameSite=Lax`;
    }
}

