import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/types/player.type';
import { PlayerService } from 'src/app/services/api/player/player.service';
import { Game } from 'src/app/types/game.type';
import { GamesFilterService } from 'src/app/services/filters/gamesFilter/games-filter.service';
import { GameService } from 'src/app/services/api/game/game.service';

type DialogData = {
  player: Player,
  platform: string
}

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  public form: FormGroup|any;
  public player: Player = this.data.player;
  public games: Game[];
  public platform: string = this.data.platform;
  public game: Game[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddGameComponent>,
    public gameFilter: GamesFilterService,
    public gameService: GameService,
    public playerService: PlayerService
  ) {  
    
  }

  ngOnInit(): void {
    this.form = this.initForm();
    this.initGames();
  }

  initForm() {
    return new FormGroup({
      game: new FormControl('', [
        Validators.required
      ])
    });
  }

  initGames() {
    this.gameService
      .getGameForPlarform(this.platform)
      .subscribe(games => {
        this.games = this.filterGamesForPlayer(games);
      })
  }

  addGame = (form: FormGroup) => {
    this.player.games_id.push(form.value.game)
    this.game = this.games.filter(game => game.id === form.value.game);
    this.playerService
        .editPlayer(this.player)
        .subscribe(player => {
          this.dialogRef.close({
            event: "submit",
            player: player,
            game: this.game[0]
          });
        })
  }

  filterGamesForPlayer = (games: Game[]):Game[] => {
    return games.filter((game) => 
      this.gameFilter.checkDateRelease(game.date_release) && 
      this.gameFilter.checkAgeLimit(game.rating, this.player.age) && 
      this.gameFilter.checkRepeatGame(+game.id, this.player.games_id)
    );
} 

  closeModal() {
    this.dialogRef.close({event: "cancel"});
  }
}