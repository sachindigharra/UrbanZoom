import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Authrequest } from '../../core/model/interface/authrequest';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup|any;

  constructor(private fb: FormBuilder,private authService:AuthService,private route:Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-={}\\[\\]|:;\\"\'<>,.?/]).{8,}$')
      ]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      // Call your service here
      const newUser:Authrequest=this.registerForm.value;
      this.authService.register(newUser).subscribe((res:any)=>{
        alert('You Register Successfuly!');
        console.log(res);
      })
      this.route.navigateByUrl('home')

    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  // reference of formobj
  get f() { return this.registerForm.controls; }
}
