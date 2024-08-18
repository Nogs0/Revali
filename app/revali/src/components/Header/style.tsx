import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const win = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.lime300,
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 30,
        flexDirection: 'row'
    }, 
    label: {
        fontWeight: 'bold',
        fontSize: 24
    },
    coins: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    coinsContainer: {
        alignItems: 'center',
        left: 30,
        position: 'absolute',
        flexDirection: 'row'
    }
})