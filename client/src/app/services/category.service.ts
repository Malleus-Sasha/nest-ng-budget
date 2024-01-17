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
      this.toastr.success('Created');
    })
  }

  delete(id: number) {
    return this.http.delete(`category/${id}`).subscribe(() => {
      this.categoriesSig.update((data) => data.filter((item) => item.id !== id));
      this.toastr.warning('Deleted');
    });
  }

  update(id: number, title: string) {
    this.http.patch(`category/${id}`, { title }).subscribe(() => {
      this.categoriesSig.update((data) => data.map((item) => (item.id === id ? {...item, title} : item)));
    });
  }
}
