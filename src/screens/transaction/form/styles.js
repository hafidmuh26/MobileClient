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
        marginTop: 20,
        width : '50%',
        backgroundColor: '#263238',
        width : 70,
        borderRadius: 50,
        marginLeft: screen.width/1.4,
        backgroundColor: '#263238'
    },
    error: {
        color: '#f44336',
        paddingHorizontal: 14
    },
    Picker: {
        marginTop: screen.width/18,
        marginLeft: screen.width/23,
        marginRight: screen.width/1.9
    }
});

export default styles;