import { StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 40
      
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default Styles;