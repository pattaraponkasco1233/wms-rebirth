// src/auth/jwt/jwtDefaultConfig.ts

export interface JwtConfig {
  loginEndpoint: string;
  refreshEndpoint: string;
  logoutEndpoint: string;
  loginLdapEndpoint: string;

  tokenType: string;
  apiKey: string;

  storageTokenKeyName: string;
  storageRefreshTokenKeyName: string;
}

const jwtDefaultConfig: JwtConfig = {
  loginEndpoint: '/auth/login',
  refreshEndpoint: '/auth/refresh',
  logoutEndpoint: '/auth/logout',
  loginLdapEndpoint: '/ldap/login',

  tokenType: 'Bearer',
  apiKey: 'VE1TX0FVVEhJQ0FUSU9O', // S0FTQ09fV01TX0dBVEVXQVlfQVBJX0FVVEhFTg==

  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
};

export default jwtDefaultConfig;