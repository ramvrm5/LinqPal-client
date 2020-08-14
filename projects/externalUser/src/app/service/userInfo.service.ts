import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    constructor(private httpClient: HttpClient) { }

    /* REFRESH TOKEN API  */
    userInfo(data) {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        return this.httpClient.post(`${environment.apiUrl}users/userInfo`,data, { headers: headers });
    }

}