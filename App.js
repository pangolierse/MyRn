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
  const App = () => {
    return (
    //  <Login />
      <AuthProvider>
        <UserInterface/>
      </AuthProvider>
    );
  };
 
  export default App;
 