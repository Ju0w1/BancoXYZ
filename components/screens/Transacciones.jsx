import { View , Text} from "react-native";
import { Screen } from "../Screen";
import { Stack } from "expo-router";
import { Logo } from "../Logo";
import { Title } from "../Title";

export function TransaccionesMenu (){
    return(
        <Screen>
            <Stack.Screen
                options={{
                    headerBackButtonMenuEnabled: true,
                    gestureEnabled: true,
                    title: "",
                    headerBackTitle: 'Inicio',
                }}
            />
            <Title title = {'Transacciones'} icon = {'list'} secondIcon={'add'}/>

        </Screen>
    )
}