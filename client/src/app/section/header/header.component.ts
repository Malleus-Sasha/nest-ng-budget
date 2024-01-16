import { Component } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  isAuth = false;
  logoutIcon = faArrowRightFromBracket;
}
