import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const win = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.lime300,
        height: '20%',
        justifyContent: 'space-between',
        borderBottomRightRadius: 30,
        padding: '5%'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    coinsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 40
    },
    coins: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})