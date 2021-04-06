import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Urls
const _DEV = 'http://10.0.2.2:8000/api/v1/';
const _LOCALHOST_DEV = 'http://localhost:8000/api/v1/';
const _PROD = 'https://beitelmal.info/api/v1/';

const axiosApiInstance = axios.create({
  baseURL: _PROD,
});

export default axiosApiInstance;