"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserInDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // if user already exist with this user id
    if (yield user_model_1.default.isUserExists(userData.userId)) {
        throw new Error('user already exists with this userId');
    }
    const result = yield user_model_1.default.create(userData);
    return result;
});
const getUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({}).select('username fullName age email address'); // getting users without those fields
    return users;
});
const getSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ userId: Number(userId) }).select('-password -orders');
    if (!result) {
        throw new Error('User not found');
    }
    return result;
});
const updateUserByUserId = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdNumber = Number(userId);
    // if user not exist with this user id
    if (!(yield user_model_1.default.isUserExists(userIdNumber))) {
        throw new Error('user does not exists');
    }
    const updatedUser = yield user_model_1.default.findOneAndUpdate({ userId: userIdNumber }, updatedData, { new: true }).select('-password -orders');
    return updatedUser;
});
const deleteUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // if user not exist with this user id
    if (!(yield user_model_1.default.isUserExists(Number(userId)))) {
        throw new Error('user does not exists');
    }
    const deletedUser = yield user_model_1.default.deleteOne({ userId: Number(userId) });
    return deletedUser;
});
// * order section start
const createOrderByUserId = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdNumber = Number(userId);
    // if user not exist with this user id
    if (!(yield user_model_1.default.isUserExists(userIdNumber))) {
        throw new Error('user does not exists');
    }
    const newOrder = yield user_model_1.default.updateOne({ userId: userIdNumber }, { $push: { orders: orderData } });
    return newOrder;
});
const getOrdersFromUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdNumber = Number(userId);
    // if user not exist with this user id
    if (!(yield user_model_1.default.isUserExists(userIdNumber))) {
        throw new Error('user does not exists');
    }
    const orders = yield user_model_1.default.findOne({ userId: userIdNumber }).select('orders -_id');
    return orders;
});
const calculateOrdersTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdNumber = Number(userId);
    const total_price = yield user_model_1.default.aggregate([
        { $match: { userId: userIdNumber } },
        { $project: { _id: 0, totalPrice: { $sum: '$orders.price' } } }, // calculating totals from order price
    ]);
    return total_price;
});
exports.userService = {
    createUserInDb,
    getUsersFromDb,
    getSingleUserFromDb,
    updateUserByUserId,
    deleteUserFromDb,
    createOrderByUserId,
    getOrdersFromUser,
    calculateOrdersTotalPrice,
};
