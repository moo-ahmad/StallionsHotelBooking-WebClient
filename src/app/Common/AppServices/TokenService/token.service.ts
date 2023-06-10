import { Injectable } from '@angular/core';
import { TokenResponse } from 'src/app/Models/Response/token-response';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  userRole: string = '';
  constructor() { }
  saveSession(tokenReponse: TokenResponse){
    window.localStorage.setItem('AT', tokenReponse.token);
    window.localStorage.setItem('ED', tokenReponse.expiration);
    this.userRole = this.getUserRole(tokenReponse.token);
    window.localStorage.setItem('role', this.userRole);
  }

  getSession(): TokenResponse | null {
    if(window.localStorage.getItem('AT')){
      const tokenResponse: TokenResponse = {
        token: window.localStorage.getItem('AT') || '',
        expiration: window.localStorage.getItem('ED') || ''
      };
      return tokenResponse;
    }
    return null;
  }

  clearSession(){
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    let session = this.getSession();
    if(!session){
      return false;
    }
    return true;
  }

  private getUserRole(token: string){
    var payload = JSON.parse(atob(token.split('.')[1]));
    return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  }
}

