import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  StatusBar
} from 'react-native';
import api from '../../config/api';
import endpoints from '../../config/endpoints';

import style from './styles';
import I18n from '../../lang/I18n';
import Spinner from '../../components/spinner';

const AboutUs = () => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await api
      .get(endpoints.about)
      .then((res) => {
        setIsLoading(false);
        setData(res.data.ABOUT[0].description);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => getData(), []);

  return <ScrollView style={style.container}>
    <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
    {
      isLoading ?
      <Spinner />
      :
      <>
        <Image
            source={require('../../assets/images/about_us.png')}
            style={style.header}
            resizeMode="stretch"
          />
        <View style={style.content}>
          <Text style={style.title}>
            {I18n.t('aboutTitle')}
          </Text>
          <Text style={style.text}>
            {data.replace(/<\/?[^>]+(>|$)|&nbsp;/g, "")}
          </Text>
        </View>
      </>
    }
  </ScrollView>
}

export default AboutUs;