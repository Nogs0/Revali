import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const win = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.verdeClaro,
        paddingTop: statusBarHeight,
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        paddingHorizontal: '3%'
    },
    label: {
        fontSize: 20,
        fontFamily: 'Renovate'
    },
    coins: {
        fontSize: 20,
        fontFamily: 'Renovate'
    },
    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: 70,
        position: 'absolute',
        left: '10%',
        top: '70%'
    },
    infoLeftContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: 70,
        position: 'absolute',
        left: '10%',
        top: '82%'
    },
})