import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
})
export class TransactionsTableComponent implements OnInit {
  trashIcon = faTrash;

  constructor(
    public transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.transactionService.findAll();
  }
}
