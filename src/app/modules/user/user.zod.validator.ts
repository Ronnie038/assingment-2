import { z } from 'zod';

export const orderValidatorSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const userValidatorSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  fullName: z.object({
    firstName: z
      .string()
      .min(3, { message: 'name must be more then 3 charactor' })
      .max(30),
    lastName: z
      .string()
      .min(3, { message: 'name must be more then 3 charactor' })
      .max(30),
  }),
  orders: z.array(orderValidatorSchema),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});
