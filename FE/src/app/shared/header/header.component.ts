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

  showLoginForm = false;

  constructor(private router: Router, private userService: UserService) { }

  login() {
    this.showLoginForm = true;
  }

  submitLogin() {
    const loginRequest: LoginRequest = {
      username: this.loginForm.username,
      password: this.loginForm.password
    };

    this.userService.login(loginRequest).subscribe(
      token => {
        if (token) {
          console.log('Login successful');
          // TODO: Handle successful login (e.g., store token, navigate to another page)
          localStorage.setItem('token', token);
          // Redirect to the admin form component after successful login
          this.router.navigate(['/admin']); // Replace '/admin' with the actual path to your admin form component
        } else {
          console.error('Login failed: Invalid username or password');
          // TODO: Handle login error (e.g., display error message)
        }
      },
      error => {
        console.error('Login failed:', error);
        // TODO: Handle login error (e.g., display error message)
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
