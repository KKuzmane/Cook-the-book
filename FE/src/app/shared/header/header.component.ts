import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  icons = [
    { src: 'assets/images/contactIcons/index.png', size: '50x50', link: 'categories' },
    { src: 'assets/images/contactIcons/facebook.png', size: '50x50', link: 'http://facebook.com/' },
    { src: 'assets/images/contactIcons/instagram.png', size: '50x50', link: 'http://instagram.com/' },
    { src: 'assets/images/contactIcons/twitter.png', size: '50x50', link: 'http://twitter.com/' },
    { src: 'assets/images/contactIcons/draugiem.png', size: '50x50', link: 'http://draugiem.lv/' },
    { src: 'assets/images/contactIcons/gmail.png', size: '50x50', link: 'http://gmail.com/' }
  ];

  loginForm: LoginRequest = {
    username: '',
    password: ''
  };

  showLoginForm: boolean = false;
  adminIsLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  login() {
    this.showLoginForm = true;
  }

  logout() {
    localStorage.removeItem('token');
    this.adminIsLoggedIn = false;
  }

  submitLogin() {
    const loginRequest: LoginRequest = {
      username: this.loginForm.username,
      password: this.loginForm.password
    };

    this.userService.login(loginRequest).subscribe(
      token => {
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/admin']);
          this.showLoginForm = false;
          this.adminIsLoggedIn = true;
        } else {
          console.error('Login failed: Invalid username or password');
        }
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  handleIconClick(icon: any) {
    if (icon.link === 'categories') {
      this.router.navigate(['/categories']);
    } else {
      window.open(icon.link, '_blank');
    }
  }
}
