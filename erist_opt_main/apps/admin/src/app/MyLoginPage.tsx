import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },
  formWrapper: {
    padding: theme.spacing(4),
    maxWidth: 400,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  inputField: {
    marginBottom: theme.spacing(3),
  },
  submitButton: {
    padding: theme.spacing(1.5),
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  adornment: {
    color: theme.palette.grey[600],
  },
}));

const MyLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username, password }).catch(() => notify('Ошибка авторизации'));
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="xs">
        <Paper className={classes.formWrapper} elevation={3}>
          <Typography variant="h5" className={classes.title}>
            Вход в аккаунт
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Логин"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              className={classes.inputField}
            />
            <TextField
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              className={classes.inputField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      className={classes.adornment}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitButton}
            >
              Войти
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default MyLoginPage;
