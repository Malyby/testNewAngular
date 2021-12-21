import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/api/player/player.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/types/player.type';
import { ValidateEqualNicknameService } from 'src/app/services/validators/ValidateEqualNickname/validate-equal-nickname.service';
import { Location } from '@angular/common'

type DialogData = {
  player: Player
}

@Component({
  selector: 'app-delete-player',
  templateUrl: './delete-player.component.html',
  styleUrls: ['./delete-player.component.scss']
})

export class DeletePlayerComponent implements OnInit {
  public form: FormGroup|any;
  public player: Player = this.data.player;

  constructor(
    public playerService: PlayerService,
    public validateEqualNicknameService: ValidateEqualNicknameService,
    public dialogRef: MatDialogRef<DeletePlayerComponent>,
    public location: Location,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {  
    
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      nickname: new FormControl('', [
        Validators.required,
        this.validateEqualNicknameService.equalNickname(this.player.nickname)
      ])
    });
  }

  deletePlayer(form: FormGroup) {
    form.value.age = +form.value.age;
    this.playerService
        .deletePlayer(this.player.id)
        .subscribe(() => {
          this.location.back();
        })
  }

  closeModal() {
    this.dialogRef.close({event: "cancel"});
  }
}