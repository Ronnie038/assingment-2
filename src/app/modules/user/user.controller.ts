import { Request, Response } from 'express';
import { userService } from './user.service';
import {
  orderValidatorSchema,
  userValidatorSchema,
} from './user.zod.validator';
import { ZodError } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const parseZodData = userValidatorSchema.parse(userData);

    const { password, ...result } = (
      await userService.createUserInDb(parseZodData)
    ).toObject();

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    // if error comes from zod validator
    if (error instanceof ZodError) {
      return res.status(403).json({
        success: false,
        message: 'user validation faild',
        error,
      });
    }
    const errorMessage = (error as Error).message;
    res.status(403).json({
      success: false,
      message: "User couldn't created",
      error: {
        code: 403,

        description: errorMessage,
      },
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDb();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'internal server error',
      error: {
        code: 500,
        description: 'internal server error',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userService.getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedUser = await userService.updateUserByUserId(userId, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userService.deleteUserFromDb(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// * order section start

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;

    const parseZodData = orderValidatorSchema.parse(orderData);

    const createdOrder = await userService.createOrderByUserId(
      userId,
      parseZodData,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(403).json({
        success: false,
        message: 'order validation faild',
        error,
      });
    }

    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteUserByUserId,
  createOrder,
};
