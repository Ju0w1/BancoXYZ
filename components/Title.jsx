import { StyleSheet, Text, View } from "react-native";
import { GenericIcon } from "./Icons";

export function Title({title, icon, children}){
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <GenericIcon size={20} color="black" name={icon}/>
                <Text style={styles.title}>{title}</Text>
            </View>
            {children ? children : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        borderTopWidth: 3,
        borderTopColor: '#007AFF',
        backgroundColor: 'white'
    },
    leftContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    title:{
        fontSize: 18,
        fontWeight: 'normal'
    },
    
})