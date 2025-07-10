export interface VehicleRequest {
  /** 
   * Registered ID is required.
   * Format: DL01AB1234 (2 letters, 2 digits, 1–2 letters, 4 digits)
   */
  registered_id: string;

  /** Owner name is required */
  owner_name: string;

  /** Owner ID is required */
  ownerId: string;

  /** Brand is required */
  brand: string;

  /** Model is required */
  model: string;

  /** Type is required */
  type: string;

  /** Seater must be at least 1 */
  seater: number;

  /** Price per day must be > 0 */
  pricePerDay: number;

  /** Category is required */
  category: string;

  /** Location is required */
  locate: string;

  /** 
   * Image URL is required.
   * Max length: 500
   * Must match: https://res.cloudinary.com/...
   */
  secure_url: string;
}
