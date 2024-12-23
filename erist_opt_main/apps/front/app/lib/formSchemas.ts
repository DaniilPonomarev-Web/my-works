import { z } from 'zod';

export const ChangePassFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, 'Пароль должен быть длиной не менее 8 символов')
      .max(32, 'Пароль должен состоять максимум из 32 символов')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
      ),
    confirmNewPassword: z
      .string()
      .min(8, 'Пароль должен быть длиной не менее 8 символов')
      .max(32, 'Пароль должен состоять максимум из 32 символов')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
      ),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmNewPassword;
    },
    {
      message: 'Пароли не совпадают',
      path: ['newPassword'],
    }
  );

export const AddCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number(),
  optionValueId: z.string().uuid() || null,
});

export const RemoveFromCartSchema = z.object({
  itemId: z.string().uuid(),
});

export const UpdateCartItemQuantitySchema = z.object({
  itemId: z.string().uuid(),
  quantity: z.number(),
});
