import {Component,  Input } from '@angular/core';
import { VehicleResponse } from '../../../core/model/interface/vehicle-response-module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.css'
})
export class VehicleCard {

  @Input() vehicle: VehicleResponse | null = null;
  isLoggedIn: boolean = false;
  isLoading: boolean = true; // Track loading state
  private subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService, // Public for async pipe
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLoggedIn().subscribe({
        next: (res: boolean) => {
          setTimeout(() => {
            // Defer update to next tick
            this.isLoggedIn = res;
            this.isLoading = false;
            console.log('isLoggedIn:', this.isLoggedIn);
          }, 0);
        },
        error: (err) => {
          setTimeout(() => {
            this.isLoggedIn = false;
            this.isLoading = false;
            console.error('Error fetching login status:', err);
          }, 0);
        }
      })
    );

    // Resolve loading state for role (used in template via async pipe)
    this.authService.getUserRole().subscribe({
      next: () => (this.isLoading = false),
      error: () => (this.isLoading = false)
    });
  }

  goToDetail(id: string) {
    console.log('go to detail');
    this.router.navigate(['/vehicle', id]);
  }

  onDelete(id: string) {
    if (id) {
      alert('After deleting Data not restore!');
      this.vehicleService.deleteVehicle(id).subscribe({
        next: (res) => {
          console.log(res);
          alert('vehicle delete');
          this.router.navigateByUrl('home');
        },
        error: (err) => console.error('Error deleting vehicle:', err)
      });
    } else {
      console.log("we didn't get the id to Delete the vehicle");
    }
  }

  onBook() {
    if (this.isLoggedIn) {
      alert('This feature is under development!');
    } else {
      this.router.navigateByUrl('login');
    }
}
}
