import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row'
    },
    image1Container: {
        borderRightWidth: 0.5,
        paddingRight: 10
    },
    image1: {
        height: 90,
        width: 150
    },
    image2Container: {
        borderLeftWidth: 0.5,
        paddingLeft: 10
    },
    image2: {
        height: 90,
        width: 150
    }
})