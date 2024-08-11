import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const win = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.lime500,
        height: 150,
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
        justifyContent: 'flex-start'
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