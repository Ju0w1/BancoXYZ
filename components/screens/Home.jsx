import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../Screen";
import { Stack } from "expo-router";
import { Logo } from "../Logo";
import { LogOutIcon, MoneyIcon } from "../Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { SaldoActual } from "../SaldoActual";
import { Title } from "../Title";

export function Home(){
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

    const arrayOfAccouns = [
        {
            id:0,
            tipoCuenta: 'USD',
            balance: 1999.50,
        },
        {
            id:1,
            tipoCuenta: 'UYU',
            balance: 55000,
        },
    ]

    return (
        <Screen >
            <Stack.Screen
                options={{
                    headerLeft: () => <Logo/>,
                    headerRight: () => (
                        <Pressable onPress={handleLogout}>
                            <LogOutIcon/>
                        </Pressable>
                    ),
                    gestureEnabled: false,
                    title: ""
                }}
            />
            <Title title = {'Cuentas'} icon = {'attach-money'}/>
            <FlatList style = {styles.lista}
                data={arrayOfAccouns}
                keyExtractor={(account) => account.id}
                renderItem={({item, index}) => (
                    <SaldoActual cuenta={item}/>
                )}
            />
        </Screen>
    )
}


const styles = StyleSheet.create({
    lista:{
        paddingTop: 10,
    },
})