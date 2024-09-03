import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { GenericIcon } from "./Icons";

export function SaldoActual({ cuenta }){
    const handleAccountInfo = () => {
        Alert.alert(
            'Acceder a cuenta', 
            'Se mostrara listado de transacciones y se podra enviar transaccion',
        )
    };

    return (
        <View style={styles.container}>
            <View>
              <Text style={styles.tipoCuenta}>
                  Cuenta {cuenta.tipoCuenta ? cuenta.tipoCuenta : ''}
              </Text>
              <Text style={styles.balance}>
                  {cuenta.tipoCuenta === 'USD' ? 'USD' : cuenta.tipoCuenta === 'UYU' ? 'UYU' : 'UNKNOWN'} {cuenta.balance}
              </Text>
            </View>
            <Pressable onPress={handleAccountInfo}>
              <GenericIcon name='info-outline'/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tipoCuenta: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        fontWeight: '600',
    },
    balance: {
      fontSize: 28,
      color: '#007AFF',
      fontWeight: 'bold',
    },
});