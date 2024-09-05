import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export function DatetimePicker(props){
    if (Platform.OS === 'android'){
        return <AndroidDateTimePicker {...props}/>
    }
    if (Platform.OS === 'ios'){
        return <IOSDateTimePicker {...props}/>
    }

    return <DefaultDateTimePicker {...props}/>
            
}

export const DefaultDateTimePicker = ({onChange, currentDate}) => {
    return(
        <>
            <Text style={styles.placeholder}>Fecha</Text>
            <TextInput
                onChange={(_, date) => onChange(date || new Date())}
                style={styles.input}
                placeholder={currentDate.toLocaleDateString}
                value={currentDate}
                inputMode="text"
            />
        </>
    )
}

export const AndroidDateTimePicker = ({ onChange, currentDate}) => {
    const showDateTimePicker = () =>{
        DateTimePickerAndroid.open({
            value: currentDate,
            minimumDate: new Date(),
            onChange: (_, date) => onChange(date || new Date()),
            mode: 'date',
            
        })
    }

    return (
        <View style={styles.container}>
            <Pressable  style={styles.calendarButton} onPress={showDateTimePicker}>
                <Text>
                    Calendario
                </Text>
            </Pressable>
            <Text style={styles.actualDate}>
                {currentDate.toLocaleDateString()}
            </Text>
        </View>
        
    )
}

export const IOSDateTimePicker = ({onChange, currentDate}) => {
    return (
        <RNDateTimePicker
            style={{alignSelf: 'flex-start', marginTop: 10}}
            minimumDate={new Date()}
            value={currentDate}
            display="default"
            onChange={(_,date) => onChange(date || new Date())}
            mode="date"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    placeholder:{
        marginTop: 10,
    },
    input:{
        width: '100%',
        height: 30,
        color:'black',
        borderBottomWidth: 1,
        borderBottomColor: '#0000f',
    },
    calendarButton:{
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: '#007AFF',
        borderWidth: 2,
        justifyContent: 'space-around',
    },
    actualDate:{
        marginLeft: 10
    }
})