import {
    View,
    StyleSheet,
    Text,
  } from "react-native";
import { GenericIcon } from "./Icons";
   
  export function TransactionCard ({ transaccion }){
      return (
        <View style={styles.container}>
            <View style={styles.upperContainer} >
                {
                    transaccion.enviado ? (
                        <GenericIcon size={16} color='red' name='arrow-upward'/>
                    ) : (
                        <GenericIcon size={16} color='green' name='arrow-downward'/>
                    ) 
                }
                <View style={styles.textWrap}>
                  <Text style={styles.concepto} numberOfLines={2}>
                      {transaccion.concepto.toUpperCase()}
                  </Text>
                </View>
                
            </View>
            <View style={styles.lowerContainer}>
                <Text style={styles.fecha}>
                    {transaccion.fecha.toLocaleDateString()}
                </Text>
                <Text style={styles.importe}>
                    {transaccion.moneda + ' ' + transaccion.importe}
                </Text>
            </View>
        </View>
      )
  }
  
  const styles = StyleSheet.create({
      container: {
          backgroundColor: '#ffffff',
          padding: 10,
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 80,
          borderBottomWidth: 1,
      },
      textWrap:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 80,
        paddingRight: 10
      },
      upperContainer:{
        width: '100%',
        flexDirection: 'row',
        height: '50%',
        
      },
      lowerContainer:{
        width: '100%',
        flexDirection: 'row',
        height: '50%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      rightContainer: {
        width: '50%', 
      },
      leftContainer: {
        width: '50%', 
      },
      concepto:{
        fontSize: 14,
      },
      importe: {
        fontSize: 16,
        color: '#007AFF',
      },
      fecha: {
        fontSize: 14,
      },
  });