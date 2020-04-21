import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    transaction: {
        backgroundColor: '#fff',
        borderColor: '#37474f',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        justifyContent: 'center'
    },
    hiddenItem: {
        padding: 10,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    Search: {
        borderColor: '#37474f',
        borderTopWidth: 3,
        borderBottomWidth: 3,
    },
    actionButtonIcon:{
        color: 'white'
    }
});

export default styles;