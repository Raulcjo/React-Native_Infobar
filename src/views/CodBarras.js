import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { API_ENDPOINT } from '../config';

export default ({ route, navigation }) => {
  const [pedido, setPedido] = useState(route.params ? route.params : {});

  const fazerPedido = () => {
    const URL = API_ENDPOINT + 'Pedidos/AddPedido/';
    const dadosEnvio = {
      DataPedido: pedido.dataPedido,
      ColaboradorId: pedido.idCol,
      ProdutoId: pedido.idProd,
    };
  
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosEnvio),
    };
  
    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('A solicitação falhou');
        }
  
        return response.json();
      })
      .then((dadosResposta) => {
        console.log('Resposta do servidor: ', dadosResposta);
        // Correção na navegação para 'UserList'
        // navigation.navigate('');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const buscaProduto = async () => {
    const URL = API_ENDPOINT + 'Pedidos/CodBarrasConfirma/' + pedido.codigoBarras;

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error('A solicitação falhou');
      }

      const produtoNoBanco = await response.json();
      console.log('Resposta da API:', produtoNoBanco);

      if (produtoNoBanco && Object.keys(produtoNoBanco).length > 0) {
        // Resto do código
      } else {
        Alert.alert('Produto não encontrado', 'O produto associado ao código de barras não foi encontrado.');
      }

      if (produtoNoBanco) {
        Alert.alert(
          'Confirmar produto',
          `Esse é o Produto que você escolheu?\nNome: ${produtoNoBanco.nomeProd}\nPreço: ${produtoNoBanco.preco}`,
          [
            {
              text: 'Sim',
              onPress: () => fazerPedido(),
            },
            {
              text: 'Não',
            },
          ]
        );
      } else {
        Alert.alert('Produto não encontrado', 'O produto associado ao código de barras não foi encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o produto no banco de dados.');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.texto}>Código de Barras:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(codigoBarras) => setPedido({ ...pedido, codigoBarras })}
        placeholder="Digite o código de barras"
        value={pedido.codigoBarras}
      />

      <Button
        title="Comprar"
        onPress={() => {
          buscaProduto();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    padding: 10,
    fontSize: 18,
    height: 40,
    borderColor: '#192B4C',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
