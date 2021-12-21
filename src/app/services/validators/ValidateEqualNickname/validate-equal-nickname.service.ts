import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateEqualNicknameService {

  constructor() { }

  public equalNickname = (nickname: string): ValidatorFn => {
    return (control: AbstractControl):ValidationErrors|null => {
      if (nickname === control.value) {
        return null;
      }
      return {equalNickname: {
        isValid: true,
        message: "Имена не совпадают"
      }};
    }
  }
}
