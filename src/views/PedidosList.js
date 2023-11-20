import React, { useEffect } from 'react'
import { View, Text, FlatList, Alert, RefreshControl } from 'react-native'
import { Button, Icon, ListItem } from 'react-native'
import { StyleSheet } from 'react-native'

import { useContext, useState  } from 'react'
import UserContext from '../context/UserContext'
import { API_ENDPOINT } from '../config'

export default props => {

    const{state, dispatch} = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [dados, setDados] = useState([])

    const getPedido = () => {
        const URL = API_ENDPOINT + 'Pedidos/ViewCol/'; //+ idCol

        const options ={
           
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
            }
            
        };

        fetch(URL, options)
        .then(
            (response) => {
                if(!response.ok){
                    throw new Error('A solicitação falhou')
                }
                return response.json();
            }
        ).then(
            (dadosEnvio) =>{
                console.log('Resposta do servidor: ', dadosEnvio)
                setDados(dadosEnvio)
                //navigation.push('UserList')
            }
        ).catch(
            (error) =>{
                console.error(error)
            }
        )
    }

    useEffect(()=>{
        getPedido()
    },
    []
    )

    const deleteApi = async (pedido) =>{
        const URL = API_ENDPOINT + 'Produtos/DeletePedido/' + pedido.idPed

        const options = {
            method: 'DELETE'

        }
        console.log("ERROR!!!!FETCH!!!", pedido.idPed)

        fetch(URL, options)
            .then(response => {
                
                if(!response.ok){
                    throw new Error('Erro na solicitação HTTP')
                }
               return  response
            })
            .then(responseData => {
                
                Alert.alert(
                    'Exclusão!',
                    'Pedido excluído com sucesso!',
                    [
                        {
                            text: 'Ok',
                            //onPress: () => props.navigation.push('ProductsList')
                        }
                    ]
                )
                getPedido();
            })
            .catch(error => {
                console.error('Erro: ', error)
            })
    }
    


    function deletarProd(pedido) {
        Alert.alert ('Excluir Pedido', 'Deseja excluir o pedido ? ', [
            {
                text: "Sim",
                onPress(){
                    deleteApi(pedido)
                }
            },
            {
                text:"Não"
            }
        ]
        )
    }


    function getUserItem({item: produto}){
        return(
            <ListItem bottomDivider >

                <ListItem.Content >
                    <ListItem.Title>{produto.nomeProd}</ListItem.Title>
                    <ListItem.Subtitle>R$ {produto.preco}</ListItem.Subtitle>
                    
                </ListItem.Content>
                <ListItem.Chevron 
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={()=>props.navigation.navigate("ProductsForm", produto)}
                />
                <ListItem.Chevron 
                    name="delete"
                    color="red"
                    size={25}
                    onPress={()=> {deletarProd(produto)}}
                />
            </ListItem>
        )

    }
    const atualiza = ()=>{
        setIsRefreshing(true)
       // props.navigation.push("ProductsList")
        getProd();
        setIsRefreshing(false)
    }

    return(
        <View>
            <FlatList 
                data={dados}
                keyExtractor={ produto => produto.idProd}
                renderItem={getUserItem}
                refreshControl={
                    <RefreshControl
                        onRefresh={atualiza}
                        refreshing={isRefreshing}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    titulo:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    subt:{
        fontSize: 25
    }

}

)