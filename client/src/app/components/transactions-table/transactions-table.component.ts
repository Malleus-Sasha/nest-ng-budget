import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styles: `
    .ngx-pagination li a {
      color: white;
    }
  `
})
export class TransactionsTableComponent implements OnInit {
  trashIcon = faTrash;
  currentPage = 1;

  constructor(
    public transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.transactionService.findAll();
  }

  delete(id: number) {
    this.transactionService.delete(id);
  }
}
