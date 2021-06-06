import {  StyleSheet, Dimensions, I18nManager, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: '#175193'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 15
  },
  burger: {
    width: 35,
    height: 25,
    alignSelf: 'flex-start',
    margin: 15,
    marginTop: 40,
    marginBottom: 30
  },
  headerText: {
    color: '#FFF',
    fontSize: 23,
    lineHeight: 38,
    width: '80%',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 25
  },
  headerStatisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 20
  },
  statisticCard: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    paddingVertical: 22,
    marginHorizontal: 5,
  },
  cardNumber: {
    color: '#E84179',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#1B6AE1',
    fontSize: 17,
    fontWeight: '500',
    marginTop: 7,
    flexWrap: 'wrap',
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
  },
  itemBg: {
    width: '100%',
    height: height * .16,
    justifyContent: 'center',
  },
  item: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  itemIcon: {
    flex:1,
    width: width * .25,
    height: width * .18,
    marginHorizontal: 10
  },
  itemText: {
    flex: 3,
    fontSize: 24,
    color: '#FFF',
    marginStart: 15,
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    textAlign: I18nManager.isRTL ? 'left' : 'right',

  }
});