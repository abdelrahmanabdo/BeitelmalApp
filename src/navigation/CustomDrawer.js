import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Dimensions,
  Platform,
  Linking,
  I18nManager
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-community/async-storage';
import I18n from "../lang/I18n";

import {logoutUser} from '../redux/actions/user';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  /**
   * Logout user
   * @returns 
   */
  const logout = async () => {
    dispatch(logoutUser());
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('authUserChatId');
    await AsyncStorage.removeItem('userNotificationToken');
    props.navigation.navigate('Home')
  }

  /**
   * Close side menu.
   * @private
   */
  const closeMenu = () => props.navigation.toggleDrawer();

  /**
   * Naivgate to payment
   */
  const navigateToPayment = () => Linking.openURL('https://beitelmal.info/packages/payment');

  return <DrawerContentScrollView style={style.container} {...props} scrollEnabled={false}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content"  translucent={true} />
      <ImageBackground
        source={require('../assets/images/sideMenu.png')}
        style={{width: '100%', height}}
      >
        <View style={style.header}>
          <BorderlessButton style={{flex: 1}} onPress={closeMenu}>
            <FastImage 
              source={require('../assets/icons/close.png')}
              style={{width: 25, height: 25, marginStart: 7}}
              resizeMode='contain'
            />
          </BorderlessButton>
          <FastImage
            style={style.logo}
            source={require('../assets/icons/logo.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={{flex: 1}}></View>
        </View>
        <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center', marginBottom: 20}}>
        {
          (user && user !== undefined ) ?
            <>
              <Text style={style.userName}>
                {user.name}
              </Text>
              <BorderlessButton style={style.logoutButton} onPress = {logout}>
                <FastImage source={require('../assets/icons/login.png')} style={{width: 17, height: 17, marginEnd: 7}}/>
                <Text style={{fontSize: 16, fontWeight: '600', color:'#000'}}>
                  {I18n.t('logout')}
                </Text>
              </BorderlessButton>
            </>
          :
           <BorderlessButton style={style.logoutButton} onPress={() => props.navigation.navigate('Login')}>
            <FastImage  source={require('../assets/icons/login.png')} style={{width: 17, height: 17, marginEnd: 7}}/>
            <Text style={{fontSize: 16, fontWeight: '600', color:'#000'}}>
              {I18n.t('login')}
            </Text>
          </BorderlessButton>
         }
        </View>
      <ScrollView style={{flex: 1, marginBottom: 20}}>
        <DrawerItem
            label={I18n.t('home')}
            style={style.drawerItem}    
            overlayColor={0}  
            activeBackgroundColor="#CCC"
            activeTintColor="red"
            pressColor={'#E6E6E6'}     
            labelStyle={style.drawerItemLabel}
            icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/home.png')} style={{width:25 , height:25}} />}
            onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label={I18n.t('aboutUs')}
          style={style.drawerItem}
          pressColor={'#E6E6E6'}     
          labelStyle={style.drawerItemLabel}
          icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/charts.png')} style={{width:25 , height:25}} />}
          onPress={() => props.navigation.navigate('AboutUs', {onGoBack : ()=>{}})}
        />
        <DrawerItem
          label={I18n.t('services')}
          style={style.drawerItem}
          pressColor={'#E6E6E6'}     
          labelStyle={style.drawerItemLabel}
          icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/reports.png')} style={{width:25 , height:25}} />}
          onPress={() => props.navigation.navigate('Services')}
        />
        {(user && user.activated == '1') &&
        <>
          <DrawerItem
              label={I18n.t('analysis')}
              style={style.drawerItem}               
              labelStyle={style.drawerItemLabel}
              pressColor={'#E6E6E6'}     
              icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/analysis.png')} style={{width:25 , height:25}} />}
              onPress={() => props.navigation.navigate('Analysis')}
            />
            <DrawerItem
              label={I18n.t('reports')}
              style={style.drawerItem}    
              pressColor={'#E6E6E6'}     
              labelStyle={style.drawerItemLabel}
              icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/reports.png')} style={{width:25 , height:25}} />}
              onPress={() => props.navigation.navigate('Reports')}
            />
          {user.subscriber == '1' &&
          <>
            <DrawerItem
                label={I18n.t('charts')}
                style={style.drawerItem}  
                pressColor={'#E6E6E6'}     
                labelStyle={style.drawerItemLabel}
                icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/reports.png')} style={{width:25 , height:25}} />}
                onPress={() => props.navigation.navigate('Charts')}
              />
            <DrawerItem
              label={I18n.t('recommendations')}
              style={style.drawerItem}
              pressColor={'#E6E6E6'}     
              labelStyle={style.drawerItemLabel}
              icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/recommendations.png')} style={{width:25 , height:25}} />}
              onPress={() => props.navigation.navigate('Recommendations')}
            />
          </>
          }
          </>
        }
        {
          Platform.OS === 'android' &&
          <>
            <DrawerItem
              label={I18n.t('packages')}
              style={style.drawerItem}       
              pressColor={'#E6E6E6'}     
              labelStyle={style.drawerItemLabel}
              icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/recommendations.png')} style={{width:25 , height:25}} />}
              onPress={() => props.navigation.navigate('Packages')}
            />
            <DrawerItem
              label={'السداد الالكتروني'}
              style={style.drawerItem}      
              pressColor={'#E6E6E6'}     
              labelStyle={style.drawerItemLabel}
              icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/payment.png')} style={{width:25 , height:25}} />}
              onPress={navigateToPayment}
            />
          </>
        }
        <DrawerItem
          label={I18n.t('contactUs')}
          style={style.drawerItem}      
          pressColor={'#E6E6E6'}     
          labelStyle={style.drawerItemLabel}
          icon = {({ focused, color, size }) => <FastImage resizeMode="contain" source={require('../assets/icons/contact.png')} style={{width:25 , height:25}} />}
          onPress={() => props.navigation.navigate('ContactUs')}
        />
      </ScrollView>
    </ImageBackground>
  </DrawerContentScrollView>
}

export default CustomDrawer;

const style = StyleSheet.create({
  container:{},
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 25,
  },
  logo: {
    flex: 1,
    height: 85,
    width: 110,
    alignSelf: 'flex-start',
  },
  userName: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    textAlign: I18nManager.isRTL ? 'center' : 'right'
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  }, 
  drawerItem: {
    borderBottomWidth: 0.4,
    width: '70%',
    alignSelf: 'flex-start',
    borderBottomColor: '#707070',
    padding: 5,
    marginStart: 30,
    borderRadius: 10
  },
  drawerItemLabel: {
    color: '#0A0C10',
    fontSize:  Platform.OS === 'ios' ? 17 : 19,
    textAlign: 'left', 
    fontWeight: Platform.OS === 'ios' ? '400' : '700'
  },
});
