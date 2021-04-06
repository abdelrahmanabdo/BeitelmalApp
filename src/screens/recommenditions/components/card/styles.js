import {
  StyleSheet,
  Dimensions,
  I18nManager
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    width: width - 35,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#E2DADA',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#00FF67',
    overflow: 'hidden',
  },
  name: {
    flex: 1,
    color: '#13314F',
    fontSize: 20,
    fontWeight: '700',
    textAlign: I18nManager.isRTL ? 'left' : 'right'

  },
  status: {
    flex: 1,
    color: '#13314F',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'right' 
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center'
  },
  whiteText: {
    color: '#FFF',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#E2DADA',
    padding: 20,
    overflow: 'hidden'
  }

});
