export const parseSort = (sort: string | undefined) => {
  if (!sort)
    return {
      sortBy: undefined,
      sortOrder: undefined,
    };

  const [sortBy, sortOrder] = sort.split('_');

  return {
    sortBy,
    sortOrder,
  };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const flattenError = (errors: any[]) => {
  const _errors: any = {};
  for (const err of errors) {
    const messages = err.extensions?.originalError?.message;
    if (typeof messages === 'string') {
      return {
        global: messages,
      };
    }
    if (!messages?.length) return _errors;
    for (const msg of messages) {
      const keys = Object.keys(msg.constraints);
      for (const key of keys) {
        if (!_errors[msg.property]) _errors[msg.property] = [];
        _errors[msg.property] = [
          ..._errors[msg.property],
          msg.constraints[key],
        ];
      }
    }
  }
  return _errors;
};

//, selectedOptions, onOptionChange
// Объединяем опции с одинаковыми именами
export const combinedOptions = (options: any) => {
  return options.reduce((acc: any, currentOption: any) => {
    // Проверяем, есть ли уже опция с таким id
    const existingOptionIndex = acc.findIndex(
      (opt: any) => opt.id === currentOption.id
    );

    if (existingOptionIndex !== -1) {
      // Если опция уже существует, объединяем значения
      currentOption.values.forEach((value: any) => {
        const existingValue = acc[existingOptionIndex].values.find(
          (v: any) => v.value.id === value.value.id
        );
        if (!existingValue) {
          acc[existingOptionIndex].values.push(value);
        }
      });
    } else {
      // Если опции нет, добавляем ее
      acc.push({ ...currentOption });
    }

    return acc;
  }, []);
};

export const groupOptions = (id: any, options: any) => {
  const opts = [];

  const _: any = {
    Размеры: 'optionValueId',
  };

  for (const o of options) {
    const opt: {
      id: string;
      name: string;
      alias: string;
      components: any[];
    } = {
      id: o.id,
      name: o.name,
      alias: _[o.name],
      components: [],
    };
    for (const v of o.values) {
      opt.components.push({
        type: v.option.type,
        name: _[v.option.name],
        id: v.id,
        text: v.value.name,
        href: v.href,
        colorCode: v.value.colorCode,
        quantity: v.quantity,
      });
    }

    opts.push(opt);
  }

  return opts;
};
