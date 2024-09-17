import { StyleSheet } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"

export default StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.verdeEscuro,
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
        fontFamily: 'Renovate',
        width: '100%'
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coins: {
        fontSize: 18,
        fontFamily: 'Renovate'
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
        marginLeft: 20,
        width: '70%',
        overflow: 'hidden'
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