import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
  form: FormGroup;

  constructor() {
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
