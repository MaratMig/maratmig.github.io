
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
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

