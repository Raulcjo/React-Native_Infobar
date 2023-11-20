import React, { useEffect } from 'react'
import { View, Text, FlatList, Alert, RefreshControl } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'

import { useContext, useState  } from 'react'
import UserContext from '../context/UserContext'
import { API_ENDPOINT } from '../config'

export default props => {

    const{state, dispatch} = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [dados, setDados] = useState([])

    const getUsers = () => {
        const URL = API_ENDPOINT + 'Colaboradores/';

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
        getUsers()
    },
    []
    )

    const deleteApi = async (user) =>{
        const URL = API_ENDPOINT + 'Colaboradores/DeleteCol/' + user.idCol

        const options = {
            method: 'DELETE'

        }
        console.log("ERROR!!!!FETCH!!!", user.idCol)

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
                    'Usuário excluído com sucesso!',
                    [
                        {
                            text: 'Ok',
                            
                            //onPress: () => props.navigation.push('UserList')
                        }
                    ]
                   
                )
                getUsers();
            })
            .catch(error => {
                console.error('Erro: ', error)
            })
    }
    


    function deletarUser(user) {
        Alert.alert ('Excluir Usuário', 'Deseja excluir o colaborador ? ', [
            {
                text: "Sim",
                onPress(){
                    deleteApi(user)
                }
            },
            {
                text:"Não"
            }
        ]
        )
    }


    const getUserItem = ({ item: user, navigation }) => {
        return (
            <ListItem
            bottomDivider
            onPress={() => props.navigation.navigate("UserOrders", { userId: user.idCol })}
          >
            <ListItem.Content>
              <ListItem.Title>{user.nome}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron
              name="edit"
              color="orange"
              size={25}
              onPress={() => props.navigation.navigate("UserForm", { user })}
            />
            <ListItem.Chevron
              name="delete"
              color="red"
              size={25}
              onPress={() => deletarUser(user)}
            />
          </ListItem>
        );

    }
    const atualiza = ()=>{
        setIsRefreshing(true)
        //props.navigation.push("UserList")
        getUsers();
        setIsRefreshing(false)
    }

    return(
        <View>
            <FlatList 
                data={dados}
                keyExtractor={ user => user.idCol}
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