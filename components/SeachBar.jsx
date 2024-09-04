import { StyleSheet, TextInput, View} from "react-native";
import { GenericIcon } from "./Icons";

export function SearchBar({ ...props }){

    return(
        <>
            <View style = {styles.searchBarContainer}>
                <View style = {styles.iconContainer}>
                    <GenericIcon 
                        size={18} 
                        color="black" 
                        name='search'
                    />
                </View>
                <TextInput
                    style = {styles.input} 
                    {...props}
                />
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    searchBarContainer:{
        height: 40,
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    input:{
        paddingLeft: 5,
        width: '90%',
        height: '100%',
        color:'black',
        borderBottomWidth: 1,
    },
    iconContainer:{
        borderBottomWidth: 1,
        height: '100%',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})