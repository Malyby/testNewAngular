import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { platforms } from 'src/app/constans/constans';
import { ValidateUniqueDataPlayerService } from 'src/app/services/validators/ValidateUniqueDataPlayer/validate-unique-data-player.service';
import { PlayerService } from 'src/app/services/api/player/player.service';
import { GamesFilterService } from 'src/app/services/filters/gamesFilter/games-filter.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/types/player.type';
import { Game } from 'src/app/types/game.type';

type DialogData = {
  player: Player,
  player_games: Game[]
}

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  public player_games: Game[] = this.data.player_games;
  public player: Player = this.data.player;
  public platforms: String[] = platforms;
  public form: FormGroup|any;

  constructor(
    public validateUniqueDataPlayerService: ValidateUniqueDataPlayerService,
    public playerService: PlayerService,
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    public gamesFilter: GamesFilterService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {  
    
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      nickname: new FormControl(this.player.nickname, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\w+$/)
      ], [
        this.validateUniqueDataPlayerService.uniqName(this.player.id)
      ]),
      age: new FormControl(this.player.age, [
        Validators.pattern(/^\d{1,2}$/)
      ]),
      phone: new FormControl(this.player.phone, [
        Validators.required,
        Validators.pattern(/^\+7\d{10}$/)
      ], [
        this.validateUniqueDataPlayerService.uniqPhone(this.player.id)
      ]),
      email: new FormControl(this.player.email, [
        Validators.email,
        Validators.required
      ], [
        this.validateUniqueDataPlayerService.uniqEmail(this.player.id)
      ]),
      platform: new FormControl(this.player.platform, [
        Validators.required
      ])
    });
  }

  editPlayer = (form: FormGroup) => {
    this.updateGame(form.value.age, form.value.platform)
    this.playerService
        .editPlayer({...form.value, games_id: this.player.games_id, id: this.player.id})
        .subscribe(player => {
          this.dialogRef.close({
            event: "submit",
            player: player,
            player_games: this.player_games.filter(game => player.games_id.includes(+game.id))
          });
        })
  }

  updateGame = (age: number, platform: string) => {
    if (this.player.age != age) {
        this.player.games_id = this.player_games
                            .filter(game => this.gamesFilter.checkAgeLimit(game.rating, age))
                            .map(game => +game.id);
    }
    if (this.player.platform != platform) {
      this.player.games_id = [];
    }
}

  closeModal() {
    this.dialogRef.close({event: "cancel"});
  }
}
