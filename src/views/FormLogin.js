import { TouchableOpacity, Image, Text, TextInput, View, KeyboardAvoidingView, StyleSheet, Alert } from "react-native"
import { useContext, useState, useEffect, useNavigation } from "react";
import UserContext from "../context/UserContext";
import { API_ENDPOINT } from "../config";

export default props => {
  const [valorLogin, setValorLogin] = useState("");
  const [valorSenha, setValorSenha] = useState("");
  const { state, dispatch } = useContext(UserContext);

  const buscaLogin = async () => {
    const URL = API_ENDPOINT + 'Colaboradores/BuscaLogin/';

    const dadosEnvio = {
      idCol: 0,
      credencial: valorLogin,
      senha: valorSenha,
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosEnvio),
      });
      const data = await response.json();
      console.log(response.status);

      if (response.ok) {
        console.log("Você fez login com sucesso");
        //props.navigation.push("AdministradorMenu");
      } else {
        Alert.alert('Erro', data.message || 'Falha no login.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };


  return (
    <KeyboardAvoidingView style={style.loginContainer}>
      <View style={style.loginContainer}>
        <Image source={require('../assets/infobar.png')} style={style.loginImageLogo} />
        <TextInput 
          style={style.loginTextInputs}
          placeholder="Digite o login"
          value={valorLogin}
          onChangeText={(valorLogin) => setValorLogin(valorLogin)}
        />
        <TextInput
          style={style.loginTextInputs}
          placeholder="Digite a senha"
          value={valorSenha}
          onChangeText={(valorSenha) => setValorSenha(valorSenha)}
          secureTextEntry={true}
        />
        
        <TouchableOpacity
          style={style.loginButton}
          onPress={() => {
            console.log("ENTROU ONPRESS:", state);
            buscaLogin()
            /*if (state && state.users) {
              await loginUser();

              if (state.user) {
                console.log("Usuário encontrado:", state.user);
                props.navigation.navigate("UserList");
              } else {
                console.warn("Usuário não encontrado!");
              }
            } else {
              console.warn("Contexto ou lista de usuários não está definido!");
            }*/
          }}
        >
          <Text style={style.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};



const style = StyleSheet.create({
    loginContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192B4C",
    },
    loginTextInputs:{
        backgroundColor: "#888888",
        width: 300,
        height: 55,
        marginTop: 30,
        fontSize: 15,
        borderRadius: 30,
        padding: 10,
        color: "#084160",
        borderColor: "#192B4C"
        
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