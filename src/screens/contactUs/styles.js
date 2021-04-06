import {
  StyleSheet,
  Dimensions,
  I18nManager
} from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    height,
    width,
  },
  header: {
    height: height * .4,
    width: '100%',
  },
  pageContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  headerButtonsContainer: {
    backgroundColor: 'transparent',
    zIndex: 1000,
    width: width - 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10
  }, 
  headerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 17,
    zIndex: 1000,
  },
  headerButtonText: {
    color: '#112F4E',
    fontSize: 13
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: height * 0.07,
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    width: width - 30,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 20,
    paddingHorizontal: 35
  },
  title: {
    color: '#112F4E',
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 25
  },
  input: {
    width: '100%',
    borderColor: '#C4C4C4',
    color: '#112F4E',
    borderWidth: .5,
    borderRadius: 4,
    padding: 15,
    marginBottom: 20,
    letterSpacing: 3,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 17,
    letterSpacing: 5
  }
});
