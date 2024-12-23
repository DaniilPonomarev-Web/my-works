import React from 'react';
import { useInput } from 'react-admin';

const ColorPicker = ({ input, meta, ...rest }) => {
  const { value, onChange } = input;

  return (
    <div className="flex items-center space-x-2">
      <input
        type="color"
        value={value || '#000000'}
        onChange={onChange}
        className="w-10 h-10 p-0 border rounded-full"
        {...rest}
      />
      <input
        type="text"
        value={value || ''}
        onChange={onChange}
        className="border p-2 rounded"
        placeholder="Введите цвет в формате HEX"
      />
    </div>
  );
};

const ColorInput = (props) => {
  const { input, meta } = useInput(props);
  return <ColorPicker input={input} meta={meta} {...props} />;
};

export default ColorInput;
