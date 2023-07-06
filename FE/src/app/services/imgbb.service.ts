import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImgbbService {
    private baseUrl = 'https://localhost:7150/api/Imgbb';

    constructor(private http: HttpClient) { }

    uploadPhoto(photo: File): Observable<string> {
        const formData = new FormData();
        formData.append('photo', photo);

        return this.http.post<string>(`${this.baseUrl}/UploadPhoto`, formData);
    }
}
