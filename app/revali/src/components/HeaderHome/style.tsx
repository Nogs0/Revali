import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const win = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        paddingTop: statusBarHeight + 10,
        backgroundColor: Colors.verdeClaro,
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
    imageContainer: {
    },
    image: {
        width: 70,
        height: 25,
    },
    coins: {
        fontSize: 30,
        fontFamily: 'Renovate'
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Raleway'
    },
    button: {
        width: 70
    }
})