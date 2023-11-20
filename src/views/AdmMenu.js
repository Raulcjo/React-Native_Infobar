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
  <Stack.Navigator>
    <Stack.Screen
      name="UserList"
      component={UserList}
      options={() => ({
        title: 'Lista de Colaboradores',
        headerRight: () => (
          <Icon
            name="add"  
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
            icon={<Icon name="add" size={25} color="blue" />}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const ProdutoStackNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProductsList"
      component={ProductsList}
      options={() => ({
        title: 'Lista de Produtos',
        headerRight: () => (
          <Icon
            name="add"  
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
  <Stack.Navigator>
    
  </Stack.Navigator>
)


const AdministradorMenu = () => {
  return (
    <Tab.Navigator>
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
