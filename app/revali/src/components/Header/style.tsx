import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const win = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.lime500,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 30
    }, 
    label: {
        fontWeight: 'bold',
        fontSize: 24
    }
})