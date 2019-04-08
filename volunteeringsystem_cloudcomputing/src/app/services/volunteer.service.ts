import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Models/user';
import { Request } from '../Models/request';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = '/api/';

  findVolunteers(request: Request): Observable<any> {
    let params: HttpParams = new HttpParams();
    return this.http.get<User[]>(this.baseUrl + 'findVolunteers', {
      params: params
    });
  }
}
