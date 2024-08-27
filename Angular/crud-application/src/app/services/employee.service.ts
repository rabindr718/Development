import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}
  addEmployee(data: any):Observable<any> {
    return this._post('http://localhost:3000/users', data);
  }
}
