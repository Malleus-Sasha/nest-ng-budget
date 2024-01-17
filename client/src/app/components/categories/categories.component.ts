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

  categoryId = 0;
  title = '';
  method: 'create' | 'update' = 'create';

  constructor(public categoryService: CategoryService) {
    this.categoryForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  ngOnInit(): void {
    this.categoryService.findAll();
  }

  delete(id: number) {
    this.categoryService.delete(id);
  }

  onSubmit() {
    console.log('ctgr sbmt');
    if (this.method === 'create') {
      // console.log('Ctgrs:', this.categoryForm.value);
      this.categoryService.create(this.categoryForm.value.title);
      this.categoryForm.reset();
    }
    if (this.method === 'update') {
      this.update();
      this.categoryForm.reset();
      this.method = 'create';
    }
  }

  update() {
    this.categoryService.update(this.categoryId, this.categoryForm.value.title);
  }

  edit(id: number, title: string) {
    this.categoryId = id;
    this.categoryForm.setValue({title});
    this.method = 'update';
  }
}
