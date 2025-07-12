export interface UserResponse {
  id: string;

  name: string;

  email: string;

  phone?: string; // optional

  gender?: 'MALE' | 'FEMALE' | 'OTHER'; // optional if needed

  dateOfBirth?: string; // ISO date string, optional
  secure_url:string;
}
