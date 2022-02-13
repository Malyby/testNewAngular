import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors  } from '@angular/forms';
import { Observable, distinctUntilChanged, switchMap, timer, map } from 'rxjs';
import { PlayerService } from 'src/app/services/api/player/player.service';
import { Player } from 'src/app/types/player.type';

@Injectable({
  providedIn: 'root'
})
export class ValidateUniqueDataPlayerService {

  constructor(public playerService: PlayerService) { }

  public uniqName = (id?: number): AsyncValidatorFn => {
    return this.templateUniq("nickname", "uniqName", id);
  }

  public uniqEmail = (id?: number): AsyncValidatorFn => {
    return this.templateUniq("email", "uniqEmail", id);
  }

  public uniqPhone = (id?: number): AsyncValidatorFn => {
    return this.templateUniq("phone", "uniqPhone", id);
  }

  private templateUniq = (key: string, attr: string, id?: number) => {
    return (control: AbstractControl):Observable<ValidationErrors | null> => {
      return timer(1000)
        .pipe(
          distinctUntilChanged(),
          switchMap(() => {
            return this.playerService.getPlayerForData(key, control.value)
          }),
          map((player: Player[]) => {
            if (player.length !== 1 || (player.length === 1 && player[0].id === id)) {
              return null;
            }
            return { [attr]: true }
          })
        );
    }
  }
}
