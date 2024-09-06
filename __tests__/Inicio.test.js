import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Home } from '../components/screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { __getMockPush } from 'expo-router';

// // Mock de fetch
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ currency: 'USD', accountBalance: 1000 }),
//   })
// );

describe('Inicio', () => {
  beforeEach(() => {
    // Limpia los mocks antes de cada prueba
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue('userToken');
  });

  it('Carga inicio correctamente', async () => {
    const { getByTestId, getByText, queryByTestId } = render(<Home />);

    // Primero, debería mostrar el indicador de carga
    expect(getByTestId('home-loading-indicator')).toBeTruthy();

    // Espera a que los datos se carguen
    await waitFor(() => {
      // El indicador de carga debería desaparecer
      expect(queryByTestId('home-loading-indicator')).toBeNull();
      
      // Verifica que los elementos esperados estén presentes
      expect(getByTestId('listado-cuentas')).toBeTruthy();
    //   expect(getByTestId('listado-cuentas')).toBeTruthy();
    //   expect(getByText('Cuenta USD')).toBeTruthy();
    //   expect(getByText('USD 1000')).toBeTruthy();
    });

    // // Verifica que AsyncStorage.getItem fue llamado
    // expect(AsyncStorage.getItem).toHaveBeenCalledWith('userToken');
    
    // // Verifica que fetch fue llamado con los parámetros correctos
    // expect(fetch).toHaveBeenCalledWith(
    //   'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance',
    //   {
    //     headers: {
    //       'Authorization': 'Bearer fake-token'
    //     }
    //   }
    // );
  });

//   it('Maneja el cierre de sesión correctamente', async () => {
//     const { getByTestId } = render(<Home />);

//     // Espera a que se cargue el componente
//     await waitFor(() => {
//       expect(queryByTestId('loading-indicator')).toBeNull();
//     });

//     // Simula el cierre de sesión
//     const logoutButton = getByTestId('logout-button');
//     fireEvent.press(logoutButton);

//     // Verifica que se llamó a removeItem y push
//     await waitFor(() => {
//       expect(AsyncStorage.removeItem).toHaveBeenCalledWith('userToken');
//       expect(__getMockPush()).toHaveBeenCalledWith('/');
//     });
//   });
});