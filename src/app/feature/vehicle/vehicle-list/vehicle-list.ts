import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VehicleResponse } from '../../../core/model/interface/vehicle-response-module';
import { CommonModule } from '@angular/common';
import { VehicleCard } from '../vehicle-card/vehicle-card';
import { VehicleService } from '../../../core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  imports: [CommonModule,VehicleCard],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css'
})
export class VehicleList implements OnInit {
  constructor(private vehicleService:VehicleService,private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
      this.getList();
  }
  getList(){
    this.vehicleService.getAvailableVehicles().subscribe((res:VehicleResponse[])=>{
        this.vehicleList = res;
        this.cdr.detectChanges();
      })
  }

  vehicleList:VehicleResponse[]|null=null;


}
