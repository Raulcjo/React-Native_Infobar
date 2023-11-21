import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Icon } from '@rneui/base';

import PedidosList from './PedidosList';
import CodBarras from './CodBarras';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const CodBarrasStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="ScannerPage"
      component={CodBarras}
      options={{ title: 'Realizar Compra' }}
    />
  </Stack.Navigator>
);

const PedidosStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="PedidosList"
      component={PedidosList}
      options={{ title: 'Conferir Pedidos' }}
    />
  </Stack.Navigator>
);

const ColaboradorMenu = ({route}) => {
  //const { idCol } = route.params;
  //console.log(idCol);
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#192B4C",
        inactiveTintColor: '#bdc3c7',
        style: {
          backgroundColor: '#2c3e50',
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Pedidos"
        component={PedidosStackNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
          headerRight: () => (
            <Icon
              name="add"
              color="white"
              onPress={() => {
                navigation.navigate('UserForm');
                console.log('Botão de adição pressionado!');
              }}
              containerStyle={{ marginRight: 10 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Scanner"
        component={CodBarrasStackNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="wine-bottle" size={size} color={color} />
          ),
          headerRight: () => (
            <Icon
              name="add"
              color="white"
              onPress={() => {
                navigation.navigate('ProductsForm');
                console.log('Botão de adição pressionado!');
              }}
              containerStyle={{ marginRight: 10 }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default ColaboradorMenu;
