import { Stack } from "expo-router";
import React, {useState} from "react"
import { View, StyleSheet, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen } from "../Screen";
import { useRouter } from 'expo-router';

export function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);

        try{
            const response = await fetch('https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            if(response.ok && data.token){
                AsyncStorage.setItem('userToken', data.token);
                router.push('/inicio');
            }else{
                Alert.alert('Error al iniciar sesion.', data.message)
            }
        }catch(err){
            Alert.alert('Error de conexion', 'Valide su conexion a internet')
        }finally{
            setLoading(false);
        }
    };

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                {loading ? (
                    <ActivityIndicator testID="loading-indicator" color={"black"}  size={"large"} />
                ) : (
                    <>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                inputMode="email"
                                testID="email-input"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                value={password}
                                inputMode="text"
                                testID="password-input"
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                        <Pressable testID="login-button" style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>
                                Ingresar
                            </Text>
                        </Pressable>
                    </>
                )}
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF'
    },
    title: {
      fontWeight: 'bold',
      fontSize: 50,
      marginBottom: 80,
      color: 'white'
    },
    inputContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        color: 'black'
      },
    button:{
        borderRadius: 20,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '50%',
        marginTop: 20
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#007AFF'
    }
  });