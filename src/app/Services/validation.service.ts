import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  noSpacesValidator(control: AbstractControl): ValidationErrors | null {
    const hasSpaces = (control.value || '').includes(' ');
    return hasSpaces ? { noSpaces: true } : null;
  }
}
