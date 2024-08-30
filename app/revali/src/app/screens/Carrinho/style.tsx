import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        height: '100%', 
        backgroundColor: Colors.backgroundDefault
    },
    finalizar: {
        backgroundColor: Colors.verdeClaro,
        flexDirection: 'row',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})