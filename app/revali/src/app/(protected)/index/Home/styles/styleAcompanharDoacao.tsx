import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        height: '100%', 
        backgroundColor: Colors.backgroundDefault
    },
    infoContainer: {
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        backgroundColor: Colors.verdeClaro,
        borderTopRightRadius: 30
    },
    textInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})