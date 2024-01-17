import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: ``
})
export class CategoriesComponent {
  categoryForm: FormGroup;
  removeIcon = faRemove;
  editIcon = faEdit;

  constructor() {
    this.categoryForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  onSubmit() {
    console.log('ctgr sbmt');
    if (this.categoryForm.value) {
      console.log('Ctgrs:', this.categoryForm.value);
    }
  }
}
