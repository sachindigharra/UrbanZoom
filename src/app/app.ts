import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layouts/header/header';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'client';
}
