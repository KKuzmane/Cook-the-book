import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.baseUrl}/api/User`;

    constructor(private http: HttpClient) { }

    registerUser(request: LoginRequest): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, request);
    }

    login(request: LoginRequest): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, request);
    }

    getUser(username: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${username}`);
    }
}