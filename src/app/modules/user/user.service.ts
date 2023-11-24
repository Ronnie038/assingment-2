import { TUser } from './user.interface';
import User from './user.model';

const createUserInDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('user already exists with this userId');
  }
  const result = await User.create(userData);

  return result;
};

const getUsersFromDb = async () => {
  const users = await User.find({}).select(
    'username fullName age email address',
  );
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
export const userService = {
  createUserInDb,
  getUsersFromDb,
  getSingleUserFromDb,
};
