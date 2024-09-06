import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../components/screens/Login';
import { Alert } from 'react-native';
import { __getMockPush, __mockReset } from 'expo-router';
import AsyncStorage, { __getMockStorage } from '../__mocks__/async-storage';

// Mock de AsyncStorage
// jest.mock('@react-native-async-storage/async-storage', () => ({
//   setItem: jest.fn(),
//   getItem: jest.fn(),
// }));

// Mock de Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Login', () => {
  beforeEach(() => {
    __mockReset();
    jest.clearAllMocks();
  });

  it('Carga login correctamente', () => {
    const { getByTestId } = render(<Login />);
    
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('Permite la insercion de datos en los campos', () => {
    const { getByTestId } = render(<Login />);
    
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(emailInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');

    expect(emailInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('Redirige a la siguiente pantalla correctamente', async () => {
    const { getByTestId } = render(<Login />);
    
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-button');

    fireEvent.changeText(emailInput, 'wilson@topaz.com');
    fireEvent.changeText(passwordInput, '3333');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();

      const mockStorage = __getMockStorage();
      expect(mockStorage).toHaveProperty('userToken');
      expect(mockStorage.userToken).toBeTruthy();

      expect(mockStorage.userToken).not.toBeNull();

      expect(__getMockPush()).toHaveBeenCalledWith('/inicio');
    });
  });
  it('Muestra alerta si login erroneo', async () => {
    const { getByTestId } = render(<Login />);
    
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-button');

    fireEvent.changeText(emailInput, 'usuario_invalido');
    fireEvent.changeText(passwordInput, 'contraseña_invalida');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error al iniciar sesion.',
        "Unauthorized: Credenciais inválidas"
      );
    });
  });
});


