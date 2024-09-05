import { Text, StyleSheet, FlatList, View, TextInput, Alert, ActivityIndicator} from "react-native";
import { Screen } from "../Screen";
import { Stack } from "expo-router";
import { Title } from "../Title";
import { useState } from "react";
import { PressableWithChildren } from "../PressableWithChildren";
import { GenericIcon } from "../Icons";
import { DatetimePicker } from "../DateTimePicker";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function Transferencia (props){
    const [document, setDocument] = useState('');
    const [monto, setMonto] = useState(0);
    const [fecha, setFecha] = useState(new Date());
    const [isChecked, setChecked] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const {account} = props

    function onChangeDate(newDate){
        setFecha(newDate || new Date())
    }

    function onChangeCheckbox(checkboxState){
        setChecked(checkboxState)

        if(checkboxState === false){
            setFecha(new Date())
        }
    }

    const handleTransfer = async () => {
        try{
            setLoading(true)

            const body = {
                value: parseFloat(monto),
                currency: account == 0 ? 'USD' : null,
                payeerDocument: document,
                transferDate: fecha.toISOString().slice(0,10)
            }

            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch('https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer',{
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            const data = await response.json()

            if(response.ok){
                Alert.alert('Transferencia enviada', data.message)
                setDocument('')
                setMonto('')
                setFecha(new Date())
                setChecked(false)
            }else{
                Alert.alert('Error al enviar transferencia', data.message)
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerBackButtonMenuEnabled: true,
                    gestureEnabled: true,
                    title: "",
                    headerBackTitle: 'Movimientos',
                }}
            />
            <Title title={' Nueva transferencia'} icon={'send'}/>
            <View style={styles.accountContainer}>
                <Text style={styles.account}>Cuenta: {account}</Text>
                <Text style={styles.accountType}>{account == 0 ? 'USD' : 'UYU'}</Text>
            </View>
            {
                isLoading ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={"large"} />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.placeholder}>Documento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="51091626"
                            value={document}
                            onChangeText={setDocument}
                            inputMode="text"
                        />
                        <Text style={styles.placeholder}>Monto</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="1500"
                            value={monto}
                            onChangeText={setMonto}
                            inputMode="decimal"
                        />
                        <View style={styles.section}>
                            <Checkbox 
                                style={styles.checkbox} 
                                value={isChecked} 
                                onValueChange={onChangeCheckbox}
                            />
                            <Text style={styles.paragraph}>
                                Programar fecha
                            </Text>
                        </View>
                        {
                            isChecked ? (
                                <DatetimePicker 
                                    onChange={onChangeDate}
                                    currentDate={fecha}
                                />
                            ) : (
                                null
                            )
                        }
                        <PressableWithChildren onPress={handleTransfer} style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Text style={styles.textButton}>Transferir</Text>
                                {
                                    isChecked ? (
                                        <GenericIcon size={18} color="white" name='schedule-send'/>
                                    ) : (
                                        <GenericIcon size={18} color="white" name='send'/>
                                    )
                                }
                            </View>
                        </PressableWithChildren>
                    </View>
                )
            }
        </Screen>
    );
}

const styles = StyleSheet.create({
    accountContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    container:{
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        flex: 1
    },
    input:{
        width: '100%',
        height: 30,
        color:'black',
        borderBottomWidth: 1,
        borderBottomColor: '#0000f',
    },
    placeholder:{
        marginTop: 10,
    },
    account:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    accountType:{
        fontSize: 16,
        color: '#007AFF',
        fontWeight: 'bold'
    },
    button:{
        flexDirection: 'row',
        backgroundColor: '#007AFF',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        justifyContent: 'space-around',
        width: '50%'
    },
    buttonContainer:{
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
    },
    textButton:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        marginTop: 8,
        marginRight: 8,
        marginBottom: 8
    },
})

