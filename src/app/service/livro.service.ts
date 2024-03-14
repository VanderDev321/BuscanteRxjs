
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultado } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly URI = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private httpClient:HttpClient) { }

  buscar(livroBuscado:string):Observable<LivrosResultado>{
    const params = new HttpParams().append('q',livroBuscado);
    return this.httpClient.get<LivrosResultado>(this.URI,{params});

  }

}
