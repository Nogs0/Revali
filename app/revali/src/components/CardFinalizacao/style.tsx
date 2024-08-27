import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: Colors.verdeEscuro
    },
    image: {
        width: 100, 
        height: 100
    },
    quantidadeContainer: {
        backgroundColor: Colors.verdeClaro,
        borderRadius: 50,
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})