import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundDefault,
        height: '100%',
    },
    contentContainer: {
        width: '100%',
        height: '70%',
        backgroundColor: Colors.verdeEscuro,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '10%',
        borderTopRightRadius: 30
    },
    text: {
        width: '70%',
        textAlign: 'justify',
        color: Colors.backgroundDefault,
        marginVertical: '5%',
        fontFamily: 'Raleway',
        fontSize: 24
    },
    button: {
        backgroundColor: Colors.amarelo,
        borderRadius: 15,
        marginHorizontal: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%'
    }
})