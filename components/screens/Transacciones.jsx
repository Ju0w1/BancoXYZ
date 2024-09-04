import { Text, StyleSheet, FlatList} from "react-native";
import { Screen } from "../Screen";
import { Stack } from "expo-router";
import { Title } from "../Title";
import { PressableWithChildren } from "../PressableWithChildren";
import { GenericIcon } from "../Icons";
import { TransactionCard } from "../TransactionCard";
import { SearchBar } from "../SeachBar";
import { useState, useEffect } from "react";


export function TransaccionesMenu (props){
    const [search, setSearch] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const {account} = props

    const handleNewTransfer = async () => {

        router.push('/transfer');
        
    };

    const handleSearchBar = (query) => {
        setSearch(query)
        
    }

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

    useEffect(() => {
        const query = search.toLowerCase();
        const filtered = arrayOfTransacctions.filter((transaction) => {
            const conceptoMatch = transaction.concepto.toLowerCase().includes(query);
            const importeMatch = transaction.importe.toString().includes(query);
            const fechaMatch = transaction.fecha.toLocaleDateString().includes(query);

            return conceptoMatch || importeMatch || fechaMatch;
        });
        setFilteredTransactions(filtered);
    }, [search]);

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerBackButtonMenuEnabled: true,
                    gestureEnabled: true,
                    title: "",
                    headerBackTitle: 'Inicio',
                }}
            />
            <Title title={'Movimientos'} icon={'list'}>
                <PressableWithChildren onPress={handleNewTransfer} style={styles.rightContainer}>
                    <>
                        <Text style={styles.secondTitle}>Transferir</Text>
                        <GenericIcon size={18} color="black" name='add'/>
                    </>
                </PressableWithChildren>
            </Title>
            <FlatList
                data={filteredTransactions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TransactionCard transaccion={item} />
                )}
                ListHeaderComponent={
                    <SearchBar
                        onChangeText={(query) => handleSearchBar(query)}
                        value={search}
                        placeholder="Filtro (concepto, fecha, importe)"
                    />
                }
            />
        </Screen>
    );
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