import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);

router.get('/', userController.getUsers);

router
  .route('/:userId')
  .get(userController.getSingleUser)
  .put(userController.updateSingleUser)
  .delete(userController.deleteUserByUserId);

router.route('/:userId/orders').post(userController.createOrder);

export const userRoute = router;
