export interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
  address?: {
    country: string,
    city: string,
    street: string,
    number: number,
    location? : {
      lat: number,
      lang: number
    }

  }
}
