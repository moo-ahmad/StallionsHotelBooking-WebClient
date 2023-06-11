export interface CreateBookigRequest {
    arrivalDate: Date;
    departureDate: Date;
    roomType: string;
    numOfGuests: number;
    name: string;
    email: string;
    phoneNumber: string;
    specialRequests: string;
    paymentInfo: string;
    termsAndConditions: boolean
}