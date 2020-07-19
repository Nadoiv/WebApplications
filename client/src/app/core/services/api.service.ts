import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params });
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(path, body);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path)
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(path, body);
  }
}