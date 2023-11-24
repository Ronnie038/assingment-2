import mongoose, { Schema } from 'mongoose';

import bcrypt from 'bcrypt';
import { TOrder, TUser, UserModel } from './user.interface';

const orderSchema = new Schema<TOrder>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>(
  {
    userId: {
      type: Number,
      unique: true,
      required: [true, 'provide a unique id for user'],
      index: true,
    },

    username: {
      type: String,
      required: [true, 'provide a username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please provide a strong password'],
    },
    email: String,
    fullName: {
      type: {
        firstName: String,
        lastName: String,
      },
      required: true,
    },

    orders: { type: [orderSchema], default: [] },

    hobbies: { type: [String], default: [] },
    address: {
      type: {
        street: String,
        city: String,
        country: String,
      },
      required: true,
    },
  },
  { timestamps: true },
);

// * creating existingUser user checking method
userSchema.statics.isUserExists = async id => {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

const User = mongoose.model<TUser, UserModel>('User', userSchema);

export default User;
