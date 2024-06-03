import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(credentials: { username: string, password: string }): boolean {
    // Hardcoded user authentication
    return credentials.username === 'admin' && credentials.password === 'admin';
  }
  constructor() {

   }
}
