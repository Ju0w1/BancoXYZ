import { Text, StyleSheet, FlatList, View, ActivityIndicator} from "react-native";
import { Screen } from "../Screen";
import { Stack } from "expo-router";
import { Title } from "../Title";
import { PressableWithChildren } from "../PressableWithChildren";
import { GenericIcon } from "../Icons";
import { TransactionCard } from "../TransactionCard";
import { SearchBar } from "../SeachBar";
import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TRANSACCTIONS_ENDPOINT = 'https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList'

export function TransaccionesMenu (props){
    const {account} = props

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [arrayOfTransacctions, setTransacctions] = useState([])

    useEffect(() => {
        setLoading(true)
        fetchData(TRANSACCTIONS_ENDPOINT)
    },[])

    const fetchData = async (url) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(url,{
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            const json = await response.json()

            const transacctions = json.transfers

            const newArray = []

            transacctions.forEach(element => {
                const newTransaction = {
                    idCuenta: account,
                    moneda: element.currency,
                    importe: element.value ,
                    concepto: `Transferencia de ${element.payeer.name} con documento ${element.payeer.document}`,
                    fecha: new Date(element.date),
                    enviado: false,
                }

                newArray.push(newTransaction)
            });
            
            setTransacctions(newArray)
        }catch (error){
            setError(error)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const [search, setSearch] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const handleSearchBar = (query) => {
        setSearch(query)
    }

    useEffect(() => {
        if(!isLoading){
            const query = search.toLowerCase();
            const filtered = arrayOfTransacctions.filter((transaction) => {
                const conceptoMatch = transaction.concepto.toLowerCase().includes(query);
                const importeMatch = transaction.importe.toString().includes(query);
                const fechaMatch = transaction.fecha.toLocaleDateString().includes(query);
    
                return conceptoMatch || importeMatch || fechaMatch;
            });
            setFilteredTransactions(filtered);
        }
    }, [search, arrayOfTransacctions, isLoading]);

    const router = useRouter();

    const handleNewTransfer = async () => {
        router.push(`../transferir/${account}`, { relativeToDirectory: true });
    };

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
                <PressableWithChildren disabled={isLoading ? true : false} onPress={handleNewTransfer} style={styles.rightContainer}>
                    <>
                        <Text style={styles.secondTitle}>Transferir</Text>
                        <GenericIcon size={18} color="black" name='add'/>
                    </>
                </PressableWithChildren>
            </Title>
            {
                isLoading ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={'large'}/>
                    </View>
                ): (
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
                )
            }
            
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