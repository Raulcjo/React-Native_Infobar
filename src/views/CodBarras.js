import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { API_ENDPOINT } from '../config';

export default ({ route, navigation }) => {
  const [pedido, setPedido] = useState(route.params ? route.params : {});
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    fetch(URL, options)
      .then((response) => response.json())
      .then((dadosResposta) => {
        console.log('Resposta do servidor: ', dadosResposta);
        // Navegue para a tela apropriada após o pedido ser concluído com sucesso
        // navigation.navigate('TelaSucesso');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'Ocorreu um erro ao fazer o pedido.');
      })
      .finally(() => setLoading(false));
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
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Código de Barras:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(codigoBarras) => setPedido({ ...pedido, codigoBarras })}
          placeholder="Digite o código de barras"
          value={pedido.codigoBarras}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            buscaProduto();
          }}
        >
          <Text style={styles.buttonText}>Comprar</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator style={styles.loading} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192B4C', // cor dark desejada
  },
  form: {
    width: '80%',
    backgroundColor: '#fff', // cor branca para o formulário
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#192B4C', // cor da borda das inputs
    elevation: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#192B4C', // cor dark desejada
  },
  input: {
    padding: 10,
    fontSize: 18,
    height: 40,
    borderColor: '#3498db', // azul pomegranate
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    color: '#192B4C', // cor dark desejada
  },
  button: {
    backgroundColor: '#4CAF50', // verde desejado
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 10,
  },
});
