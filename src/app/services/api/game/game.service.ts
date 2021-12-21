import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from 'src/app/types/game.type';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private API_URL = environment.apiUrl;

  public params: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {}

  public getGames = (): Observable<Game[]> => {
      return this.http
        .get<Game[]>(`${this.API_URL}/games`)
        .pipe(
          catchError(err => {
            throw err;
          })
        )
  }

  public getPlayerGames = (games_id: number[]): Observable<Game[]> => {
    games_id.forEach(id => {
      this.params = this.params.append("id", id);
    })
    return this.http
      .get<Game[]>(`${this.API_URL}/games`, {params: this.params})
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  public getGameForPlarform = (platform: string): Observable<Game[]> => {
    return this.http
      .get<Game[]>(`${this.API_URL}/games`, {params: {platform: platform}})
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }
}
