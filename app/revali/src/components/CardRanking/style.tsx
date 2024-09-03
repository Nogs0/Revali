import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.verdeEscuro,
        marginHorizontal: '5%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70
    },
    bodyContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})