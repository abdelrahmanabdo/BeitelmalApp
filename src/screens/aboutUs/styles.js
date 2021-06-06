import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingBottom: 30
  },
  header: {
    width: width,
    height: height * 0.25,
  },
  content: {
    width: width - 30,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: Platform.OS === 'ios' ? 15 : 5,
    borderBottomRightRadius: Platform.OS === 'ios' ? 15 : 5,
    textAlign: 'center',
    alignSelf: 'center',
    padding: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 1,
    borderWidth: .1
  },
  title: {
    color: '#E84179',
    fontSize: Platform.OS === 'ios' ? 19 : 22,
    marginTop: 15,
    marginBottom: 25,
    fontWeight: Platform.OS === 'ios' ? '600': '700',
    textAlign: 'center'
  },
  text: {
    color: '#4F4F4F',
    fontSize: Platform.OS === 'ios' ? 19 : 22,
    lineHeight: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
