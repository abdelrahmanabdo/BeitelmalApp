import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#EEECF1',
    paddingVertical: 15
  },
  header: {
    width: width,
    height: height * 0.3,
  },
  card: {
    width: width - 30,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
    shadowColor: '#CCC',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  title: {
    color: '#E84179',
    marginTop: 15,
    marginBottom: 25,
    fontSize: Platform.OS === 'ios' ? 17 : 20,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
  },
  text: {
    color: '#4F4F4F',
    fontSize: 17,
    lineHeight: 30,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 15
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13314F',
    marginVertical: 40,
    letterSpacing: 5
  }
});
