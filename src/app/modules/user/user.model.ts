import mongoose, { Schema } from 'mongoose';

import bcrypt from 'bcrypt';
import { TOrder, TUser, UserModel } from './user.interface';
import config from '../../config';

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
      firstName: String,
      lastName: String,
    },

    orders: { type: [orderSchema], default: [] },

    hobbies: { type: [String], default: [] },
    address: {
      street: String,
      city: String,
      country: String,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
// * making the hashed password using bcrypt
userSchema.pre('save', async function (next) {
  const password = this.password;
  const saltRounds = Number(config.bcrypt_salt_rounds);

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  this.password = hashedPassword;

  next();
});

// * removing the password after creating the user to send user Response
// userSchema.post('save', function (data, next) {
//   this.password = '';

//   next();
// });

// * checking user exists or not
userSchema.statics.isUserExists = async id => {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

const User = mongoose.model<TUser, UserModel>('User', userSchema);

export default User;
