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
    height: height * 0.45,
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
    width: width - 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10
  }, 
  headerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 17
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
    width: width - 35,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 20,
    paddingHorizontal: 35
  },
  title: {
    color: '#112F4E',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25
  },
  input: {
    width: '100%',
    borderColor: '#C4C4C4',
    color: '#112F4E',
    borderWidth: .5,
    borderRadius: 4,
    padding: 11,
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
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: .1
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
    marginTop: 10,
    marginBottom: 10
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
    elevation: 1,
    borderWidth: .1
  },
  twitterButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  appleButton: {
    
    width: 160,
    height: 45,
  }
});
