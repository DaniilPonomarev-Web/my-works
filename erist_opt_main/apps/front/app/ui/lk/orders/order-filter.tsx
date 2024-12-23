import { DatePickerWithRange } from '../../filter/DateRangePicker';
import { SimpleInput } from '../../filter/SimpleInput';

const filterProps = [
  {
    placeholder: 'Номер заказа',
    param: 'orderNumber',
  },
  {
    placeholder: 'Наименование товара',
    param: 'productName',
  },
  {
    placeholder: 'Сумма заказа ОТ',
    param: 'totalAmountFrom',
  },
  {
    placeholder: 'Сумма заказа ДО',
    param: 'totalAmountTo',
  },
];

export const OrderFilter = () => {
  return (
    <div className="grid grid-rows-1 md:grid-rows-1 grid-flow-col gap-2">
      <div className="grid grid-cols-2 gap-4 md:grid-rows-2">
        {filterProps.map((prop, key) => (
          <SimpleInput
            key={key}
            placeholder={prop.placeholder}
            param={prop.param}
          />
        ))}
      </div>
      {/* <div>
        <DatePickerWithRange />
      </div> */}
    </div>
  );
};
