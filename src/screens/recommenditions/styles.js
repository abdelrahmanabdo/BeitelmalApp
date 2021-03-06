import {
  StyleSheet,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E1E1',
  },
  headerContainer: {
    backgroundColor: '#E1E1E1',
    padding: 15,
    alignItems: 'flex-start',
  },
  choicesContainer: {
    width: '100%',
    borderTopColor: '#000',
    borderTopWidth: 0.3,
    paddingTop: 15,
    marginTop: 10
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 25,
  },
  dropdownRow: {
    marginTop: 20,
  },
  resultsNumber: {
    width: width - 40,
    alignSelf: 'center',
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 15.5
  }
});
