import {AccessToken, Credentials, User, UserSessionToken} from './users.resources'

class AuthService {
    baseURL = 'http://localhost:8080/api/users';
    static AUTH_PARAM: string = '_auth';

    async authenticate(credentials: Credentials) : Promise<AccessToken> {
        const response = await fetch(`${this.baseURL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        if(response.status == 401) {
            throw new Error('Credenciais inválidas');
        }

        return await response.json();
    }
}

export const useAuth = () => new AuthService();