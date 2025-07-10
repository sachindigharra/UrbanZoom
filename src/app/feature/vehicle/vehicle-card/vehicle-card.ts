import { Component, inject, Input } from '@angular/core';
import { VehicleResponse } from '../../../core/model/interface/vehicle-response-module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.css'
})
export class VehicleCard {

  @Input() vehicle:VehicleResponse|null=null;
   constructor(private router: Router,private vehicleService:VehicleService) {}
  goToDetail(id: string) {
    console.log("go to detail")
    this.router.navigate(['/vehicle', id]);
  }
  isOwner:boolean=true;

  onDelete(id:string){
    if(id!=''){
      alert('After deleting Data not restore!')
      this.vehicleService.deleteVehicle(id).subscribe({
        next:res=>{
          console.log(res);
          alert('vehicle delete')
          this.router.navigateByUrl('home')
          
        }
      })
    }else{
      console.log("we did't get the id to Delete the vehicle")
    }
  }
  
}
