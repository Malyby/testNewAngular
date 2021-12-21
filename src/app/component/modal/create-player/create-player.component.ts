import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { platforms } from 'src/app/constans/constans';
import { ValidateUniqueDataPlayerService } from 'src/app/services/validators/ValidateUniqueDataPlayer/validate-unique-data-player.service';
import { PlayerService } from 'src/app/services/api/player/player.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/types/player.type';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent implements OnInit {
  public platforms: String[] = [];
  public form: FormGroup|any;
  public player: Player;

  constructor(
    public validateUniqueDataPlayerService: ValidateUniqueDataPlayerService,
    public playerService: PlayerService,
    public dialogRef: MatDialogRef<CreatePlayerComponent>
  ) {  
    
  }

  ngOnInit(): void {
    this.platforms = platforms;
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      nickname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\w+$/)
      ], [
        this.validateUniqueDataPlayerService.uniqName()
      ]),
      age: new FormControl('', [
        Validators.pattern(/^\d{1,2}$/)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+7\d{10}$/)
      ], [
        this.validateUniqueDataPlayerService.uniqPhone()
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ], [
        this.validateUniqueDataPlayerService.uniqEmail()
      ]),
      platform: new FormControl('', [
        Validators.required
      ])
    });
  }

  createPlayer(form: FormGroup) {
    form.value.age = +form.value.age;
    this.playerService
        .createPlayer({...form.value, "games_id": []})
        .subscribe(player => {
          this.player = player;
          this.dialogRef.close({
            event: "submit", 
            player: this.player
          });
        })
  }

  closeModal() {
    this.dialogRef.close({event: "cancel"});
  }
}
