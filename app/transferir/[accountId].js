import { Transferencia } from "../../components/screens/Transferenica";
import { useLocalSearchParams } from "expo-router";

export default function Transacciones(){
    const { accountId } = useLocalSearchParams();
    return <Transferencia  account = {accountId}/>

}