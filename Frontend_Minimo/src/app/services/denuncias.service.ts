import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Denuncia } from '../models/denuncia';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private denunciaURL = 'http://localhost:9090/denuncias'; 
   
  /** GET denuncias from the server */
  getDenuncias(page:number): Observable<Denuncia[]> {
    const params = {
      page: page.toString(),
     };
    return this.http.get<Denuncia[]>(this.denunciaURL + '/readall/', {params});
  }

  /** GET denuncia by Id */
  getDenuncia(id: string): Observable<Denuncia> {
    const url = `${this.denunciaURL}/readdenuncia/${id}`;
    return this.http.get<Denuncia>(url);
  }

  /** PUT: update the denuncia on the server */
  updateDenuncia(id: string, username: Denuncia): Observable<Denuncia> {
    const url = `${this.denunciaURL}/updatedenuncia/${id}`;
    return this.http.put<Denuncia>(url, username);
  }

  /** POST: add a new denuncia to the server */
  addDenuncia(username: any): Observable<Denuncia> {
    return this.http.post<Denuncia>(this.denunciaURL + '/createdenuncia', username);
  }
  
  /** DELETE: delete the denuncia from the server */
  deleteDenuncia(_id: string): Observable<Denuncia> {
    const url = `${this.denunciaURL}/deletedenuncia/${_id}`;
    return this.http.delete<Denuncia>(url);
  }
  /* GET denuncia whose name contains search term */
  searchDenuncias(term: string): Observable<Denuncia[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<Denuncia[]>(`${this.denunciaURL}/?name=${term}`);
  }
}
