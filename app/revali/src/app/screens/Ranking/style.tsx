import { Colors } from "@/constants/Colors";
import Constants from "expo-constants";
import { StyleSheet } from "react-native"
    
const statusBarHeight = Constants.statusBarHeight;

export default StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.backgroundDefault
    },
    headerContainer: {
        paddingTop: statusBarHeight + 10,
        paddingHorizontal: '5%',
        backgroundColor: Colors.verdeClaro,
        borderBottomRightRadius: 30,
    },
    imageContainer: {
        paddingVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        
    },
    listContainer: {
        height: '70%'
    },
    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: 70,
        position: 'absolute',
        left: '5%',
    },
})