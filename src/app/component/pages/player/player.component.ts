import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditPlayerComponent } from '../../modal/edit-player/edit-player.component';
import { AddGameComponent } from '../../modal/add-game/add-game.component';
import { DeletePlayerComponent } from '../../modal/delete-player/delete-player.component';
import { PlayerService } from 'src/app/services/api/player/player.service';
import { GameService } from 'src/app/services/api/game/game.service';
import { Player } from 'src/app/types/player.type';
import { Game } from 'src/app/types/game.type';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player: Player;
  games: Game[] = [];

  constructor(
    private route: ActivatedRoute,
    public playerService: PlayerService,
    public gameService: GameService,
    public dialog: MatDialog
  ) {
   }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.playerService
        .getPlayer(id)
        .pipe(
          switchMap(this.setPlayer),
          switchMap(this.getGames)
        )
        .subscribe(this.setGames);
  }

  setPlayer = (player: Player) => {
    this.player = player;
    return of(player);
  }

  getGames = (player: Player) => {
    if (player.games_id.length === 0) {
      return of([]);
    }
    return this.gameService.getPlayerGames(player.games_id);
  }

  setGames = (games: Game[]) => {
    this.games = games
  }

  openAddGameModal = () => {
    const dialogRef = this.dialog.open(AddGameComponent, {
      disableClose: true,
      data: {
        player: this.player,
        platform: this.player.platform
      }
    });
    dialogRef
      .afterClosed()
      .subscribe(data => {
        if (data.event === "submit") {
          this.games.push(data.game);
        }
      });
  }

  openEditPlayerModal = () => {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
      disableClose: true,
      data: {player: this.player, player_games: this.games}
    });
    dialogRef
      .afterClosed()
      .subscribe(data => {
        if (data.event === "submit") {
          this.player = data.player;
          this.games = data.player_games; 
        }
      });
  }

  openDeletePlayerModal = () => {
    this.dialog.open(DeletePlayerComponent, {
      disableClose: true,
      data: {
        player: this.player
      }
    });
  }
}
