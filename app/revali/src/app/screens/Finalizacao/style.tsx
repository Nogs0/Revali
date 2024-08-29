import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        height: '100%', 
        backgroundColor: Colors.backgroundDefault
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%'
    },
    itensContainer: {
        marginTop: 20,
        width: '80%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmContainer: {
        height: '45%',
        width: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: '10%',
        backgroundColor: Colors.verdeClaro,
        position: 'absolute',
        bottom: 0
    },
    confirmButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.verdeEscuro,
        borderRadius: 20, 
        width: '80%',
        paddingVertical: '5%'
    }
})