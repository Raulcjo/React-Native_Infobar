import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import PedidosList from './PedidosList';
import CodBarras from './CodBarras';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CodBarrasStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Scanner"
      component={CodBarras}
      options={{ title: 'Realizar Compra' }}
    />
  </Stack.Navigator>
);

const PedidosStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PedidosList"
      component={PedidosList}
      options={{ title: 'Conferir Pedidos' }}
    />
  </Stack.Navigator>
);

const ColaboradorMenu = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Pedidos"
        component={PedidosStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Scanner"
        component={CodBarrasStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default ColaboradorMenu;
