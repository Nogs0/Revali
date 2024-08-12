import { StyleSheet } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"

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
        fontSize: 18
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
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    addItensContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    }
})