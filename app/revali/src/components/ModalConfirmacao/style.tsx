import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundDefault,
        height: '25%',
        width: '80%',
        borderRadius: 20,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        width: '100%',
        height: '20%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '60%'
    },
    buttonsContainer: {
        alignItems: 'center',
        borderTopWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '20%',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    button: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})