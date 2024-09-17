import { Colors } from "@/constants/Colors"
import { StyleSheet, Dimensions } from "react-native"

const win = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        height: '100%', 
        backgroundColor: Colors.backgroundDefault,
    },
    content: {
        alignItems: 'center',
        marginTop: 10,
        height: '100%',
    },
    mainImage: {
        marginVertical: '5%',
        borderWidth: 1,
        width: 200,
        height: 200
    },
    imageContainer: {
        borderWidth: 0.5,
        marginHorizontal: '5%',
        height: 71
    },
    image: {
        width: 70,
        height: 70
    },
    descriptionContainer: {
        width: '80%',
        height: '20%'
    },
    footerContainer: {
        backgroundColor: Colors.verdeEscuro,
        flexDirection: 'row',
        height: '10%',
        paddingHorizontal: '5%',
        width: '100%',
        justifyContent: 'space-between',
        bottom: 0
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: Colors.verdeClaro,
        borderRadius: 25,
        width: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})