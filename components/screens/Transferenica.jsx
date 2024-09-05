import { Text, StyleSheet, FlatList, View, TextInput} from "react-native";
import { Screen } from "../Screen";
import { Stack } from "expo-router";
import { Title } from "../Title";
import { useState } from "react";
import { PressableWithChildren } from "../PressableWithChildren";
import { GenericIcon } from "../Icons";
import { DatetimePicker } from "../DateTimePicker";
import Checkbox from "expo-checkbox";


export function Transferencia (props){
    const [document, setDocument] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [isChecked, setChecked] = useState(false);

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
                <PressableWithChildren style={styles.buttonContainer}>
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

