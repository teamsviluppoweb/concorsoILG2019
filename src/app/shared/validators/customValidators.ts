import {AbstractControl, ValidationErrors} from '@angular/forms';


export class CustomValidators {


  static rangeYear(control: AbstractControl): ValidationErrors | null {
    const currentYear = new Date().getFullYear();
    if ((control.value as number) >  currentYear) {
      return {rangeYears: true};
    }
    return null;
  }

  static cannotContainNumber(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return {noSpace: true};
    }

    return null;
  }

  static onlyNumber(control: AbstractControl): ValidationErrors | null {
    if (isNaN(control.value)) {
      return {onlyNumber: true};
    }
  }

  static onlyWhitespace(control: AbstractControl): ValidationErrors | null {
    if ((control.value.trim() === '')) {
      return {onlyWhitespace: true};
    }
  }

  static noWhitespaces(control: AbstractControl): ValidationErrors | null {
    if (control.value.endsWith(' ') || control.value.startsWith(' ')) {
      return {noWhitespaces: true};
    }
  }

  static specialChar(control: AbstractControl): ValidationErrors | null {
    const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (format.test(control.value)) {
      return {specialChar: true};
    }
  }
}
