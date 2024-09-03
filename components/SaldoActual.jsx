import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { Link } from "expo-router";

export function SaldoActual({ cuenta }){

    return (
      <Link href={`${cuenta.id}`} asChild>
        <Pressable>
          <View style={styles.container}>
              <View>
                <Text style={styles.tipoCuenta}>
                    Cuenta {cuenta.tipoCuenta ? cuenta.tipoCuenta : ''}
                </Text>
                <Text style={styles.balance}>
                    {cuenta.tipoCuenta === 'USD' ? 'USD' : cuenta.tipoCuenta === 'UYU' ? 'UYU' : 'UNKNOWN'} {cuenta.balance}
                </Text>
              </View>
          </View>
        </Pressable>
      </Link>
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