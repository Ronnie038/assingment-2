"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.createUser);
router.get('/', user_controller_1.userController.getUsers);
router
    .route('/:userId')
    .get(user_controller_1.userController.getSingleUser)
    .put(user_controller_1.userController.updateSingleUser)
    .delete(user_controller_1.userController.deleteUserByUserId);
router
    .route('/:userId/orders')
    .post(user_controller_1.userController.createOrder)
    .get(user_controller_1.userController.getOrders);
router.get('/:userId/orders/total-price', user_controller_1.userController.calculateOrdersTotal);
exports.userRoute = router;
