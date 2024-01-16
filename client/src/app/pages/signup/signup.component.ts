import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  userDate: FormGroup;

  constructor() {
    this.userDate = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.userDate.valid) {
      console.log(this.userDate.value);
    } else {
      console.log('Not Valid');
    }
  }
}
