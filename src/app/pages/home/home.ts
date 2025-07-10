import { Component, OnInit } from '@angular/core';
import { VehicleList } from '../../feature/vehicle/vehicle-list/vehicle-list';

@Component({
  selector: 'app-home',
  imports: [VehicleList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home  {
 
}
