import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from 'src/app/types/player.type';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getPlayers(page: number): Observable<HttpResponse<Player[]>>{
    return this.http
      .get<Player[]>(`${this.API_URL}/players?_page=${page}`,  {observe: 'response'})
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  public getPlayer(id: string): Observable<Player> {
    return this.http
      .get<Player>(`${this.API_URL}/players/${id}`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }
  
  public getPlayerForData(key:string, value:string): Observable<Player[]> {
    value = encodeURIComponent(value);
    return this.http
      .get<Player[]>(`${this.API_URL}/players/?${key}=${value}`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  public createPlayer(player: Player): Observable<Player>{
    return this.http
      .post<Player>(`${this.API_URL}/players`, player)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  public editPlayer(player: Player): Observable<Player>{
    return this.http
      .put<Player>(`${this.API_URL}/players/${player.id}`, player)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  public searchPlayer(searchVal: string): Observable<Player[]>{
    return this.http
      .get<Player[]>(`${this.API_URL}/players?q=${searchVal}`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )   
  }

  public deletePlayer(id: number): Observable<Player> {
    return this.http
      .delete<Player>(`${this.API_URL}/players/${id}`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }
}
