import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,  } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FormLogin from './views/FormLogin';
import AdministradorMenu from './views/AdmMenu';
import ColaboradorMenu from './views/ColMenu';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); 

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FormLogin">
      <Stack.Screen
        name="FormLogin"
        component={FormLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AdmMenu" component={AdministradorMenu} options={{ headerShown: false }} />
      <Stack.Screen name="ColMenu" component={ColaboradorMenu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 
