import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        height: '100%', 
        backgroundColor: Colors.backgroundDefault
    },
    footerContainer: {
        height: '10%',
        backgroundColor: Colors.verdeEscuro,
        padding: '5%'
    },
    lineContainer: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        justifyContent: 'space-between'
    }
})