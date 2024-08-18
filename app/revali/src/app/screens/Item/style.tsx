import { Colors } from "@/constants/Colors"
import { StyleSheet, Dimensions } from "react-native"

const win = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        marginTop: 10,
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
        marginBottom: '25%'
    },
    footerContainer: {
        backgroundColor: Colors.lime900,
        flexDirection: 'row',
        height: '10%',
        paddingHorizontal: '5%',
        width: '100%',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: Colors.lime300,
        borderRadius: 25,
        width: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})