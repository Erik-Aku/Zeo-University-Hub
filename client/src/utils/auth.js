import decode from 'jwt-decode';

// AuthService class to handle authentication operations
class AuthService {
    // Decodes and returns the user profile from the token
    getProfile() {
        return decode(this.getToken());
    }

    // Checks if the user is logged in by verifying the token's existence and expiration
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }

    // Checks if the token has expired
    isTokenExpired(token) {
        const decoded = decode(token);
        return decoded.exp < Date.now() / 1000;
    }

    // Retrieves the token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // Sets the token in localStorage and redirects to the home page
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // Clears the token and user-related data from localStorage on logout
    logout() {
        localStorage.removeItem('id_token');
        localStorage.clear();
        window.location.assign('/');
    }
}

export default new AuthService();
