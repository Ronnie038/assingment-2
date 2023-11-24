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

const updateUserByUserId = async (
  userId: string,
  updatedData: Partial<TUser>,
) => {
  const userIdNumber = Number(userId);

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
  if (!(await User.isUserExists(Number(userId)))) {
    throw new Error('user does not exists');
  }
  const deletedUser = await User.deleteOne({ userId: Number(userId) });

  return deletedUser;
};

export const userService = {
  createUserInDb,
  getUsersFromDb,
  getSingleUserFromDb,
  updateUserByUserId,
  deleteUserFromDb,
};
