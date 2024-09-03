import { Stack } from "expo-router";
import React, {useState} from "react"
import { View, StyleSheet, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen } from "./Screen";
import { useRouter } from 'expo-router';

export function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);

        if (email === 'peculio.pablo@gmail.com' && password === 'pass') {
            await AsyncStorage.setItem('userToken', 'abc123');
            console.log(email, password);
            setLoading(false);
            router.push('/inicio');
        } else {
            Alert.alert('Error al iniciar sesion.', 'Correo o contraseña incorrecta')
            // console.log('Error al iniciar sesion.', 'Correo o contraseña incorrecta');
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
                    <ActivityIndicator color={"black"}  size={"large"} />
                ) : (
                    <>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                        <Pressable style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>
                                Ingesar
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
        backgroundColor: 'skyblue'
    },
    title: {
      fontWeight: 'bold',
      fontSize: 50,
      marginBottom: 80,
    },
    inputContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'steelblue',
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'powderblue'
      },
    button:{
        borderRadius: 20,
        backgroundColor: 'steelblue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '50%',
        marginTop: 20
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    }
  });