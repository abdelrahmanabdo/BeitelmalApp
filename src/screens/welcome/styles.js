
import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({

  container: {
    height,
    width,
    display: 'flex',
    flexDirection: 'column',

  },
  videoContainer: {
    flex: 1,
    width,
    height: 200,
    
  },
  bottomContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 23,
    marginVertical: 40,
    fontWeight: Platform.OS === 'ios' ? '600' : '700'
  },
  text: {
    fontSize: 25,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    lineHeight: 35
  },
  button: {
    backgroundColor: '#E84179',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 40,
    marginVertical: 40
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
  }
});