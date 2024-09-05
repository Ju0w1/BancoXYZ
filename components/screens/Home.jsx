import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../Screen";
import { Stack } from "expo-router";
import { Logo } from "../Logo";
import { LogOutIcon, MoneyIcon } from "../Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { SaldoActual } from "../SaldoActual";
import { Title } from "../Title";
import { useEffect, useState } from "react";

const BALANCE_ENDPOINT = 'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance'

export function Home(){
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [arrayOfAccounts, setAccounts] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        setLoading(true)
        fetchData(BALANCE_ENDPOINT)
        getName()
    },[])

    // Ejemplo
    // setAccounts([
    //     {
    //         id:0,
    //         tipoCuenta: 'USD',
    //         balance: 1999.50,
    //     },
    //     {
    //         id:1,
    //         tipoCuenta: 'UYU',
    //         balance: 55000,
    //     },
    // ])

    const getName = async () => {
        try{
            const nameObtained = await AsyncStorage.getItem('userName');

            if(nameObtained){
                setName(nameObtained)
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const fetchData = async (url) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(url,{
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            const json = await response.json()

            const newAccountsArray = []

            const newBalance = {
                id: arrayOfAccounts.length,
                tipoCuenta: json.currency,
                balance: json.accountBalance
            }
            
            newAccountsArray.push(newBalance)

            setAccounts(newAccountsArray)
        }catch (error){
            setError(error)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            'Cerrar sesión', 
            '¿Estas seguro de que deseas cerrar sesión?',
            [
                {
                    text: 'Si',
                    onPress: async () => {
                        await AsyncStorage.removeItem('userToken');
                        router.push('/');
                    }
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ]
        )
    };


    return (
        <Screen >
            <Stack.Screen
                options={{
                    headerLeft: () => <Logo/>,
                    headerRight: () => (
                        <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={handleLogout}>
                            {
                                name ? (
                                    <Text>{name}</Text>
                                ) : null
                            }
                            <LogOutIcon/>
                        </Pressable>
                    ),
                    gestureEnabled: false,
                    title: ""
                }}
            />
            {
                isLoading ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={'large'}/>
                    </View>
                ): (
                    <>
                        <Title title = {'Cuentas'} icon = {'attach-money'}/>
                        <FlatList style = {styles.lista}
                            data={arrayOfAccounts}
                            keyExtractor={(account) => account.id}
                            renderItem={({item, index}) => (
                                <SaldoActual cuenta={item}/>
                            )}
                        />
                    </>
                )
            }
           
        </Screen>
    )
}


const styles = StyleSheet.create({
    lista:{
        paddingTop: 10,
    },
})