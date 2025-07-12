export interface UserRequest {
    secure_url: string; // required

  phone: string; // must match /^[6-9][0-9]{9}$/

  drivingLicense: string; // must match /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/

  dateOfBirth: string; // ISO string expected, must be in the past

  gender: 'MALE' | 'FEMALE' | 'OTHER'; // enum values as string

  address: string; // required

  aadharNumber: string; // must match /^[2-9]{1}[0-9]{11}$/
}
