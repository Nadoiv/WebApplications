import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Type } from '../models/type.model';

@Injectable()
export class ModelService {
  baseUrl: string
  constructor(private apiService: ApiService) {
    this.baseUrl = '/api/type/'
  }

  getAll(): Observable<Type[]> {
    return this.apiService.get(this.baseUrl);
  }

  filter(filter): Observable<Type[]> {
    return this.apiService.post(this.baseUrl + 'filter', filter)
  }

  add(type): Observable<Type> {
    return this.apiService.post(this.baseUrl, type);
  }

  update(type): Observable<Type> {
    return this.apiService.put(this.baseUrl, type)
  }

  remove(type): Observable<any> {
    return this.apiService.delete(this.baseUrl + type._id)
  }
}