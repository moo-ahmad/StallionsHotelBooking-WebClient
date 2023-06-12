export interface GetBookingResponse {
    bookingId: string;
    arrivalDate: Date;
    departureDate: Date;
    numOfGuests: number;
    name: string;
    email: string;
    bookingStatus: string;
}