import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        marginVertical: '2%',
        padding: '2%',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.verdeEscuro
    },
    imageContainer: {
        width: '20%'
    },
    image: {
        width: 80, 
        height: 80
    },
    contentContainer: {
        width: '70%'
    },
    infoContainer: {

    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between' 
    }
})