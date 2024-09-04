import { Text, StyleSheet, FlatList} from "react-native";
import { Screen } from "../Screen";
import { Stack } from "expo-router";
import { Title } from "../Title";
import { PressableWithChildren } from "../PressableWithChildren";
import { GenericIcon } from "../Icons";
import { TransactionCard } from "../TransactionCard";

export function TransaccionesMenu (props){

    const {account} = props

    const handleNewTransfer = async () => {

        router.push('/transfer');
        
    };

    const arrayOfTransacctions = [
        {
            idCuenta: account,
            moneda: account == 0 ? 'USD' : 'UYU',
            importe: account == 0 ? 1999.50 : 45000 ,
            concepto: 'Transferencia a X',
            fecha: new Date('2024-09-04'),
            enviado: true,
        },
        {
            idCuenta: account,
            moneda: account == 0 ? 'USD' : 'UYU',
            importe: account == 0 ? 100 : 4000 ,
            concepto: 'Transferencia a X',
            fecha: new Date('2024-09-03'),
            enviado: true,
        },
        {
            idCuenta: account,
            moneda: account == 0 ? 'USD' : 'UYU',
            importe: account == 0 ? 250.50 : 28000 ,
            concepto: 'Transferencia a X',
            fecha: new Date('2024-09-05'),
            enviado: false,
        },
    ]

    return(
        <Screen>
            <Stack.Screen
                options={{
                    headerBackButtonMenuEnabled: true,
                    gestureEnabled: true,
                    title: "",
                    headerBackTitle: 'Inicio',
                }}
            />
            <Title title = {'Movimientos'} icon = {'list'} >
                <PressableWithChildren onPress={handleNewTransfer} style={styles.rightContainer}>
                    { (
                        <>
                            <Text style={styles.secondTitle}>Transferir</Text>
                            <GenericIcon size={18} color="black" name='add'/>
                        </>
                    )}
                </PressableWithChildren>
            </Title>
            <FlatList style = {styles.lista}
                data={arrayOfTransacctions}
                keyExtractor={(account, index) => index}
                renderItem={({item}) => (
                    <TransactionCard transaccion={item}/>
                )}
            />       
        </Screen>
    )
}

const styles = StyleSheet.create({
    rightContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '50%'
    },
    secondTitle:{
        fontSize: 16,
        fontWeight: 'regular'
    }
})