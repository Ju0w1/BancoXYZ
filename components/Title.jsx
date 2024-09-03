import { StyleSheet, Text, View } from "react-native";
import { GenericIcon } from "./Icons";

export function Title({title, icon}){
    return (
        <View style={styles.container}>
            <GenericIcon name={icon}/>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        color: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    }
})