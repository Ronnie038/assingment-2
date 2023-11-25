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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_zod_validator_1 = require("./user.zod.validator");
const zod_1 = require("zod");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const parseZodData = user_zod_validator_1.userValidatorSchema.parse(userData);
        const _a = (yield user_service_1.userService.createUserInDb(parseZodData)).toObject(), { password } = _a, result = __rest(_a, ["password"]);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    }
    catch (error) {
        // if error comes from zod validator
        if (error instanceof zod_1.ZodError) {
            return res.status(403).json({
                success: false,
                message: 'user validation faild',
                error,
            });
        }
        const errorMessage = error.message;
        res.status(403).json({
            success: false,
            message: "User couldn't created",
            error: {
                code: 403,
                description: errorMessage,
            },
        });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getUsersFromDb();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error',
            error: {
                code: 500,
                description: 'internal server error',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_service_1.userService.getSingleUserFromDb(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedUser = yield user_service_1.userService.updateUserByUserId(userId, req.body);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const deleteUserByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const deletedUser = yield user_service_1.userService.deleteUserFromDb(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// * order section start
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orderData = req.body;
        const parseZodData = user_zod_validator_1.orderValidatorSchema.parse(orderData);
        const createdOrder = yield user_service_1.userService.createOrderByUserId(userId, parseZodData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield user_service_1.userService.getOrdersFromUser(userId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: orders,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const calculateOrdersTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const total_price = yield user_service_1.userService.calculateOrdersTotalPrice(userId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: total_price,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.userController = {
    createUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteUserByUserId,
    createOrder,
    getOrders,
    calculateOrdersTotal,
};
