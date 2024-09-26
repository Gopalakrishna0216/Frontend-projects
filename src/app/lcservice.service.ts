import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LcServiceService {

  private postapi='https://localhost:7075/api/User' ;
  private putApi= 'https://localhost:7075/api/User';
  private deleteapi ='https://localhost:7075/api/User';
  constructor(private http : HttpClient) { }

  crudGet()
  {
    return this.http.get("https://localhost:7075/api/User")
  }
  
  crudPost(data:any): Observable<any>
  {
    return this.http.post(this.postapi,data,{responseType:'text'})
  }
  
 
  crudPut(userId: number, input: any): Observable<any> {
    return this.http.put(`https://localhost:7075/api/User/${userId}`,input);
  }

  crudDelete(userId: number): Observable<any> {
    return this.http.delete(`${this.deleteapi}/${userId}`);
  }




  
  // updateUser(userId: number, userData: any): Observable<any> {
  //   return this.http.put(`${this.postapi}${userId}`, userData);
  // }
  // updateUser(userId: number, userData: any): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.put(`${this.putApi}/${userId}`, JSON.stringify(userData), { headers });
  // }
  


  


  ////////////
  // private baseApi = 'https://localhost:7075/api/User';
  
  // constructor(private http: HttpClient) { }

  // // GET: Fetch all users
  // crudGet(): Observable<any> {
  //   return this.http.get(this.baseApi);
  // }
  
  // // POST: Create a new user
  // crudPost(user: any): Observable<any> {
  //   return this.http.post(this.baseApi + '/post',{ responseType: 'text' },user);
  // }
  
  // // PUT: Update an existing user by ID
  // crudPut(userId: number, user: any): Observable<any> {
  //   return this.http.put(`${this.baseApi}/putUser?id=${userId}`, { responseType: 'text' },user);
  // }

  // // DELETE: Delete a user by ID
  // crudDelete(userId: number): Observable<any> {
  //   return this.http.delete(`${this.baseApi}/${userId}`, { responseType: 'text' });
  // }
}
