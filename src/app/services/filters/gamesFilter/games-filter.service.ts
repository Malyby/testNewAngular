import { Injectable } from '@angular/core';
import { relationGameRating } from 'src/app/constans/constans';

@Injectable({
  providedIn: 'root'
})
export class GamesFilterService {

  constructor() { }

  checkDateRelease = (data_release: number):boolean => {
    const current_date = new Date().getTime();
    return data_release < current_date
  }
  checkAgeLimit = (game_rating: string, player_age: number):boolean => {
      return relationGameRating[game_rating] < player_age
  }
  checkRepeatGame = (id: number, games_id: number[]):boolean => {
      return !games_id.includes(id);
  }
}
