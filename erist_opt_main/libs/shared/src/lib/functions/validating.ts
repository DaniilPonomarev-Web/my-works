import { BadRequestException, ValidationError } from '@nestjs/common';
import { HttpExceptionMessagesGraphQL } from '../http-exceptions-messages';
import { IError } from '../interfaces';
import { variablesForUser } from '../variables/variables';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function validationExceptionFactory(errors: ValidationError[]) {
  return new BadRequestException(
    errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
      children: error.children,
    }))
  );
}

// export const validateRussianPhoneNumber = async (
//   phoneNumber: number
// ): Promise<IError> => {
//   const parsedPhoneNumber = parsePhoneNumberFromString(
//     phoneNumber.toString(),
//     'RU'
//   );
//   if (!parsedPhoneNumber) {
//     return {
//       status: false,
//       message: HttpExceptionMessagesGraphQL.valiadtions.phone,
//     };
//   }
//   // Проверка, что номер телефона действителен
//   if (!(parsedPhoneNumber !== null && parsedPhoneNumber.isValid())) {
//     return {
//       status: false,
//       message: HttpExceptionMessagesGraphQL.valiadtions.phone,
//     };
//   }
//   return {
//     status: true,
//   };
// };

// export const validateEmail = async (email: string): Promise<IError> => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const cyrillicRegex = /[а-яё]/i;

//   const regexp = emailRegex.test(email) && !cyrillicRegex.test(email);
//   if (!regexp) {
//     return {
//       status: false,
//       message: HttpExceptionMessagesGraphQL.valiadtions.emailCorrect,
//     };
//   }
//   return {
//     status: true,
//   };
// };

// export const validateINN = async (inn: string): Promise<IError> => {
//   if (
//     inn.length < variablesForUser.inn.min ||
//     inn.length > variablesForUser.inn.max
//   ) {
//     return {
//       status: false,
//       message: HttpExceptionMessagesGraphQL.valiadtions.inn.errorValid,
//     };
//   }
//   // Проверка на наличие букв или других символов, кроме цифр
//   if (!/^\d+$/.test(inn)) {
//     return {
//       status: false,
//       message: HttpExceptionMessagesGraphQL.valiadtions.inn.errorValid,
//     };
//   }

//   return {
//     status: true,
//   };
// };

// export const validateKPP = async (kpp: string): Promise<IError> => {
//   if (kpp.length != variablesForUser.kpp) {
//     return {
//       status: false,
//       message: HttpExceptionMessagesGraphQL.valiadtions.kpp.errorValid,
//     };
//   }
//   // Проверка на наличие букв или других символов, кроме цифр
//   if (!/^\d+$/.test(kpp)) {
//     return {
//       status: false,
//       message: HttpExceptionMessagesGraphQL.valiadtions.kpp.errorCharter,
//     };
//   }

//   return {
//     status: true,
//   };
// };

// export const validatePassword = async (
//   password: string,
//   confirmPassword?: string
// ): Promise<IError> => {
//   // Проверка совпадения паролей
//   if (confirmPassword && password !== confirmPassword) {
//     const error: IError = {
//       status: false,
//       message: HttpExceptionMessagesGraphQL.valiadtions.password.mismatch,
//     };
//     return error;
//   }

// // Проверка длины пароля
// if (password.length < variablesForUser.passwordMin) {
//   const error: IError = {
//     status: false,
//     message: HttpExceptionMessagesGraphQL.valiadtions.password.errorPassword1(
//       variablesForUser.passwordMin
//     ),
//   };
//   return error;
// }

// Проверка наличия прописных букв
// if (!/[A-Z]/.test(password)) {
//   const error: IError = {
//     status: false,
//     message: HttpExceptionMessagesGraphQL.valiadtions.password.errorPassword2,
//   };
//   return error;
// }

// Проверка наличия строчных букв
// if (!/[a-z]/.test(password)) {
//   const error: IError = {
//     status: false,
//     message: HttpExceptionMessagesGraphQL.valiadtions.password.errorPassword3,
//   };
//   return error;
// }

// // Проверка наличия цифр или знаков препинания
// if (!/[0-9\W_]/.test(password)) {
//   const error: IError = {
//     status: false,
//     message: HttpExceptionMessagesGraphQL.valiadtions.password.errorPassword3,
//   };
//   return error;
// }

//   const success: IError = {
//     status: true,
//   };
//   return success;
// };
