import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import api from '../../config/api';
import endpoints from '../../config/endpoints';

import style from './styles';
import I18n from '../../lang/I18n';
import Toast from '../../components/toast';
import { useNavigation } from '@react-navigation/core';

const ContactUs = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  /**
   * Validate form
   */
  const validate = () => {
    if (!data.name) return  new Toast({text : I18n.t('nameRequired') , type : 'danger'}), false;
    if (!data.phone) return  new Toast({text : I18n.t('mobileRequired') , type : 'danger'}), false;
    if (!data.message) return  new Toast({text : I18n.t('messageRequired') , type : 'danger'}), false;
    return true;
  }

  /**
   * Submit form.
   * @private
   */
  const submitForm = async () => {
    if (!validate()) return false;
    setIsLoading(true);

    await api
        .post(endpoints.contactUs, data)
        .then((res) => {
          if (res.data.STATUS === 1) {
            setIsLoading(false);
            setData({});
            new Toast({text : I18n.t('messageSentSuccessfully') , type : 'success'});
          }
        })
        .catch((err) => {
          setIsLoading(false);
          new Toast({
            text: I18n.t('errorHappened'),
            type: 'danger'
          });
        });
  }

  return <View style={style.container}>
    <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
    <FastImage 
      source={require('../../assets/images/contact_us.png')}
      style={style.header}
    />
    <SafeAreaView style={style.pageContainer}>
      <View style={style.headerButtonsContainer}>
        <Pressable style={style.headerButton} onPress={() => navigation.goBack()}>
          <Text style={style.headerButtonText}>
            رجوع
          </Text>
        </Pressable>
      </View>
      <FastImage 
        source={require('../../assets/icons/logo.png')}
        style={style.logo}
      />
      <View style={style.formContainer}>
        <Text style={style.title}>
          إرسل لنا
        </Text>
        <TextInput
          defaultValue={data.name}
          placeholderTextColor={'#ccc'}
          onChangeText={(value) =>  setData({...data, name: value})}
          style={style.input}
          placeholder="الإسم"
        />
        <TextInput
          placeholderTextColor={'#ccc'}
          defaultValue={data.email}
          keyboardType={'email-address'}
          onChangeText={(value) =>  setData({...data, email: value})}
          style={style.input}
          placeholder="البريد الإلكتروني"
        />
        <TextInput
          placeholderTextColor={'#ccc'}
          defaultValue={data.phone}
          onChangeText={(value) =>  setData({...data, phone: value})}
          style={style.input}
          placeholder="رقم الجوال"
        />
        <TextInput
          placeholderTextColor={'#ccc'}
          defaultValue={data.message}
          multiline={true}
          onChangeText={(value) =>  setData({...data, message: value})}
          style={style.input}
          placeholder="الرسالة"
        />
        <BorderlessButton 
          style={style.submitButton} 
          onPress={submitForm}
          enabled={!isLoading}
        >
          <Text style={style.submitButtonText}>
            { isLoading ? 'إرسال ....' : 'إرسال' }
          </Text>
        </BorderlessButton>
      </View>
    </SafeAreaView>
  </View>
}
export default ContactUs;