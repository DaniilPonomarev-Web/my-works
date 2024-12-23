import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useNotify, useDataProvider, Button } from 'react-admin';

const statuses = [
  { id: 'created', name: 'Создан' },
  { id: 'paid', name: 'Оплачен' },
  { id: 'inprocessing', name: 'В обработке' },
  { id: 'sent', name: 'Отправлен' },
  { id: 'closed', name: 'Закрыт' },
];

const OrderStatusUpdate = ({ orderId, currentState }) => {
  const [status, setStatus] = useState(currentState);
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const params = { id: orderId, state: status };
      await dataProvider.updateStatus('orders', params);
      notify('Статус заказа обновлен');
    } catch (error) {
      console.error('Update Status Error:', error);
      notify('Ошибка при обновлении статуса');
    }
  };

  return (
    <Box sx={{ m: 10, p: 4 }} borderTop={1}>
      <Typography variant="h6">Обновление статуса заказа</Typography>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="status-label">Статус</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          onChange={handleChange}
          label="Статус"
        >
          {statuses.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        label="Обновить статус"
        onClick={handleSubmit}
        sx={{
          mt: 2,
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          fontSize: '1.2rem',
          padding: '0.75rem 1.5rem',
          '&:hover': {
            backgroundColor: 'white',
            color: 'black',
            opacity: 0.85,
          },
        }}
      />
    </Box>
  );
};

export default OrderStatusUpdate;
