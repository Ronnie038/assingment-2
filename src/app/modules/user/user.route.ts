import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);

router.get('/', userController.getUsers);

router.route('/:userId').get(userController.getSingleUser).put().delete();

export const userRoute = router;
