import auth0 from 'auth0-js';

export default class Auth {
    constructor(history){
        this.history = history;
        this.userProfile = null;
        this.requestedScopes = "openid profile email  read:courses"
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENTID,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            responseType: "token id_token",
            scope: this.requestedScopes
        });
    }
    

    login = () => {
        this.auth0.authorize();
    } 


    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) =>{
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult)
                this.history.push("/")
            } else {
                if (err) {
                    this.history.push("/")
                    alert(`Error: ${err.error}`)
                    console.error(err);
                }
            }
        } )
    }


    setSession = authResult => {
        // set time that accessToken will expire
        const expireAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime() );

        const scopes = authResult.scope || this.requestedScopes || '';

        localStorage.setItem("Access Token", authResult.accessToken);
        localStorage.setItem("Id Token", authResult.idToken);
        localStorage.setItem("expires_at", expireAt);
        localStorage.setItem("scopes", JSON.stringify(scopes));
    }


    isAutheticated() {
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt
    }

    logout = () => {
        localStorage.removeItem("Access Token");
        localStorage.removeItem("Id Token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("scopes");
        this.userProfile = null;
        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENTID,
            returnTo: 'http://localhost:3000/'
        })
    }


    getAccessToken = () => {
        const accessToken = localStorage.getItem("Access Token");

        if (!accessToken) {
            throw new Error("No Access token found.");
        }
        return accessToken;
    }

    getProfile = cb => {
        if (this.userProfile) return cb(this.userProfile);
        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
            if (profile) this.userProfile = profile;
            cb(profile,err)
        })
    }


    userHasScopes(scopes) {
        const grantedScopes = (
            JSON.parse(localStorage.getItem("scopes")) || ""
        ).split(" ");

        return scopes.every(scope => grantedScopes.includes(scope));
    }
}