import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import * as Animatable from 'react-native-animatable';

import style from './styles';
import I18n from '../../lang/I18n';
import Spinner from '../../components/spinner';

const Services = () => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await api
      .get(endpoints.services)
      .then((res) => {
        setIsLoading(false);
        setData(res.data.SERVICES);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => getData(), []);

  return <View>
    <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
    {
      isLoading ?
      <Spinner />
      :
      <SafeAreaView>
        {
          data.length > 0 ?
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => <Animatable.View animation={'slideInLeft'} key={item.id} style={style.card}>
                  <Text style={style.title}>
                    {item.service}
                  </Text>
                  <Text style={style.text}>
                    {item.description}
                  </Text>
                </Animatable.View>          
              }
            />
          :
            <Text style={style.noDataText}>
              {I18n.t('noData')}
            </Text>
        }
      </SafeAreaView>
    }
  </View>;
}

export default Services;
