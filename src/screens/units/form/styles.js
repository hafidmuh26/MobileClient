import { StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get('screen');


const styles = StyleSheet.create({
    content: {
        padding: 5
    },
    input: {
        marginBottom: 5
    },
    button: {
        marginLeft : screen.width /4.5,
        marginTop: 20,
        width : 70,
        borderRadius: 50,
        marginLeft: screen.width/1.4,
        backgroundColor: '#263238'
    },
    error: {
        color: '#f00',
        paddingHorizontal: 14
    }
});

export default styles;