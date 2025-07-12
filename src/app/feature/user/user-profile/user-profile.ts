import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CloudinaryService } from '../../../core/services/cloudinary.service';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { UserRequest } from '../../../core/model/interface/user-request';
import { UserResponse } from '../../../core/model/interface/user-response';
import { CountNullFieldsPipe } from '../../../shared/pipes/count-null-fields-pipe';
import { PercentageShow } from '../../../shared/resuable/percentage-show/percentage-show';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {
  ngOnInit(): void {
    this.setLoading(true);
    this.userService.getUser("u_0-oBRt").subscribe({
      next: (data: UserResponse) => {
        this.userProfile = data;
        this.user={
          name: this.userProfile?.name||'Samuel Wilson',
          dateOfBirth: this.userProfile?.dateOfBirth||'January 1, 1987',
          gender: this.userProfile?.gender||'Male',
          nationality: 'Indian',
          address:'California - United States',
          phone: this.userProfile?.phone||'(213) 555-1234',
          email:this.userProfile?.email|| 'wilson@example.com'
        };
        const fieldCount = Object.keys(data).length;
       this.profilePercentage = Number(
          ((fieldCount - this.pipe.transform(data)) / fieldCount * 100).toFixed(2)
        );
        console.log(this.profilePercentage)
        console.log(this.userProfile);
        this.setLoading(false);
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        alert('Failed to load user profile');
        this.setLoading(false);
        this.router.navigate(['/home']);
      }
    });
  }
  userProfile:UserResponse|null=null;
  isLoading: boolean = false;
  profilePercentage:number=0;
  pipe = new CountNullFieldsPipe();
  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  //demo user
user: { [key: string]: string } = {
  name: this.userProfile?.name||'Samuel Wilson',
  dateOfBirth: this.userProfile?.dateOfBirth||'January 1, 1987',
  gender: this.userProfile?.gender||'Male',
  nationality: 'Indian',
  address:'California - United States',
  phone: this.userProfile?.phone||'(213) 555-1234',
  email:this.userProfile?.email|| 'wilson@example.com'
};


personalFields = [
  { key: 'name', label: 'Full name' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'gender', label: 'Gender' },
  { key: 'nationality', label: 'Nationality' },
  { key: 'address', label: 'Address' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Email' }
];

originalUser = { ...this.user };
editMode: Record<string, boolean> = {};
isChanged = false;

enableEdit(field: string) {
  this.editMode[field] = true;
}

cancelEdit(field: string) {
  this.user[field] = this.originalUser[field];
  this.editMode[field] = false;
  this.checkIfChanged();
}

markChanged(field: string) {
  this.checkIfChanged();
}

checkIfChanged() {
  this.isChanged = Object.keys(this.user).some(
    key => this.user[key] !== this.originalUser[key]
  );
}

saveChanges() {
  // TODO: Send `this.user` to API
  this.originalUser = { ...this.user };
  this.isChanged = false;
  this.editMode = {};
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
