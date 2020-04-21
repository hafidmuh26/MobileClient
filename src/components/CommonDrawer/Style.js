import { StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
   images: {
       height: 140,
       resizeMode: 'cover',
       justifyContent: 'flex-end'
   },
   Menus: {
       marginTop: screen.width/28,
       borderBottomColor: 'white',
       borderBottomWidth: 1,
   },
   
});

export default styles;