"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidatorSchema = exports.orderValidatorSchema = void 0;
const zod_1 = require("zod");
exports.orderValidatorSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.userValidatorSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(3, { message: 'user must be required' }),
    password: zod_1.z.string(),
    email: zod_1.z.string().email(),
    fullName: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(3, { message: 'name must be more then 3 charactor' })
            .max(30),
        lastName: zod_1.z
            .string()
            .min(3, { message: 'name must be more then 3 charactor' })
            .max(30),
    }),
    orders: zod_1.z.array(exports.orderValidatorSchema),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: zod_1.z.object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        country: zod_1.z.string(),
    }),
    age: zod_1.z.number(),
});
