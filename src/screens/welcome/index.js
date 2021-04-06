import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import VideoPlayer from 'react-native-video-player';
import { BorderlessButton } from 'react-native-gesture-handler';
import { changeFirstTimeStatus } from '../../redux/actions/user';
const {width,height} = Dimensions.get('window');

import style from './styles';

const Welcome = ({navigation}) => {
  const dispatch = useDispatch();
  const [isPaused, setIsPaused] = useState(false);

  /**
   * Skip
   */
  const skip = () => {
    dispatch(changeFirstTimeStatus());
    setIsPaused(true)
    navigation.navigate('Home');
  }

  return <View style={style.container}> 
    <VideoPlayer 
      paused={isPaused}
      videoHeight={height / 2}
      videoWidth={width}
      video={require('../../assets/videos/welcome.mp4')}
    />

    <View style={style.bottomContainer}>
      <Text style={style.title}>
        بيت المال
      </Text>
      <Text style={style.text}>
         دليلك الاول و مستشارك الخاص في عالم الاسواق الماليه
      </Text>
      <BorderlessButton style={style.button} onPress={skip}>
        <Text style={style.buttonText}>
          تخطي
        </Text>
      </BorderlessButton>
    </View>
  </View>;
}
export default Welcome;