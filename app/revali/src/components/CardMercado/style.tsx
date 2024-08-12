import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lime900,
        flexDirection: 'row',
        marginHorizontal: 30,
        padding: 10
    },
    imagem: {
        height: 70,
        width: 70
    },
    titleContainer: {

    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%'
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coins: {
        fontSize: 24
    },
    buttonContainer: {
        position: 'absolute',
        right: 0,
        zIndex: 2,
        height: 40,
        width: 40,
        alignItems: 'center'
    },
    cotentContainer: {
        marginLeft: 20
    },
    footerContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})