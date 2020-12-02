import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordContainsNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex = /\d/;
    if (regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return { passwordInvalid: true };
    }
  }

  static passwordMatch(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (
      password === confirmPassword &&
      password !== null &&
      confirmPassword !== null
    ) {
      return null;
    } else {
      return { passwordMatching: true };
    }
  }
}
