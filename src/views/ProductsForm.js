import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { API_ENDPOINT } from '../config';
import { useContext } from 'react'
import UserContext from '../context/UserContext'

export default ({route, navigation}) => {
  const [produto, setProduto] = useState(route.params ? route.params : {});
  const{dispatch} = useContext(UserContext)

  const CriaProduto = () => {
    const URL = API_ENDPOINT + 'Produtos/AddProduto/';

    const dadosEnvio = {
      idProduto: produto.idProduto,
      nomeProd: produto.nomeProd,
      preco: produto.preco,
      quantidade: produto.quantidade,
      codBarras: produto.codBarras
      
    };

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosEnvio)
    };

    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('A solicitação falhou');
        }
        return response.json();
      })
      .then(
        (dadosEnvio) => {
            console.log('Resposta do servidor: ', dadosEnvio);
            // Correção na navegação para 'UserList'
            navigation.navigate('ProductsList');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.texto}>Nome do Produto:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(nomeProd) => setProduto({ ...produto, nomeProd })}
        placeholder="Digite o nome do produto"
        value={produto.nomeProd}
      />

      <Text style={styles.texto}>Preço:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(preco) => setProduto({ ...produto, preco })}
        placeholder="Digite o preço"
        
        value={produto.preco}
      />

      <Text style={styles.texto}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(quantidade) => setProduto({ ...produto, quantidade })}
        placeholder="Digite a quantidade"
        
        value={produto.quantidade}
      />

      <Text style={styles.texto}>Código de barras:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(codBarras) => setProduto({ ...produto, codBarras })}
        placeholder="Digite o código de barras"
        
        value={produto.codBarras}
      />

      <Button
        style={styles.teste}
        title="Salvar"
        onPress={() => {
          CriaProduto();
        }}
      />

      <Button
        style={styles.teste}
        title="Voltar"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = {
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

  teste: {
    marginTop: 20,
    borderRadius: 30,
  },
};

