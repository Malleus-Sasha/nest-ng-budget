import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="grid col-span-3 gap-4">
      <div class="grid col-span-2 shadow p-4 rounded">
        <app-transactions/>
      </div>
      <div class="grid">
        <app-categories/>
      </div>
    </div>
  `,
  styles: ``
})
export class HomeComponent {

}
