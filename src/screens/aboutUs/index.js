import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import VideoPlayer from 'react-native-video-player';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import style from './styles';
import I18n from '../../lang/I18n';
import Spinner from '../../components/spinner';

const {width,height} = Dimensions.get('window');

const AboutUs = () => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const getData = async () => {
    await api
      .get(endpoints.about)
      .then((res) => {
        setIsLoading(false);
        setData(res.data.ABOUT[0].description);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    getData()
    return() => setIsPaused(true)
  }, []);

  return <ScrollView style={style.container}>
    <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
    {
      isLoading ?
      <Spinner />
      :
      <>
        <VideoPlayer 
          video={{uri: 'http://beitelmal.info/public/welcome.mp4'}}
          paused={isPaused}
          videoHeight={height * 0.27}
          videoWidth={width - 30}
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