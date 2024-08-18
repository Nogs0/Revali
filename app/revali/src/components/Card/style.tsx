import { Colors } from '@/constants/Colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lime900,
        marginHorizontal: '5%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContainer: {
        width: '80%',
        marginHorizontal: 20
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})