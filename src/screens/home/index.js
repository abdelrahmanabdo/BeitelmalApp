import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
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

const GUEST_MENU = [
  {
    'title': I18n.t('services'),
    'page': 'Services',
    'icon': require('../../assets/icons/home-services.png')
  }, {
    'title': I18n.t('charts'),
    'page': 'Charts',
    'icon': require('../../assets/icons/home-charts.png')
  }, {
    'title': I18n.t('analysis'),
    'page': 'Analysis',
    'icon': require('../../assets/icons/home-analysis.png')
  }, {
    'title': I18n.t('register'),
    'page': 'Register',
    'icon': require('../../assets/icons/home-signUp.png')
  }
];

AUTH_MENU = [
  {
    'title': I18n.t('charts'),
    'page': 'Charts',
    'icon': require('../../assets/icons/home-charts.png')
  }, {
    'title': I18n.t('recommendations'),
    'page': 'Recommendations',
    'icon': require('../../assets/icons/home-recommendations.png')
  }, {
    'title': I18n.t('reports'),
    'page': 'Reports',
    'icon': require('../../assets/icons/home-reports.png')
  }, {
    'title': I18n.t('analysis'),
    'page': 'Analysis',
    'icon': require('../../assets/icons/home-analysis.png')
  }
];

const Home = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const [menu, setMenu] = useState(GUEST_MENU);
  const [data, setData] = useState(null);


  /**
   * Get Guest user home statistics
   * @private
   */
  const getHomeStatistics = async () => {
    await api.get(endpoints.home)
      .then((res) => setData(res.data.DATA))
      .catch((err) => alert(JSON.stringify(err.response.data)))
  }

  useEffect(() => {
    if (user && user.id) setMenu(AUTH_MENU);
    else setMenu(GUEST_MENU);
      
    if ((!user || user === undefined) && !data) getHomeStatistics();
      
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
        !user ?
        <HeaderStatistics />
        :
        <Text style={style.headerText}>
          {I18n.t('homeHeaderText')}
        </Text>       
      }
    </ImageBackground>
    <ScrollView style={{height: '100%'}}>
      <ImageBackground source={require('../../assets/images/home-item-blue.png')} style={style.itemBg}>
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
      <ImageBackground source={require('../../assets/images/home-item-gradient.png')} style={style.itemBg}>
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
      <ImageBackground source={require('../../assets/images/home-item-blue.png')} style={style.itemBg}>
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
        menu[3] &&
        <ImageBackground source={require('../../assets/images/home-item-blue-dark.png')} style={style.itemBg}>
          <TouchableOpacity activeOpacity={.7} 
            onPress={() => navigation.navigate(menu[3].page)} 
            style={style.item}
          >
            <Image 
              source={menu[3].icon}
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