import { StyleSheet, Dimensions } from 'react-native';
import { Input } from 'native-base';
const screen = Dimensions.get('screen');

const Styles = StyleSheet.create({
    Form: {
        justifyContent: 'center',
        borderRadius: 50,
        width: 270,
        marginLeft: screen.width / 115,
        marginTop: screen.width / 20,

    },
    Button: {
        width: '30%',
        marginLeft: screen.width / 2.1,
        marginTop: screen.width / 17,
        marginBottom: screen.width / 18,
        borderRadius: 30,
        backgroundColor: '#00796b'
    },
    Card: {
        backgroundColor: '#eeeeee',
        shadowColor: '#9e9e9e',
        shadowRadius: 10,
        width: 300,
        marginLeft: screen.width / 8.5,
        marginTop: screen.width / 5,
        backgroundColor: '#eeeeee'
    },
    Content: {
        backgroundColor: '#00796b'
    },
    font: {
        fontSize: 35,
        fontWeight:'bold',
        color: '#00796b',
        marginLeft: screen.width / 4,
        marginTop: screen.width/20,
    },
    Input: {
        marginBottom: screen.width / 20,
        marginRight: screen.width / 30
    }

});

export default Styles;