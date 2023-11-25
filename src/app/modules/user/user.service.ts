import { TOrder, TUser } from './user.interface';
import User from './user.model';

const createUserInDb = async (userData: TUser) => {
  // if user already exist with this user id
  if (await User.isUserExists(userData.userId)) {
    throw new Error('user already exists with this userId');
  }
  const result = await User.create(userData);

  return result;
};

const getUsersFromDb = async () => {
  const users = await User.find({}).select(
    'username fullName age email address',
  ); // getting users without those fields
  return users;
};

const getSingleUserFromDb = async (userId: string) => {
  const result = await User.findOne({ userId: Number(userId) }).select(
    '-password -orders',
  );
  if (!result) {
    throw new Error('User not found');
  }
  return result;
};

const updateUserByUserId = async (
  userId: string,
  updatedData: Partial<TUser>,
) => {
  const userIdNumber = Number(userId);

  // if user not exist with this user id
  if (!(await User.isUserExists(userIdNumber))) {
    throw new Error('user does not exists');
  }
  const updatedUser = await User.findOneAndUpdate(
    { userId: userIdNumber },
    updatedData,
    { new: true },
  ).select('-password -orders');

  return updatedUser;
};

const deleteUserFromDb = async (userId: string) => {
  // if user not exist with this user id
  if (!(await User.isUserExists(Number(userId)))) {
    throw new Error('user does not exists');
  }
  const deletedUser = await User.deleteOne({ userId: Number(userId) });

  return deletedUser;
};

// * order section start

const createOrderByUserId = async (userId: string, orderData: TOrder) => {
  const userIdNumber = Number(userId);

  // if user not exist with this user id
  if (!(await User.isUserExists(userIdNumber))) {
    throw new Error('user does not exists');
  }
  const newOrder = await User.updateOne(
    { userId: userIdNumber },
    { $push: { orders: orderData } },
  );

  return newOrder;
};

const getOrdersFromUser = async (userId: string) => {
  const userIdNumber = Number(userId);

  // if user not exist with this user id
  if (!(await User.isUserExists(userIdNumber))) {
    throw new Error('user does not exists');
  }

  const orders = await User.findOne({ userId: userIdNumber }).select(
    'orders -_id',
  );
  return orders;
};

const calculateOrdersTotalPrice = async (userId: string) => {
  const userIdNumber = Number(userId);

  const total_price = await User.aggregate([
    { $match: { userId: userIdNumber } }, // find user by userId
    { $project: { _id: 0, totalPrice: { $sum: '$orders.price' } } }, // calculating totals from order price
  ]);

  return total_price;
};

export const userService = {
  createUserInDb,
  getUsersFromDb,
  getSingleUserFromDb,
  updateUserByUserId,
  deleteUserFromDb,
  createOrderByUserId,
  getOrdersFromUser,
  calculateOrdersTotalPrice,
};
