import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/Auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response) {
          console.log('Login successful');
          // Chuyển hướng đến trang chính hoặc trang sau khi đăng nhập thành công
          this.router.navigate(['/signup']);
        } else {
          console.error('Login failed');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
