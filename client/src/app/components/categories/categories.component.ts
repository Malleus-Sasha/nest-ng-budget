import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: ``
})
export class CategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  removeIcon = faRemove;
  editIcon = faEdit;

  constructor(private categoryService: CategoryService) {
    this.categoryForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  ngOnInit(): void {
    this.categoryService.findAll();
  }

  onSubmit() {
    console.log('ctgr sbmt');
    if (this.categoryForm.value) {
      console.log('Ctgrs:', this.categoryForm.value);
    }
  }
}
