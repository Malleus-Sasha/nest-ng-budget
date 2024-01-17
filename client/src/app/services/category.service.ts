import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesSig = signal<Category[]>([]);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  findAll() {
    return this.http.get<Category[]>('category').subscribe((res) => {
      this.categoriesSig.set(res);
    })
  }

  create(title: string) {
    return this.http.post<Category>('category', { title }).subscribe((res) => {
      this.categoriesSig.update((categories) => [...categories, res]);
    })
  }
}
