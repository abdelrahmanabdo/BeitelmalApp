import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
const {width, height} = Dimensions.get('window');

const Spinner = () => (<View style={style.container}>
    <Animatable.View
      animation={'rotate'}
      iterationCount={8}
      duration={1500}
    >
      <FastImage
        source={require('../../assets/icons/logo.png')}
        style={style.logo}
        resizeMode="contain"
      />
    </Animatable.View>
  </View>);

export default Spinner;

const style = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: -50,
  },
});
