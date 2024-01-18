import { Injectable, signal } from "@angular/core";
import { Transaction, TransactionData } from "../types/transaction";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  transactionsSig = signal<Transaction[]>([]);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private categoryService: CategoryService,
  ) {}

  findAll() {
    this.http.get<Transaction[]>('transaction').subscribe((res) => this.transactionsSig.set(res));
  }

  create(data: TransactionData) {
    this.http.post<Transaction>('transaction', data).subscribe((res) => {
      const category = this.categoryService
        .categoriesSig()
        .find((item) => item.id === res.category?.id);

      this.transactionsSig.update((transactions) => [
        { ...res, category },
        ...transactions,
      ]);

      this.toastr.success('Created Transaction');
    })
  }

  delete(id: number) {
    this.http.delete(`transaction/transaction/${id}`).subscribe(() => {
      this.transactionsSig.update((data) => data.filter((item) => item.id !== id));
      this.toastr.warning('Deleted Transaction');
    })
  }
}
