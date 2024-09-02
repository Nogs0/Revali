import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        marginHorizontal: 15,
    },
    searchContainer: {
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: Colors.verdeEscuro,
        marginVertical: '5%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    textSearch: {
        width: '90%',
        height: 30,
        padding: 0,
        fontSize: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        margin: 5,
        padding: 5,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: Colors.verdeEscuro,
        backgroundColor: Colors.verdeClaro,
    },
    textButton: {
        fontSize: 14,
        fontFamily: 'Raleway'
    }
})