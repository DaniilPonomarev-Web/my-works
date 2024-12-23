export const variablesForUser = {
  signUpUser: {
    phone: {
      min: 11,
      max: 12,
      fix: 11,
    },
    password: {
      min: 8,
      max: 20,
    },

    name: {
      max: 40,
      min: 2,
    },
    company: {
      name: {
        max: 200,
        min: 3,
      },
      urAddress: {
        max: 200,
        min: 3,
      },
      inn: {
        min: 10,
        max: 12,
      },
      kpp: {
        fix: 9,
      },
    },
    addresses: {
      country: {
        max: 50,
        min: 3,
      },
      city: {
        max: 50,
        min: 3,
      },
      street: {
        max: 50,
        min: 3,
      },
      home: {
        max: 10,
        min: 1,
      },
      apartmentORoffice: {
        max: 10,
        min: 1,
      },
    },
  },
};
export const lengthPassword =
  Math.floor(
    Math.random() *
      (variablesForUser.signUpUser.password.max -
        variablesForUser.signUpUser.password.min +
        1)
  ) + variablesForUser.signUpUser.password.min;

export const updatedVariables = {
  ...variablesForUser,
  randomLengthPass: lengthPassword,
};

export const allowedExtensions = [
  'doc',
  'docx',
  'rtf',
  'pdf',
  'odt',
  'jpg',
  'jpeg',
  'png',
  'xlsx',
  'xls',
  'csv',
  'rar',
  'zip',
  '7z',
  'log',
  'webp',
  'gif',
  'mp4',
];
