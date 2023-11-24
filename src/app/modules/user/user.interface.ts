import { Model } from 'mongoose';

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export interface TUser {
  userId: number;
  username: string;
  password: string;
  email: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  orders: TOrder[];
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
}

// * for creating static method
export interface UserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}
