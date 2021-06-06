import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

import moment from 'moment';
import style from './styles';

const Card = ({data}) => {
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [stockTypeId, setStockTypeId] = useState(null);
  const [recommendationStatus, setRecommendationStatus] = useState(null);
  const [headerColor, setHeaderColor] = useState('#B4DCF8');
  /**
   * When user clicks show data
   * @private
   */
  const onClickShowDetails = () => setIsCardOpened(!isCardOpened);

  /**
   * Set stock type
   */
  const setStockType = () => {
    const {stock_type_id} = data;

    let stockType = stock_type_id == "0"
      ? 'شرعى قائمة الفوزان'
      : (
        stock_type_id == "1"
          ? 'شرعى قائمة الراجحى'
          : (
            stock_type_id == "2"
              ? 'شرعى قائمة البلاد'
              : 'غير شرعى'
          )
      );
    setStockTypeId(stockType);
  };

  /**
   * Set recommendation status
   */
  const setRecommendationStatusValue = () => {
    const {status} = data;
    let stockStatusText = '';

    if (status == "0") {
      stockStatusText = 'جديده';
    } else if (status == "1") {
      stockStatusText = 'رابحه';
      setHeaderColor('#00FF67');
    } else if (status == "2") {
      stockStatusText = 'وقف خسائر';
      setHeaderColor('rgb(255, 127, 14)');
    } else if (status == "3") {
      stockStatusText = 'البيع بقرب سعر الشراء';
      setHeaderColor('#2a9d8f');
    } else {
      stockStatusText = 'معدله';
      setHeaderColor('#fca311');
    }

    setRecommendationStatus(stockStatusText);
  };
  
  useEffect(() => {
    setStockType();
    setRecommendationStatusValue();
  }, []);

  return <View style={style.container}>
    <View style={{backgroundColor: '#13314F'}}>
      <View style={[style.header, {backgroundColor: headerColor}]}>
        <Text style={style.name}>
          {data.recommendation_name}
        </Text>
        <Text style={style.status}>
          { recommendationStatus }
        </Text>
      </View>
      <View style={style.content}>
        <View style={style.columnContainer}>
          <Text style={[style.whiteText, {fontWeight: '500'}]}>
            {data.buyPrice} ر.س
          </Text>
          <Text style={[style.whiteText]}>
            سعر الشراء
          </Text>
        </View>
        <View style={style.columnContainer}>
          <Text style={[style.whiteText, {fontWeight: '500'}]}>
            {data.sellPrice} ر.س
          </Text>
          <Text style={[style.whiteText]}>
            سعر البيع
          </Text>
        </View>
        <View style={style.columnContainer}>
          <Text style={[style.whiteText, {fontWeight: '500'}]}>
            {data.stopLoss} ر.س
          </Text>
          <Text style={[style.whiteText]}>
            سعر وقف الخسارة
          </Text>
        </View>
      </View>
    </View>
    <BorderlessButton style={style.footer} onPress={onClickShowDetails}>
      {
        !isCardOpened ?
        <Text style={{color :'#4F4F4F', alignSelf: 'center', fontSize: 17}}>
          إظهار كل البيانات
        </Text>
        :
        <View style={{ flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', fontSize: 15, alignItems: 'center', marginBottom: 8}}>
            <Text style={{flex:1, textAlign: 'left', color: '#4F4F4F'}}>
              { data.sector}
            </Text>
            <Text style={{flex:1, textAlign: 'left', color: '#4F4F4F', fontSize: 15}}>
              { stockTypeId }
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{flex:1, textAlign: 'left', color: '#4F4F4F', fontSize: 15}}>
              إنشاء: { moment.utc().format(data.created2_at) }
            </Text>
            <Text style={{flex:1, textAlign: 'left', color: '#4F4F4F', fontSize: 15}}>
              تعديل: { moment.utc().format(data.updated2_at) }
            </Text>
          </View>
          <Text style={{flex:1, textAlign: 'left', color: '#4F4F4F', fontSize: 15}}>
             { data.description }
          </Text>
          <FastImage 
            source={require('../../../../assets/icons/upwards-arrow.png')}
            style={{width: 30, height: 25, alignSelf: 'center', marginTop: 5}}
            resizeMode="contain"
          />
        </View>
      }
    </BorderlessButton>
  </View>;
}

export default Card;
