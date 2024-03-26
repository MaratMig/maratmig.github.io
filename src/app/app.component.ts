import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated().subscribe(
      res => res === true ? this.isLoggedIn = true : this.isLoggedIn = false
    );
  }

  onActionClicked(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }
}
