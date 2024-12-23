import { useState } from 'react';

export function useNumericInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\D/g, '');
    setValue(newValue);
  };

  return [value, handleChange] as const;
}
