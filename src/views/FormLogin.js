import { TouchableOpacity, Image, Text, TextInput, View, KeyboardAvoidingView, StyleSheet } from "react-native"
import { useContext, useState, useEffect, useNavigation } from "react"
import UserContext from "../context/UserContext";
import { API_ENDPOINT } from "../config";

export default props => {
    [valorLogin, setValorLogin] = useState("");
    [valorSenha, setValorSenha] = useState("");
    const {dispatch} = useContext(UserContext);
    const [dados, setDados] = useState([])

    const buscaLogin = async () => { 
        
        const URL = API_ENDPOINT + 'Colaboradores/BuscaLogin/';
        
        const dadosEnvio = {
            idCol: dados.idCol,
            crendecial: dados.valorLogin,
            senha: dados.valorSenha
        }

        const options = {

            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosEnvio)
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
                setDados(dadosEnvio);
                console.warn("To aqui!!!")
            }
        ).catch(
            (error) =>{
                console.error(error)
            }
        )

    }

    return(
        <KeyboardAvoidingView  style={style.loginContainer}>
            <View style={style.loginContainer}>
                <Image source={require('../assets/infobar.png')} style={style.loginImageLogo} />
                <TextInput 
                    style={style.loginTextInputs}
                    placeholder="Digite o login"
                    value={valorLogin}
                    onChangeText={ (valorLogin) => setValorLogin(valorLogin)}
                />
                <TextInput
                    style={style.loginTextInputs}
                    placeholder="Digite a senha"
                    value={valorSenha}
                    onChangeText={ (valorSenha) => setValorSenha(valorSenha) }
                    secureTextEntry={true}
                />
                
                <TouchableOpacity 
                    style={style.loginButton}
                    onPress={ ()=> {buscaLogin()}}
                >
                    <Text style={style.loginButtonText}>LOGIN</Text>    
                </TouchableOpacity>
                
            </View>
        </KeyboardAvoidingView>
   
    )
}


const style = StyleSheet.create({
    loginContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192B4C",
    },
    loginTextInputs:{
        backgroundColor: "#fff",
        width: 300,
        height: 55,
        marginTop: 30,
        fontSize: 15,
        borderRadius: 30,
        padding: 10,
        color: "#084160",
        borderColor: "#192B4C",
    },
    loginButtonText:{
        color: 'white',
    },
    loginButton:{
        width: 300,
        height: 55,
        backgroundColor: "#192B4C",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        borderColor: "#192B4C"
    },
    loginImageLogo:{
        width: 300 ,
        height: 100,
    },
    loginContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffff",
    },
})