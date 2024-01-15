import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="bg-slate-800 text-slate-100 min-h-screen relative">
      <app-header></app-header>
      <div class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'client';
}
