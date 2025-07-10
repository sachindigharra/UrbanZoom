import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleRequest } from '../../../core/model/interface/vehicle-request.model';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../../core/services/cloudinary.service';
import { VehicleService } from '../../../core/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleResponse } from '../../../core/model/interface/vehicle-response-module';
import { Loader } from '../../../shared/resuable/loader/loader';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,Loader],
  templateUrl: './add-vehicle.html',
  styleUrls: ['./add-vehicle.css']
})
export class AddVehicle implements OnInit {
  isLoading: boolean = false;
  isEditMode: boolean = false;
  vehicleId: string | null = null;
  vehicleForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cloudinaryService: CloudinaryService,
    private vehicleService: VehicleService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.vehicleForm = this.fb.group({
      registered_id: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/),
        ],
      ],
      owner_name: ['', Validators.required],
      ownerId: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
      seater: [1, [Validators.required, Validators.min(1)]],
      pricePerDay: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      locate: ['', Validators.required],
      secure_url: [
        '',
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.pattern(/^https:\/\/res\.cloudinary\.com\/.+/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    if (this.vehicleId) {
      this.isEditMode = true;
      this.isLoading = true;
      this.vehicleService.getVehicleById(this.vehicleId).subscribe({
        next: (data: VehicleResponse) => {
          console.log('Fetched vehicle data:', data);
          // Ensure all fields are patched, including defaults for owner fields
          this.vehicleForm.patchValue({
            registered_id: data.registered_id || '',
            owner_name:  'Sachin Sharma',
            ownerId:'OWNR987654321',
            brand: data.brand || '',
            model: data.model || '',
            type: data.type || '',
            seater: data.seater || 1,
            pricePerDay: data.pricePerDay || 0,
            category:'',
            locate: data.locate || '',
            secure_url: data.secure_url || ''
          });
          // Mark form as pristine to avoid premature validation errors
          this.vehicleForm.markAsPristine();
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching vehicle:', err);
          alert('Failed to load vehicle data');
          this.isLoading = false;
          this.cdr.detectChanges();
          this.router.navigate(['/home']);
        }
      });
    }
  }

  onSubmit(): void {
    console.log('Submit button clicked!');
    console.log('Form value:', this.vehicleForm.value);
    console.log('Form valid:', this.vehicleForm.valid);
    console.log('Form errors:', this.vehicleForm.errors);

    if (this.vehicleForm.valid) {
      this.isLoading = true;
      // Set default owner values if not already set
      this.vehicleForm.patchValue({
        owner_name: this.vehicleForm.get('owner_name')?.value || 'Sachin Sharma',
        ownerId: this.vehicleForm.get('ownerId')?.value || 'OWNR987654321'
      });

      const newVehicle: VehicleRequest = this.vehicleForm.value;
      console.log('Submitted vehicle:', newVehicle);

      if (this.isEditMode && this.vehicleId) {
        console.log('Updating vehicle with ID:', this.vehicleId);
        this.vehicleService.updateVehicle(this.vehicleId, newVehicle).subscribe({
          next: () => {
            console.log('Vehicle updated:', newVehicle);
            alert('Vehicle updated successfully');
            this.isLoading = false;
            this.cdr.detectChanges();
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Update failed:', err);
            alert('Failed to update vehicle');
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      } else {
        console.log('Adding new vehicle');
        this.vehicleService.addVehicle(newVehicle).subscribe({
          next: (responseText: string) => {
            console.log('Server message:', responseText);
            alert(responseText);
            this.vehicleForm.reset();
            this.isLoading = false;
            this.cdr.detectChanges();
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Add failed:', err);
            alert('Failed to add vehicle');
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    } else {
      this.vehicleForm.markAllAsTouched();
      // Log specific field errors
      const invalidFields = Object.keys(this.vehicleForm.controls)
        .filter(key => this.vehicleForm.get(key)?.invalid)
        .map(key => ({
          field: key,
          errors: this.vehicleForm.get(key)?.errors
        }));
      console.log('Invalid fields:', invalidFields);
      alert('Please fill all required fields correctly:\n' + 
        invalidFields.map(f => `${f.field}: ${JSON.stringify(f.errors)}`).join('\n'));
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image (PNG, JPG, GIF, SVG)');
        input.value = '';
        return;
      }

      this.isLoading = true;
      this.cloudinaryService.uploadImage(file).subscribe({
        next: (res: any) => {
          const imageUrl = res.secure_url;
          this.vehicleForm.patchValue({
            secure_url: imageUrl,
          });
          this.isLoading = false;
          this.cdr.detectChanges();
          input.value = '';
        },
        error: (err) => {
          console.error('Upload failed:', err);
          alert('Image upload failed');
          this.isLoading = false;
          this.cdr.detectChanges();
          input.value = '';
        }
      });
    }
  }
}