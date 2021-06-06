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
    width: width - 40,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    shadowColor: '#CCC',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: height * 0.16,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    overflow: 'hidden',
  },
  footerContainer: {
    width: '100%',
    padding: 15,
    alignItems: 'flex-start'
  },
  title: {
    color: '#13314F',
    fontSize: Platform.OS === 'ios' ? 17 : 19,
    marginBottom: 20,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
  },
  text: {
    color: '#4F4F4F',
    fontSize: 17,
    lineHeight: 30,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 15,
    textAlign: 'left'
  },
  dowanloadContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: 15,
    backgroundColor: '#E6E6E6',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14
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
