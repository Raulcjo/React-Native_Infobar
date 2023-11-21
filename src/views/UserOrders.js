// UserOrders.js

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { API_ENDPOINT } from '../config';

function UserOrdersScreen({ route }) {
  const { userId } = route.params;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    const URL = API_ENDPOINT + `Colaboradores/ViewCol` + userId;

    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('A solicitação falhou');
        }
        return response.json();
      })
      .then((orderData) => {
        setOrders(orderData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, [userId]);

  const renderOrderItem = ({ item: order }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{order.productName}</ListItem.Title>
        <ListItem.Subtitle>R$ {order.productValue}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const refreshOrders = () => {
    setIsRefreshing(true);
    getOrders();
    setIsRefreshing(false);
  };

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.orderId.toString()}
        renderItem={renderOrderItem}
        refreshControl={
          <RefreshControl
            onRefresh={refreshOrders}
            refreshing={isRefreshing}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos, se necessário
});

export default UserOrdersScreen;
