import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  NativeModules,
} from 'react-native';
const { RNTwitterSignIn } = NativeModules;
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { CheckBox } from 'native-base';

import {loginUser} from '../../redux/actions/user';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import style from './styles';
import I18n from '../../lang/I18n';
import Toast from '../../components/toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({package: 11});
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const TWITTER_COMSUMER_KEY = "MZtNzJHu4PnHVF4exg2LpzPoH";
  const TWITTER_CONSUMER_SECRET = "i9gcw1qpuANiUCh7bqBPJzb63gaYpiovvzYPmLPjJhd39jky0M";

  /**
   * Validate form
   */
  const validate = () => {
    if (!data.name) 
      return  new Toast({text : I18n.t('nameRequired') , type : 'danger'}), false;
    if (!data.email) 
      return  new Toast({text : I18n.t('emailRequired') , type : 'danger'}), false;
    if (!data.phone) 
      return  new Toast({text : I18n.t('mobileRequired') , type : 'danger'}), false;
    if (!isPolicyAccepted) 
      return  new Toast({text : I18n.t('acceptTermsFirst') , type : 'danger'}), false;
    return true;
  }

  /**
   * Submit form.
   * @private
   */
  const submitForm = async (userInfo = null) => {
    if (!userInfo) if (!validate()) return false;
    setIsLoading(true);
    await api
        .post(endpoints.freeRegister, userInfo ?? data)
        .then(async (res) => {
          setIsLoading(false);
          const {STATUS, MESSAGE, USER, ERRORS} = res.data;
          if (STATUS === 1) {
            new Toast({text : MESSAGE , type : 'success'});
            dispatch(loginUser(USER));
            addUserToken(USER.id, await AsyncStorage.getItem('deviceToken'));
            await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(true));
            await AsyncStorage.setItem('user', JSON.stringify(USER));
            setData({});
            setIsPolicyAccepted(false);
            navigation.navigate('Home');
          } else {
            if (ERRORS.hasOwnProperty('email')) {
              new Toast({text : ERRORS.email[0] , type : 'danger'});
            } else {
              new Toast({text :ERRORS.password[0] , type : 'danger'});
            }
          } 
        })
        .catch((err) => {
          setIsLoading(false);
          new Toast({text : err.response.data.MESSAGE , type : 'danger'});
        });
  };

  /**
   * Send user token
   * @param {} err 
   * @param {*} data 
   */
  const addUserToken = async (user_id, device_id) => {
    await api.post(endpoints.notifications + '/set', {user_id, device_id});
  }

  /**
   * Twitter auth
   * @private
   */
  const twitterAuth = async (err, data) => {
    RNTwitterSignIn.init(TWITTER_COMSUMER_KEY, TWITTER_CONSUMER_SECRET);
     await RNTwitterSignIn.logIn()
      .then((data) => {
        const {userName, email, userId} = data;
        const userInfo = {
          name: userName,
          email: email,
          phone: userId
        };
        submitForm(userInfo);
      });
  };
  
  useEffect(() => {
    return () => setData({});
  }, []);

  return <View style={style.container}>
    <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
    <FastImage 
      source={require('../../assets/images/contact_us.png')}
      style={style.header}
    />
    <SafeAreaView style={style.pageContainer}>
      <View style={style.headerButtonsContainer}>
        <TouchableOpacity 
          activeOpacity={.7} 
          style={style.headerButton} onPress={() => navigation.navigate('Home')}>
          <Text style={style.headerButtonText}>
            الدخول كزائر
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={.7} 
          style={style.headerButton} onPress={() => navigation.navigate('Login')}>
          <Text style={style.headerButtonText}>
             تسجيل الدخول
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage 
          source={require('../../assets/icons/logo.png')}
          style={style.logo}
        />
        <View style={style.formContainer}>
          <Text style={style.title}>
            حساب جديد
          </Text>
          <TextInput
            placeholderTextColor={'#CCC'}
            defaultValue={data.name}
            onChangeText={(value) =>  setData({...data, name: value})}
            style={style.input}
            placeholder = "الإسم"
          />
          <TextInput
            placeholderTextColor={'#CCC'}
            defaultValue={data.phone}
            keyboardType={'name-phone-pad'}
            onChangeText={(value) =>  setData({...data, phone: value})}
            style={style.input}
            placeholder="رقم الجوال"
          />
          <TextInput
            placeholderTextColor={'#CCC'}
            defaultValue={data.email}
            keyboardType={'email-address'}
            onChangeText={(value) =>  setData({...data, email: value})}
            style={style.input}
            placeholder="البريد الإلكتروني"
          />
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
            <CheckBox 
              style={{borderRadius: 10}}
              checked={isPolicyAccepted}
              color={'#008F13'}
              onPress={() => setIsPolicyAccepted(!isPolicyAccepted)}
            />
            <Text style={{marginStart: 17, marginEnd: 7, color: '#000', fontSize: 14}}>
              أوافق علي  
            </Text>
            <BorderlessButton onPress={() => navigation.navigate('Policy')}> 
              <Text style={{textDecorationLine:'underline', color: '#3061E7', fontSize: 17}}> 
                سياسة الخصوصية
              </Text>
            </BorderlessButton>
          </View>
          <BorderlessButton
            enabled={!isLoading}
            style={style.submitButton} 
            onPress={() => submitForm()}>
            <Text style={style.submitButtonText}>
             {isLoading ? 'جاري تسجيل حساب ...' : 'تسجيل حساب جديد'}
            </Text>
          </BorderlessButton>
          <Image 
            source={require('../../assets/images/or.png')}
            style={style.or}
            resizeMode="cover"
          />
          <BorderlessButton style={style.twitterButton} onPress={twitterAuth}>
              <Text style={style.twitterButtonText}>
                التسجل بحساب تويتر
              </Text>
          </BorderlessButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  </View>
}
export default Register;
