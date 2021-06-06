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
    paddingVertical: 15,
  },
  dropdownRow: {
    marginTop: 20,
  },
  statisticsContainer: {

  }
});
