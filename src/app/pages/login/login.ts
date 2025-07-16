import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginDto } from '../../core/model/interface/login-dto';
import { environment } from '../../../environments/environment';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginForm: FormGroup|any;
  isloggedIn:boolean=false;

  constructor(private fb: FormBuilder,private authService:AuthService,private route:Router,private userService:UserService,private cdr: ChangeDetectorRef ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/)
      ]]
    });
    
  }

  onSubmit() {
   if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      const credential: LoginDto = this.loginForm.value;
      this.authService.generateToken(credential).subscribe({
        next: (res: any) => {
          console.log('Token generated and cookie set:', res);
          this.isloggedIn = true;
          console.log(this.isloggedIn)
          this.authService.getUserRole();
          this.authService.checkSession();
          this.cdr.detectChanges();
          this.route.navigateByUrl('home')
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
      
    }else {

      this.loginForm.markAllAsTouched();
    }
   
    
  }
  
}
