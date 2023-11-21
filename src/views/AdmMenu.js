import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UserList from './UserList';
import ProductsList from './ProductsList';
import UserForm from './UserForm';
import ProductsForm from './ProductsForm';
import UserOrders from './UserOrders';
import OrdersListScreen from './OrdersListScreen';
import { Icon } from '@rneui/base';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C', // Cor de fundo do header
      },
      headerTintColor: '#FFFFFF', // Cor do texto do header
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="UserList"
      component={UserList}
      options={() => ({
        title: 'Lista de Colaboradores',
        headerRight: () => (
          icon=<Icon
            name="add"  
            color='white'
            onPress={() => {
              navigation.navigate('UserForm');
              console.log('Botão de adição pressionado!');
            }}
            containerStyle={{ marginRight: 10 }}
          />
        ),
      })
    }
    />
    <Stack.Screen
      name="UserForm"
      component={UserForm}
      options={{ title: 'Adicionar Colaborador' }}
    />
    <Stack.Screen
      name="UserOrders"
      component={UserOrders}
      options={{ title: 'Pedidos desse usuário' }}
    />
    <Stack.Screen
      name="OrdersList"
      component={OrdersListScreen}
      options={({ route, navigation }) => ({
        title: `Pedidos de ${route.params?.userName || 'Colaborador'}`,
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate("ProductsForm")}
            type='clear'
            icon={<Icon name="add" size={25} color="white" />}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const ProdutoStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C', // Cor de fundo do header
      },
      headerTintColor: '#FFFFFF', // Cor do texto do header
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="ProductsList"
      component={ProductsList}
      options={() => ({
        title: 'Lista de Produtos',
        headerRight: () => (
         icon= <Icon
            name="add"
            color="white"  
            onPress={() => {
              navigation.navigate('ProductsForm');
              console.log('Botão de adição pressionado!');
            }}
            containerStyle={{ marginRight: 10 }}
          />
        ),
      })
    } 
    />
    <Stack.Screen
      name="ProductsForm"
      component={ProductsForm}
      options={{ title: 'Adicionar Produto' }}
    />
  </Stack.Navigator>
);

const OrdersStackNavigation = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#192B4C', // Cor de fundo do header
      },
      headerTintColor: '#FFFFFF', // Cor do texto do header
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    
  </Stack.Navigator>
)

const AdministradorMenu = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#192B4C', // Cor do ícone ativo
        inactiveTintColor: 'gray', // Cor do ícone inativo
        style: {
          backgroundColor: '#FFFFFF', // Cor de fundo da barra de navegação
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Colaboradores"
        component={UserStackNavigator}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        })
      }
      />
      <Tab.Screen
        name="Produtos"
        component={ProdutoStackNavigator}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="wine-bottle" size={size} color={color} />
          ),
        })
      }
      />
    </Tab.Navigator>
  );
};

export default AdministradorMenu;
