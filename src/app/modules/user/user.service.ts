import { TUser } from './user.interface';
import User from './user.model';

const createUserInDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists with this id');
  }
  const result = await User.create(userData);

  return result;
};

export const userService = {
  createUserInDb,
};
