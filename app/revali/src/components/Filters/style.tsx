import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        marginHorizontal: 30,
    },
    searchContainer: {
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: Colors.lime900,
        marginVertical: '5%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    button: {
        padding: 5,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: Colors.lime900,
        backgroundColor: Colors.lime300,
    },
    textButton: {

    }
})