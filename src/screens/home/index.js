import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import style from './styles';
import I18n from '../../lang/I18n';

import api from '../../config/api';
import endpoints from '../../config/endpoints';
import {
  AUTH_MENU,
  SUBSCRIBER_MENU,
  GUEST_UNACTIVE_MENU,
  GUEST_UNACTIVE_IOS_MENU,
  GUEST_MENU,
  GUEST_IOS_MENU
} from './menus';

const Home = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const [menu, setMenu] = useState(Platform.OS === 'ios' ? GUEST_IOS_MENU : GUEST_MENU);
  const [data, setData] = useState(null);


  /**
   * Get Guest user home statistics
   * @private
   */
  const getHomeStatistics = async () => {
    await api.get(endpoints.home)
      .then((res) => setData(res.data.DATA))
  }

  useEffect(() => {
    if ((!user || user === undefined) && !data) getHomeStatistics();

    // If user has account but not subscribed
    if (user && user.activated == '1' && user.subscriber == '0') return setMenu(AUTH_MENU);
    // If user subscribed
    else if (user && user.activated == '1' && user.subscriber == '1') return setMenu(SUBSCRIBER_MENU);
    // If user still not activated
    else if (user && user.activated == '0' && user.subscriber == '0') {
      return setMenu(Platform.OS === 'ios' ? GUEST_UNACTIVE_IOS_MENU : GUEST_UNACTIVE_MENU);
    // If guest user
    } else {
      setMenu(Platform.OS === 'ios' ? GUEST_IOS_MENU : GUEST_MENU)
    }
    
  }, [user]);

  /**
   * Header statistics
   * 
   * @private
   */
  const HeaderStatistics = () => {
    return <View style={style.headerStatisticsContainer}>
      <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
      {
        data &&
        <>
          <Animatable.View animation={'swing'} style={style.statisticCard}>
            <Text style={style.cardNumber}>
              {data.clients}
            </Text>
            <Text style={style.cardText}>
              عميل
            </Text>
          </Animatable.View>
          <Animatable.View animation={'swing'} style={style.statisticCard}>
            <Text style={style.cardNumber}>
              {data.recommendations}
            </Text>
            <Text style={[style.cardText, {paddingHorizontal: 0, fontSize: 16}]}>
              توصية رابحة
            </Text>
          </Animatable.View>
          <Animatable.View animation={'swing'} style={style.statisticCard}>
            <Text style={style.cardNumber}>
              % {data.performanceRate.toFixed(0)}
            </Text>
            <Text style={style.cardText}>
              معدل الآداء
            </Text>
          </Animatable.View>
        </>
      }
    </View>
  }

  return <SafeAreaView style={style.container}>
    <StatusBar backgroundColor="#000" barStyle="light-content"  translucent={true} />
    <ImageBackground source={require('../../assets/images/home-bg.png')}  style={style.header}>
      <BorderlessButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image 
          source={require('../../assets/icons/burger.png')}
          style={style.burger}
        />
      </BorderlessButton>
      {
        user && user.subscriber == '1' ?
          <Text style={style.headerText}>
            {I18n.t('homeHeaderText')}
          </Text>   
        :
          <HeaderStatistics />
      }
    </ImageBackground>
    <ScrollView style={{height: '100%'}}>
      <ImageBackground source={require('../../assets/images/home-item-bg.png')} style={style.itemBg}>
        <TouchableOpacity activeOpacity={.7} 
          onPress={() => navigation.navigate(menu[0].page)} 
          style={style.item}
        >
          <Image 
            source={menu[0].icon}
            resizeMode="contain"
            style={style.itemIcon}
          />
          <Text style={style.itemText}>
            {menu[0].title}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      <ImageBackground source={require('../../assets/images/home-item-bg.png')} style={style.itemBg}>
        <TouchableOpacity activeOpacity={.7} 
          onPress={() => navigation.navigate(menu[1].page)} 
          style={style.item}
        >
          <Image 
            source={menu[1].icon}
            resizeMode="contain"
            style={style.itemIcon}
          />
          <Text style={style.itemText}>
            {menu[1].title}
          </Text> 
        </TouchableOpacity>
      </ImageBackground>
      <ImageBackground source={require('../../assets/images/home-item-bg.png')} style={style.itemBg}>
        <TouchableOpacity activeOpacity={.7} 
          onPress={() => navigation.navigate(menu[2].page)} 
          style={style.item}
        >
          <Image 
            source={menu[2].icon}
            resizeMode="contain"
            style={style.itemIcon}
          /> 
          <Text style={style.itemText}>
            {menu[2].title}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      {
        menu.length > 3 &&
        <ImageBackground source={require('../../assets/images/home-item-bg.png')} style={style.itemBg}>
          <TouchableOpacity activeOpacity={.7} 
            onPress={() => menu[3].page ? navigation.navigate(menu[3].page) : ''} 
            style={style.item}
          >
            <Image 
              source={menu[3]?.icon}
              resizeMode="contain"
              style={style.itemIcon}
            />
            <Text style={style.itemText}>
              {menu[3]?.title}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      }
    </ScrollView>
  </SafeAreaView>;
}

export default Home;