import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { VehicleService } from '../../../core/services/vehicle.service';
import { VehicleResponse } from '../../../core/model/interface/vehicle-response-module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  imports: [CommonModule],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.css'
})
export class VehicleDetail implements OnInit {
  constructor(private vehicleService:VehicleService,private activeRoute: ActivatedRoute,private cdr: ChangeDetectorRef){}
  vehicleId!: string;
  vehicle:VehicleResponse|null=null;

  ngOnInit(): void {
      this.vehicleId = this.activeRoute.snapshot.paramMap.get('id')!;
      this.getVehicle();
  }
  

  getVehicle(){
    this.vehicleService.getVehicleById(this.vehicleId).subscribe((res:VehicleResponse)=>{
      this.vehicle = res;
      this.cdr.detectChanges();
    })
  }
  


  
}
