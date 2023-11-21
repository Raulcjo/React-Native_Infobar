import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { StyleSheet, Text } from 'react-native';

import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { API_ENDPOINT } from '../config';

export default (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dados, setDados] = useState([]);

  const getUsers = () => {
    const URL = API_ENDPOINT + 'Colaboradores/';

    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('A solicitação falhou');
        }
        return response.json();
      })
      .then((dadosEnvio) => {
        console.log('Resposta do servidor: ', dadosEnvio);
        setDados(dadosEnvio);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteApi = async (user) => {
    const URL = API_ENDPOINT + 'Colaboradores/DeleteCol/' + user.idCol;

    const options = {
      method: 'DELETE',
    };

    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na solicitação HTTP');
        }
        return response;
      })
      .then((responseData) => {
        Alert.alert('Exclusão!', 'Usuário excluído com sucesso!', [
          {
            text: 'Ok',
          },
        ]);
        getUsers();
      })
      .catch((error) => {
        console.error('Erro: ', error);
      });
  };

  function deletarUser(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o colaborador? ', [
      {
        text: 'Sim',
        onPress() {
          deleteApi(user);
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  const getUserItem = ({ item: user }) => {
    return (
      <ListItem
        bottomDivider
        containerStyle={styles.listItemContainer}
        onPress={() => {
          if (user.pedidos && user.pedidos.length > 0) {
            props.navigation.navigate('UserOrders', { userId: user.idCol });
          } else {
            Alert.alert('Sem Pedidos', 'Usuário não possui nenhum pedido.');
          }
        }}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.titulo}>{user.nome}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron
          name="edit"
          color="orange"
          size={25}
          onPress={() => props.navigation.navigate('UserForm', { user })}
        />
        <ListItem.Chevron
          name="delete"
          color="red"
          size={25}
          onPress={() => deletarUser(user)}
        />
      </ListItem>
    );
  };

  const atualiza = () => {
    setIsRefreshing(true);
    getUsers();
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={(user) => user.idCol}
        renderItem={getUserItem}
        refreshControl={
          <RefreshControl onRefresh={atualiza} refreshing={isRefreshing} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192B4C',
  },
  listItemContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#3498db',
    borderBottomWidth: 1,
  },
  titulo: {
    fontSize: 20,
    color: '#192B4C',
  },
});
