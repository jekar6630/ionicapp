import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;
  constructor( private http: HttpClient) { }

  getPosts() {
    console.log('this posts');
    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${ URL }/post?pagina=${ this.paginaPosts }`);
  }
}
