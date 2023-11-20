import React, { useEffect } from 'react'
import { View, Text, FlatList, Alert, RefreshControl, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native';
import { ListItem } from '@rneui/themed';
import { useContext, useState  } from 'react'
import UserContext from '../context/UserContext'
import { API_ENDPOINT } from '../config'


export default props => {

    const{state, dispatch} = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [dados, setDados] = useState([])

    const getProd = () => {
        const URL = API_ENDPOINT + 'Produtos/';

        const options ={
           
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
            },
            
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
                console.log("Resposta do servidor: ", dadosEnvio);
                setDados(dadosEnvio);
            }
        ).catch((error) => {
                console.error('Erro durante a solicitação:', error);
            });
    }

    useEffect(()=>{
        getProd()
    },
    []
    )

    const deleteApi = async (produto) =>{
        const URL = API_ENDPOINT + 'Produtos/DeleteProd/' + produto.idProd

        const options = {
            method: 'DELETE'

        }
        console.log("ERROR!!!!FETCH!!!", produto.idProd)

        fetch(URL, options)
            .then(response => {
                
                if(!response.ok){
                    throw new Error('Erro na solicitação HTTP')
                }
               return response;
            })
            .then(responseData => {
                
                Alert.alert(
                    'Exclusão!',
                    'Produto excluído com sucesso!',
                    [
                        {
                            text: 'Ok',
                            //onPress: () => props.navigation.push('ProductsList')
                        }
                    ]
                )
                getProd();
            })
            .catch(error => {
                console.error('Erro: ', error)
            })
    }
    


    function deletarProd(produto) {
        Alert.alert ('Excluir Produto', 'Deseja excluir o produto ? ', [
            {
                text: "Sim",
                onPress(){
                    deleteApi(produto)
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