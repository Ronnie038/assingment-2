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

export const userRoute = router;
