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
    top: 35,
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
    marginTop: height * 0.035,
    marginBottom: 25,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    width: width - 30,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 25,
    paddingHorizontal: 35
  },
  title: {
    color: '#112F4E',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    width: '100%',
    borderColor: '#C4C4C4',
    color: '#112F4E',
    borderWidth: .5,
    borderRadius: 4,
    padding: 15,
    marginBottom: 15,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  submitButton: {
    width: '100%',
    borderColor: '#000000',
    backgroundColor: '#000000',
    borderRadius: 22,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 17,
    letterSpacing: 1
  },
  or: {
    width: '80%',
    alignSelf: 'center',
    height: 25,
    marginVertical: 15
  },
  twitterButton: {
    width: '60%',
    backgroundColor: '#3061E7',
    borderColor: '#3061E7',
    borderRadius: 22,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#3061E7',
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  twitterButtonText: {
    color: '#FFF',
    fontSize: 14,
  }
});
