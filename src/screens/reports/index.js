import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Linking,
  StatusBar,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import api from '../../config/api';
import endpoints from '../../config/endpoints';

import style from './styles';
import I18n from '../../lang/I18n';
import Spinner from '../../components/spinner';

const Reports = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(page);
  const [isLoading, setIsLoading] = useState(true);
  const fileEndpointUrl = 'http://beitelmal.info/public/reports-files/';

  const getData = async (page = 1) => {
    await api
      .get(`${endpoints.reports}?page=${page}`)
      .then((res) => {
        setLastPage(res.data.REPORTS.last_page);
        let newData = data;
        newData.push(...res.data.REPORTS.data);
        setData(newData);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  /**
   * Load more data on reach end of the list
   * @private
   */
  const loadMore = () => {
    let nextPage = page;
    nextPage += 1;
    if (nextPage <= lastPage) {
      setPage(nextPage);
      getData(nextPage);
    }
  };

  /**
   * Download file
   * @private
   */
  const downloadFile = (fileUrl) => {
    const url = `${fileEndpointUrl}${fileUrl}`;
    Linking.openURL(url);
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
              onEndReached={loadMore}
              refreshing={true}
              renderItem={({item}) => <View key={item.id} style={style.card}>
                <FastImage 
                  source={item.file 
                      ? {uri: fileEndpointUrl + item.file} 
                      : require('../../assets/images/default-image.png')}
                  style={style.image}
                  resizeMode="stretch"
                />
                <View style={style.footerContainer}>
                  <Text style={style.title}>
                    {item.title}
                  </Text>
                  {
                    (item.description && item.description !== ' ') &&
                    <Text style={style.text}>
                      {item.description}
                    </Text>
                  }
                  <BorderlessButton style={style.dowanloadContainer} onPress={() => downloadFile(item.file)}>
                    <Text>
                      تنزيل الملف
                    </Text>
                    <FastImage 
                      style={{width: 15, height: 15, marginStart: 5}}
                      source={require('../../assets/icons/down-arrow.png')}
                    />
                  </BorderlessButton>
                </View>
              </View>          
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

export default Reports;
