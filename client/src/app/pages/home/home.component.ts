import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="grid grid-cols-3 gap-4">
      <div class="grid col-span-2 p-4 shadow rounded">
        <app-transactions/>
      </div>
      <div class="grid">
        <app-categories/>
      </div>
    </div>
    <div>
      <app-transactions-table/>
    </div>
  `,
  styles: ``
})
export class HomeComponent {

}
