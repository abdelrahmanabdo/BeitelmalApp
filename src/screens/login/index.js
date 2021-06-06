import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  NativeModules,
  StatusBar,
  Platform,
} from 'react-native';
const { RNTwitterSignIn } = NativeModules;
import AsyncStorage from '@react-native-community/async-storage';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../config/api';
import endpoints from '../../config/endpoints';
import {loginUser} from '../../redux/actions/user';
import {
  AppleButton,
  appleAuth
} from '@invertase/react-native-apple-authentication';
import style from './styles';
import I18n from '../../lang/I18n';
import Toast from '../../components/toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const TWITTER_COMSUMER_KEY = "MZtNzJHu4PnHVF4exg2LpzPoH";
  const TWITTER_CONSUMER_SECRET = "i9gcw1qpuANiUCh7bqBPJzb63gaYpiovvzYPmLPjJhd39jky0M";
  /**
   * Validate form
   */
  const validate = () => {
    if (!data.email) return  new Toast({text : I18n.t('emailRequired') , type : 'danger'}), false;
    if (!data.email.includes('@') || !data.email.includes('.'))
      return  new Toast({text : I18n.t('validEmail') , type : 'danger'}), false;
    if (!data.password) return  new Toast({text : I18n.t('passwordRequired') , type : 'danger'}), false;
    return true;
  };

  /**
   * Submit login form.
   * 
   * @param {Boolean} isSocialLogin
   * @param {Object} socialUser
   * @private
   */
  const submitForm = async (isSocialLogin = false, socialUser = null) => {
    if (!isSocialLogin) if (!validate()) return false;
    setIsLoading(true);
    await api
        .post(endpoints.login + '?isSocialLogin=' + isSocialLogin, socialUser ?? data)
        .then(async (res) => {
          setIsLoading(false);
          const {STATUS, USER, MESSAGE, ERRORS} = res.data;
          if (STATUS === 1) {
            new Toast({text: MESSAGE, type : 'success'});
            dispatch(loginUser(USER));
            addUserToken(USER.id, await AsyncStorage.getItem('deviceToken'));
            await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(true));
            await AsyncStorage.setItem('user', JSON.stringify(USER));
            navigation.navigate('Home');
          } else if (STATUS === 3) {
            new Toast({text : ERRORS , type : 'danger'});
          }  else {
            if (ERRORS.hasOwnProperty('email')) {
              new Toast({text : ERRORS.email[0] , type : 'danger'});
            } else {
              new Toast({text :ERRORS.password[0] , type : 'danger'});
            }
          } 
        })
        .catch((err) => {
          setIsLoading(false);
          new Toast({text : err.response.data.ERRORS , type : 'danger'})
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
  const twitterAuth = async () => {
    RNTwitterSignIn.init(TWITTER_COMSUMER_KEY, TWITTER_CONSUMER_SECRET);
     await RNTwitterSignIn.logIn()
      .then(async (data) => {
        const {email} = data;
        submitForm(true, { email });
      });
  };

  /**
   * Apple auth
   * @private
   */
  const onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
       const {user, fullName, email} = appleAuthRequestResponse;
        setData({
          name: fullName ? fullName : `${user.name.firstName} ${user.name.lastName}`,
          email: email ? email : user.email
        });
    }
  }

  useEffect(() => {
  }, []);

  return <View style={style.container}>
    <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
    <FastImage 
      source={require('../../assets/images/contact_us.png')}
      style={style.header}
    />
    <SafeAreaView style={style.pageContainer}>
      <SafeAreaView style={style.headerButtonsContainer}>
        <Pressable style={style.headerButton} onPress={() => navigation.navigate('Home')}>
          <Text style={style.headerButtonText}>
            الدخول كزائر
          </Text>
        </Pressable>
        <Pressable style={style.headerButton} onPress={() => navigation.navigate('Register')}>
          <Text style={style.headerButtonText}>
            حساب جديد
          </Text>
        </Pressable>
      </SafeAreaView>
      <FastImage 
        source={require('../../assets/icons/logo.png')}
        style={style.logo}
      />
      <View style={style.formContainer}>
        <Text style={style.title}>
          تسجيل الدخول
        </Text>
        <TextInput
          keyboardType={'email-address'}
          placeholderTextColor={'#CCC'}
          onChangeText={(value) =>  setData({...data, email: value})}
          style={style.input}
          placeholder="البريد الإلكتروني"
        />
        <TextInput
          secureTextEntry={true}
          placeholderTextColor={'#CCC'}
          onChangeText={(value) =>  setData({...data, password: value})}
          style={style.input}
          placeholder="الرقم السري"
        />
        <BorderlessButton 
          enabled={!isLoading}
          style={style.submitButton} 
          onPress={() => submitForm()}>
          <Text style={style.submitButtonText}>
            {isLoading ? 'تسجيل الدخول ...' : 'تسجيل الدخول'}
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
          {
            Platform.OS === 'ios' &&
            <AppleButton
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                width: 160,
                height: 45,
                color: '#FFF',
                alignSelf: 'center',
                marginTop: 20
              }}
              onPress={onAppleButtonPress}
            />
          }
      </View>
    </SafeAreaView>
  </View>
}
export default Login;
