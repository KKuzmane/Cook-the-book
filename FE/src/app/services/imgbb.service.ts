import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImgbbService {
    private baseUrl = 'https://localhost:7150/api/Imgbb';

    constructor(private http: HttpClient) { }

    uploadPhoto(photo: File, apiKey: string): Observable<string> {
        const formData = new FormData();
        formData.append('photo', photo);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${apiKey}`);
        return this.http.post(`${this.baseUrl}/UploadPhoto`, formData, { headers, responseType: 'text' });
    }
}
