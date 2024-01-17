import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
  form: FormGroup;

  constructor(
    public transactionService: TransactionService,
    public categoryService: CategoryService,
  ) {
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
    this.transactionService.create(this.form.value);
    this.form.reset();
  }
}
