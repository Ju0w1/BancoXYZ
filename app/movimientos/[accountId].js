import { TransaccionesMenu } from "../../components/screens/Transacciones";
import { useLocalSearchParams } from "expo-router";

export default function Transacciones(){
    const { accountId } = useLocalSearchParams();
    return <TransaccionesMenu  account = {accountId}/>
}