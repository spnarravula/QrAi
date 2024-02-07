export interface RazorOrderApiRequest {
    // Define the properties your request body expects
    // e.g., name: string, age: number
    amount : number;
    currency: string;
    receipt:string;
    notes:  any;
  }
  
  export interface RazorOrderApiResponse {
    // Define the properties your response will have
    // e.g., message: string, status: number
    id: string;
  entity: string;
  amount: number;
  amountPaid: number; // Adjust the name for better readability
  amountDue: number;
  currency: string;
  receipt: string;
  offerId: string | null; // Use "null" instead of "None" for proper type safety
  status: "created" | "paid" | "attempted"; // You can extend this enum as needed
  attempts: number;
  notes: string[];
  createdAt: number; // Assuming timestamp
  }