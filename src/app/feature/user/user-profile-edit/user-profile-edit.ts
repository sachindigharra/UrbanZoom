import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CloudinaryService } from '../../../core/services/cloudinary.service';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-edit',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-profile-edit.html',
  styleUrl: './user-profile-edit.css'
})
export class UserProfileEdit {
 userProfileForm: FormGroup;
  isLoading: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cloudinaryService: CloudinaryService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.userProfileForm = this.fb.group({
      secure_url: ['', [Validators.required, Validators.maxLength(500), Validators.pattern(/^https:\/\/res\.cloudinary\.com\/.+/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      drivingLicense: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(1)]],
      aadharNumber: ['', [Validators.required, Validators.pattern(/^[2-9]{1}[0-9]{11}$/)]]
    });
  }

  ngOnInit(): void {
    this.setLoading(true);
    // this.userService.getUserProfile().subscribe({
    //   next: (data: UserProfileRequestDto) => {
    //     this.userProfileForm.patchValue({
    //       secure_url: data.secure_url || '',
    //       phone: data.phone || '',
    //       drivingLicense: data.drivingLicense || '',
    //       dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toString() : '',
    //       gender: data.gender || '',
    //       address: data.address || '',
    //       aadharNumber: data.aadharNumber || ''
    //     });
    //     this.userProfileForm.markAsPristine();
    //     this.setLoading(false);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching user profile:', err);
    //     alert('Failed to load user profile');
    //     this.setLoading(false);
    //     this.router.navigate(['/home']);
    //   }
    // });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    console.log('Submit button clicked!', this.userProfileForm.value);
    // if (this.userProfileForm.valid) {
    //   this.setLoading(true);
    //   const updatedProfile: UserProfileRequestDto = this.userProfileForm.value;
    //   this.userService.updateUserProfile(updatedProfile).subscribe({
    //     next: () => {
    //       alert('Profile updated successfully');
    //       this.isEditMode = false;
    //       this.setLoading(false);
    //       this.router.navigate(['/home']);
    //     },
    //     error: (err) => {
    //       console.error('Update failed:', err);
    //       alert('Failed to update profile');
    //       this.setLoading(false);
    //     }
    //   });
    // } else {
    //   this.userProfileForm.markAllAsTouched();
    //   const invalidFields = Object.keys(this.userProfileForm.controls)
    //     .filter(key => this.userProfileForm.get(key)?.invalid)
    //     .map(key => ({
    //       field: key,
    //       errors: this.userProfileForm.get(key)?.errors
    //     }));
    //   console.log('Invalid fields:', invalidFields);
    //   alert('Please fill all required fields correctly:\n' +
    //     invalidFields.map(f => `${f.field}: ${JSON.stringify(f.errors)}`).join('\n'));
    // }
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

      this.setLoading(true);
      this.cloudinaryService.uploadImage(file).subscribe({
        next: (res: any) => {
          this.userProfileForm.patchValue({ secure_url: res.secure_url });
          this.setLoading(false);
          input.value = '';
        },
        error: (err) => {
          console.error('Upload failed:', err);
          alert('Image upload failed');
          this.setLoading(false);
          input.value = '';
        }
      });
    }
  }

  private setLoading(state: boolean): void {
    this.isLoading = state;
    this.cdr.detectChanges();
  }
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}
