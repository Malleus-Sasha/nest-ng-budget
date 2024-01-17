import { Component } from '@angular/core';
import { faArrowRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  logoutIcon = faArrowRightFromBracket;
  houseIcon = faHouse;

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
