import { Box, Button, Typography, CircularProgress } from '@material-ui/core';

const ProductList = ({ products, onRemove, isLoading, error }) => {
  if (isLoading) {
    return (
      <Box mt={2} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Typography color="error">
          Ошибка при загрузке товаров: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <Typography variant="h6">Товары</Typography>
      {products.length > 0 ? (
        products.map((product) => (
          <Box
            key={product.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography>{product.model}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onRemove(product.id)}
            >
              Удалить
            </Button>
          </Box>
        ))
      ) : (
        <Typography>Нет товаров</Typography>
      )}
    </Box>
  );
};

export default ProductList;
