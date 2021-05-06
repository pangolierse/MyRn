/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import Login from './src/login';
 import UserInterface from './src/router';
 import AuthProvider from '~/context/AuthContext'
import { Toast, Provider } from '@ant-design/react-native';
const App = () => {
    return (
    //  <Login />
    <Provider>
      <AuthProvider>
        <UserInterface/>
      </AuthProvider>
    </Provider>
    );
  };
 
  export default App;
 