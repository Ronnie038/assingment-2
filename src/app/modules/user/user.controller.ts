import { Request, Response } from 'express';
import { userService } from './user.service';
import { userValidatorSchema } from './user.zod.validator';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const parseZodData = userValidatorSchema.parse(userData);

    const result = await userService.createUserInDb(parseZodData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'user couldn"t created',
      error: {
        code: 500,
        description: 'user couldn"t created',
      },
    });
  }
};

export const studentController = {
  createUser,
};
