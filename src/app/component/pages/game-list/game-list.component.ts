import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/api/game/game.service'
import { Game } from 'src/app/types/game.type';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGames().subscribe(games => this.games = games);
  }


}
