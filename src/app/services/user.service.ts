import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiURl= "https://jsonplaceholder.typicode.com/users"

  constructor( private http: HttpClient) {
   }

  getAll () {
    return this.http.get(`${this.apiURl}`)
  }

  getID(id:number) {
    return this.http.get (`${this.apiURl}/${id}`)
  }
  
}
