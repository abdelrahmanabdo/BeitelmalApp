import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    height: '80%'
  },
  content: {
    flex: 1,
    width: width - 40,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: .1
  },
  text: {
    color: '#4F4F4F',
    fontSize: 19,
    lineHeight: 27,
    alignSelf: 'center',
    textAlign: 'left',
    marginStart: 15,
    margin: 20
  },
});
