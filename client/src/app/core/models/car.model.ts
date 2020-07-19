import { User } from './user.model';

export class Car {
  _id?: string;
  type: string;
  hand: Number;
  manufactured: Number;
  isRented: Boolean;
  image: String;
  mileage: Number;
  carAgent: User;

  constructor() {
    this.type = "";
    this.hand = 0;
    this.manufactured = 1950;
    this.mileage = 0;
    this.image = "";
    this.isRented = false;
    this.carAgent = {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: {
        country: "",
        city: "",
        street: "",
        number: 0
      }
    }
  }
}
