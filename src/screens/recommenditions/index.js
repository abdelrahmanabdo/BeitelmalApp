import React, {
  useState,
  useEffect
} from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar
} from 'react-native';
import { CheckBox } from 'native-base';

import style from './styles';
import I18n from '../../lang/I18n';
import Spinner from '../../components/spinner';
import Dropdown from '../../components/dropdown';
import Card from './components/card';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

const stockTypesData = [
  {
    id: null,
    name: 'كل درجات الشرعية',
  },
  {
    id: 0,
    name: 'شرعى قائمة الفوزان',
  },
  {
    id: 1,
    name: 'شرعى قائمة الراجحى',
  },
  {
    id: 2,
    name: 'شرعى قائمة البلاد',
  },
  {
    id: 3,
    name: 'غير شرعى',
  },
];

const Recommendations = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([0, 1, 2]);
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState(0);
  const [selectedStockTypeId, setSelectedStockTypeId] = useState(0);

  /**
   * Get sectors.
   * @private
   */
  const getSectors = async () => {
    await api.get(endpoints.sectors)
      .then((res) => {
        const sectorsData = [
          {
            id: null,
            name: 'كل القطاعات'
          },
          ...res.data.SECTORS
        ];
        setSectors(sectorsData);
        getAllRecommendations(selectedTypes, sectorsData[0].id, stockTypesData[0].id);
      });
  };

  /**
   * Get All Recommendations.
   * @private
   */
  const getAllRecommendations = async (currentTypes, 
      currentSelectedSector, 
      currentSelectedStockType
    ) => {
    let finalURL = `${endpoints.recommendations}?id=${user.id}`;
    const typesString = currentTypes.reduce((acc, current) => acc + `rec_type[${current}]=${current}&`, '');
    if (currentSelectedStockType != null) finalURL += `&stock_type_id=${currentSelectedStockType}`;
    if (typesString) finalURL += `&${typesString}`;
    if (currentSelectedSector) finalURL += `&sector_id=${currentSelectedSector}`;

    await api.get(finalURL)
      .then((res) => setData(res.data.RECOMMENDATIONS))
      .catch((err) => {});
  };

  useEffect(() => {
    getSectors();
  }, []);

  return <View style={style.container}>
    <StatusBar backgroundColor="transparent" barStyle="light-content"  translucent={true} />
    <View style={style.headerContainer}>
      <Text style={{fontSize: 18, color: '#4F4F4F'}}>
        نوع التوصية
      </Text>
      <View style={style.choicesContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <CheckBox 
              style={{borderRadius: 10}}
              checked={selectedTypes.includes(0)}
              color={'#2E3F5B'}
              onPress={() => {
                let finalTypes = [];
                if (selectedTypes.includes(0)) finalTypes = selectedTypes.filter((item) => item != 0)
                else finalTypes = [...selectedTypes, 0];
                setSelectedTypes(finalTypes);
                // Get evaluations
                getAllRecommendations(finalTypes, selectedSector, selectedStockTypeId);
              }}
            />
            <Text style={{marginStart: 15, color: '#4F4F4F', fontSize: 16}}>
              مضاربية
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <CheckBox 
              style={{borderRadius: 10}}
              checked={selectedTypes.includes(1)}
              color={'#2E3F5B'}
              onPress={() => {
                let finalTypes = [];
                if (selectedTypes.includes(1)) finalTypes = selectedTypes.filter((item) => item != 1)
                else finalTypes = [...selectedTypes, 1];
                setSelectedTypes(finalTypes);
                // Get recommendations
                getAllRecommendations(finalTypes, selectedSector, selectedStockTypeId);
              }}
              />
            <Text style={{marginStart: 15, color: '#4F4F4F', fontSize: 16}}>
              قصيرة المدى
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <CheckBox 
              style={{borderRadius: 10}}
              checked={selectedTypes.includes(2)}
              color={'#2E3F5B'}
              onPress={() => {
                let finalTypes = [];
                if (selectedTypes.includes(2)) finalTypes = selectedTypes.filter((item) => item != 2)
                else finalTypes = [...selectedTypes, 2];
                setSelectedTypes(finalTypes);
                // Get recommendations
                getAllRecommendations(finalTypes, selectedSector, selectedStockTypeId);
              }}
            />
            <Text style={{marginStart: 15, color: '#4F4F4F', fontSize: 16}}>
              إستثمارية
            </Text>
          </View>
        </View>
        <View style={style.dropdownRow}>
          <Dropdown 
            items={sectors}
            isModal
            onChangeValue={(value) => {
              setSelectedSector(value);
              getAllRecommendations(selectedTypes, value);
            }}
            name={'القطاع :'} />
        </View>
        <View style={style.dropdownRow}>
          <Dropdown
            items={stockTypesData}
            isModal
            onChangeValue={(value) => {
              setSelectedStockTypeId(value);
              getAllRecommendations(selectedTypes, selectedSector, value);
            }}
            name={'درجة الشرعية :'} />
        </View>
      </View>
    </View>
    <View style={style.resultsContainer}>
      {
        data.length === 0
        ?  
          <Text>
            
          </Text>
        :
        <>
          <Text style={style.resultsNumber}>
             اجمالي عدد التوصيات <Text style={{fontWeight: 'bold', fontSize: 17, color: '#4F4F4F'}}>{data.length}</Text> توصية
          </Text>
          <FlatList 
            data={data}
            renderItem={({item}) => <Card key={item.id} data={item} />}
          />
        </>
      }
    </View>
  </View>
}

export default Recommendations;
