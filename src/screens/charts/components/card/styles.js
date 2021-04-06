import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    width: width - 35,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  name: {
    color: '#E84179',
    fontSize: 20,
    fontWeight: '700',
    textAlign:'left',
  },
  status: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '700',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#13314F',
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: '#FFF',
    fontSize: 15,
  },
  footer: {
    width: width - 30,
    backgroundColor: '#FFF',
    padding: 20,
    shadowColor: '#A78DBE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 1,
    borderWidth: .1,
    borderBottomLeftRadius: Platform.OS === 'ios' ? 15 : 5,
    borderBottomRightRadius: Platform.OS === 'ios' ? 15 : 5,
  }

});
