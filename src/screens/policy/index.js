import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StatusBar
} from 'react-native';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import style from './styles';
import I18n from '../../lang/I18n';
import Spinner from '../../components/spinner';

const Policy = () => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await api
      .get(endpoints.policy)
      .then((res) => {
        setIsLoading(false);
        setData(res.data.POLICY[0].description);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => getData(), []);

  return <SafeAreaView style={style.container}>
    <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
    {
      isLoading ?
      <Spinner />
      :
      <ScrollView style={style.content}>
        <Text style={style.text}>
          {data.replace(/<\/?[^>]+(>|$)|&nbsp;|&ndash;/g, "")}
        </Text>
      </ScrollView>
    }
  </SafeAreaView>
}

export default Policy;