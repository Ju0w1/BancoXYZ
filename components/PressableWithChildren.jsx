import { Pressable} from "react-native";

export function PressableWithChildren({ children, ...props }){
    return(
        <Pressable {...props}>
            {children}
        </Pressable>
    )
}