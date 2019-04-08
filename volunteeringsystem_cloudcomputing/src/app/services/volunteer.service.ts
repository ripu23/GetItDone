import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Models/user';
import { Request } from '../Models/request';


@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = '/api/';

  findVolunteers(request: Request) {
    let params: HttpParams = new HttpParams();
    return this.http.get<User[]>(this.baseUrl + 'findVolunteers', {
      params: params
    });
  }
}
