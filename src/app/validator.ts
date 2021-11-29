import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

export interface AllValidationErrors {
  controlName: string;
  errorName: string;
  errorValue: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function notSpace(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    const regex = /^.*\s+.*$/;
    if (regex.test(value)) {
      return {'space': true};
    }
  }
  return null;
}

export function email(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value != null && value.trim().length !== 0) {
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(value)) {
        return {'email': true};
      }
    }
  }
  return null;
}

export function checkVaidDate(value: any) {
  const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}

export function notSpaceLogin(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value.trim();
    const regex = /^.*\s+.*$/;
    if (regex.test(value)) {
      return {'space': true};
    }
  }
  return null;
}

export function validEmail(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value == null || value.trim().length === 0) {
      return {'required': true};
    }
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(value)) {
      return {'email': true};
    }
  }
  return null;
}

export function validDate1(control: FormControl): { [key: string]: any } {
  console.log(control.errors?.nbDatepickerParse?.value);
  const regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  if (regex.test(control.value)) {
    return {'date': true};
  }
  return null;
}

export function validDate(control: AbstractControl): { [key: string]: boolean } | null {
  let d = null;
  if (control && control.value != null) {
    d = control.value;
    // const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    // if (!regex.test(value)) {
    //   return {'date': true};
    // }

    if (Object.prototype.toString.call(d) === '[object Date]') {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        // date is not valid
        return {'date': true};
      } else {
        return null;
        // date is valid
      }
    } else {
      return {'date': true};
      // not a date
    }
  }
  return null;
}

export function checkPass(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value == null || value.trim().length === 0) {
      return {'required': true};
    }
    if (value.trim().length > 0 && value.trim().length < 6) {
      return {'minlength': true};
    }
    if (value.trim().length > 60) {
      return {'maxlength': true};
    }
    return null;
  }
}


export function checkUser(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value == null || value.trim().length === 0) {
      return {'required': true};
    }
    if (value.trim().length > 50) {
      return {'usersmaxlength': true};
    }
    return null;
  }
}

export function validPassword(form: FormGroup) {
  if (form.get('newPass') && form.get('comPass')) {
    if (form.get('newPass').value === null || form.get('newPass').value === '' || form.get('newPass').value === undefined) {
      return null;
    }
    if (form.get('newPass').value === form.get('comPass').value) {
      form.get('comPass').setErrors(null);
      return null;
    }
    form.get('comPass').setErrors({passwordMustMatchChange: true});
  }
  return null;
}

export function passwordsMatchValidator(form: FormGroup) {
  if (form.get('pass') || form.get('rePassword')) {
    const regex = /^.*\s+.*$/;
    if (form.get('pass').value?.length === 0 && form.get('rePassword').value?.length === 0) {
      form.get('pass').setValue(null);
      form.get('rePassword').setValue(null);
      form.get('pass').setErrors(null);
      form.get('rePassword').setErrors(null);
      return null;
    }
    if (form.get('pass').value?.length === 0) {
      form.get('pass').setValue(null);
      form.get('pass').setErrors(null);
      return null;
    }
    if (form.get('rePassword').value?.length === 0) {
      form.get('rePassword').setValue(null);
      form.get('rePassword').setErrors(null);
      return null;
    }
    if (regex.test(form.get('pass').value)) {
      form.get('pass').setErrors({space: true});
      return null;
    }
    if (regex.test(form.get('rePassword').value)) {
      form.get('rePassword').setErrors({space: true});
      return null;
    }
    if (form.get('pass').value?.length < 6 && form.get('pass').value?.length > 0) {
      form.get('pass').setValidators(Validators.minLength(6));
      return null;
    }
    if (form.get('pass').value?.length > 60) {
      form.get('pass').setValidators(Validators.maxLength(60));
      return null;
    }
    if (form.get('rePassword').value?.length < 6 && form.get('rePassword').value?.length > 0) {
      form.get('rePassword').setValidators(Validators.minLength(6));
      return null;
    }
    if (form.get('pass')?.value?.length > 60) {
      form.get('rePassword').setValidators(Validators.maxLength(60));
      return null;
    }
    if (form.get('pass').value === null || form.get('pass').value === '' || form.get('pass').value === undefined) {
      return null;
    }
    if (form.get('pass').value === form.get('rePassword').value) {
      form.get('rePassword').setErrors(null);
      return null;
    }
    if (form.get('rePassword').value === null) {
      return null;
    }
    form.get('rePassword').setErrors({passwordMustMatchChange: true});
  }
  return null;
}

