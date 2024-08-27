import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const win = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.verdeClaro,
        paddingTop: statusBarHeight,
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 30,
        flexDirection: 'row'
    }, 
    label: {
        fontSize: 20,
        fontFamily: 'Renovate'
    },
    coins: {
        fontSize: 20,
        fontFamily: 'Renovate'
    },
    coinsContainer: {
        alignItems: 'center',
        left: 30,
        top: 45,
        position: 'absolute',
        flexDirection: 'row'
    }
})