class Auth {
    authenticated: boolean | any;

    constructor() {
        this.authenticated = false;
    }

    login(callback: Function) {
        this.authenticated = true;
        localStorage.setItem('isAuth', this.authenticated);
        callback();
    }


    logout(callback: Function) {
        this.authenticated = false;
        localStorage.clear();
        callback();
    }

    isAuthenticated() {
        const isAuth = localStorage.getItem('isAuth')
        if (isAuth) return this.authenticated = true;
        if (!isAuth) return this.authenticated = false
    }

    // Validations
    validateEmail(email: string) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;
        }
        alert('You have entered an invalid email address!');
        return false;
    }
}

export default new Auth();
