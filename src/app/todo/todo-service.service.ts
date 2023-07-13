import { Injectable } from '@angular/core';
import { Idata } from './model/data.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL: string = "http://localhost:3000/data"

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private _http: HttpClient) { }

  getData(): Observable<Idata[]> {
    return this._http
      .get<Idata[]>(URL)
  }

  updateTodo(data: Idata) {
    return this._http.put<Idata>(URL + `/${data.id}`, data)
  }

  updateDb(data: Idata){
    return this._http.post<Idata[]>(URL,data)
  }
}
