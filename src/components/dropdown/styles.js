import {
  StyleSheet,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width - 40,
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
  },
  modalContainer: {
    width: width,
    maxHeight: height / 2,
    justifyContent: 'space-between',
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    color: '#13314F',
    fontWeight: 'bold'
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F8F8F8',
    marginVertical: 8,
    borderRadius: 15,
  },
  itemText: {
    alignSelf: 'flex-start',
    color: '#5D0D57',
    fontSize: 16,
  },
  placeholderText: {
    color: '#4F4F4F',
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '65%',
    maxWidth: '70%',
    padding: 7,
    borderWidth: 1.25,
    borderColor: '#CCC',
    maxHeight: height / 2,
    borderRadius: 6
  }
});