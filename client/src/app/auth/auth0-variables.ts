interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'AjGHm326BZLYYg9-7YNY6Rzn1QbVKFbn',
  domain: 'tinyurl.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};
