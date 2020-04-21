import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    item: {
        backgroundColor: '#fff',
        borderColor: '#37474f',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5
    },
    hiddenItem: {
        padding: 10,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    Fab: {
        backgroundColor: '#263238'
    },
    Search: {
        borderColor: '#37474f',
        borderTopWidth: 3,
        borderBottomWidth: 3,
        
    },

});

export default styles;