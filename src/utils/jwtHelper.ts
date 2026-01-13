// src/utils/jwtHelper.ts

/**
 * Decode JWT token without verification
 * @param token JWT token string
 * @returns Decoded payload or null
 */
export const decodeJWT = (token: string): any | null => {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;

        const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + (c.codePointAt(0) ?? 0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

/**
 * Check if JWT token is expired
 * @param token JWT token string
 * @returns true if token is expired, false otherwise
 */
export const isTokenExpired = (token: string | null | undefined): boolean => {
    if (!token) return true;

    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;

    // exp is in seconds, Date.now() is in milliseconds
    const currentTime = Date.now() / 1000;

    // Add a 30 second buffer to refresh before actual expiration
    return decoded.exp < currentTime + 30;
};

/**
 * Get token expiration time
 * @param token JWT token string
 * @returns Expiration timestamp or null
 */
export const getTokenExpiration = (token: string | null | undefined): number | null => {
    if (!token) return null;

    const decoded = decodeJWT(token);
    return decoded?.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
};

/**
 * Get time remaining until token expires
 * @param token JWT token string
 * @returns Time remaining in milliseconds or 0 if expired
 */
export const getTokenTimeRemaining = (token: string | null | undefined): number => {
    const expiration = getTokenExpiration(token);
    if (!expiration) return 0;

    const remaining = expiration - Date.now();
    return Math.max(0, remaining);
};
