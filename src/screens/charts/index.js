import React, {
  useState,
  useEffect
} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar
} from 'react-native';
import { CheckBox } from 'native-base';
import {PieChart} from "react-native-chart-kit";
import moment from 'moment';
import style from './styles';
import Spinner from '../../components/spinner';
import Dropdown from '../../components/dropdown';
import Card from './components/card';
import { useSelector, useDispatch } from 'react-redux';
import Pie from 'react-native-pie'

import api from '../../config/api';
import endpoints from '../../config/endpoints';
import I18n from '../../lang/I18n';

const Recommendations = () => {
  const [data, setData] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([0, 1, 2]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  
  /**
   * Get sectors.
   * @private
   */
  const getYears = () => {
    api.get(endpoints.evaluationYears)
      .then((res) => {
      let yearsArray = res.data.DATA.map((item) => {
        var object = new Object();
        object.id = parseInt(item);
        object.name = item;
        return object;
      });
      setYears(yearsArray);
      setSelectedYear(yearsArray[0].id);
      getMonths(yearsArray[0].id);
    });
  };

  /**
   * Get sectors.
   * @private
   */
  const getMonths = (year) => {
    api.get(`${endpoints.evaluationMonths}?month=${year}`)
      .then((res) => {
      let monthsArray = res.data.MONTHS.map((item, index) => {
        var object = new Object();
        object.id = (index < 9) ? `0${index + 1}` : index + 1;
        object.name = item;
        return object;
      });
      setMonths(monthsArray);
      setSelectedMonth(monthsArray[0].id);
      getEvaluation(monthsArray[0].id, selectedTypes, year);
    });
  };

  /**
   * Get All Recommendations.
   * @private
   */
  const getEvaluation = (month, currentSelectedTypes, currentSelectedYear = null) => {
    const typesString = currentSelectedTypes.reduce((acc, current) => acc + `id[${current}]=${current}&`, '');
    api.get(`${endpoints.evaluationDays}?month=${currentSelectedYear ?? selectedYear}-${month}&${typesString}`)
      .then((res) => setData(res.data))
      .catch((err) => alert(I18n.t('errorHappened')));
  };

  useEffect(() => {
    getYears();
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
                getEvaluation(selectedMonth, finalTypes);
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
                // Get evaluations
                getEvaluation(selectedMonth, finalTypes);
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
                // Get evaluations
                getEvaluation(selectedMonth, finalTypes);
              }}
            />
            <Text style={{marginStart: 15, color: '#4F4F4F', fontSize: 16}}>
              إستثمارية
            </Text>
          </View>
        </View>
        <View style={style.dropdownRow}>
          <Dropdown 
            items={years}
            isModal
            onChangeValue={(value) => {
              getMonths(value);
              setSelectedYear(value);
            }}
            name={'العام :'} />
          <Dropdown 
            items={months}
            isModal
            onChangeValue={(value) => {
              getEvaluation(value, selectedTypes);
              setSelectedMonth(value);
            }}
            name={'الشهر :'} />
        </View>
      </View>
    </View>
    <View style={style.resultsContainer}>
      {
        !data
        ?  
          <Spinner />
        :
        <View style={{flex:1}}>
          <View style={style.statisticsContainer}>
            <Text style={{textAlign: 'center', color: '#E84179', fontSize: 21, fontWeight: 'bold',marginBottom: 10}}>
              نتائج توصيات شهر {data.monthName} {selectedYear}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text style={{marginBottom: 7}}>
                  إجمالي عدد التوصيات 
                  <Text style={{fontWeight:'bold', fontSize: 17, marginStart: 10}}>
                    {`  ${data.DAYS.length}` }
                  </Text>
                </Text>
                <Text style={{marginBottom: 7}}>
                   عدد التوصيات المحققة
                  <Text style={{fontWeight:'bold', fontSize: 17, marginStart: 10}}>
                    {`  ${data.recommendations_win}` }
                  </Text>
                </Text>
                <Text style={{marginBottom: 7}}>
                  إيقاف الخسارة  
                  <Text style={{fontWeight:'bold', fontSize: 17, marginStart: 10}}>
                    {`  ${data.recommendations_lose}` }
                  </Text>
                </Text>
                <Text style={{marginBottom: 7}}>
                  متوسط ربح التوصية  
                  <Text style={{fontWeight:'bold', fontSize: 17, marginStart: 10}}>
                    {`  ${data.average_profit.toFixed(2)}` }
                  </Text>
                </Text>
              </View>
              <View style={{flex:1}}>
                {
                  data.DAYS.length !== 0 &&
                 <Pie
                   radius={80}
                      sections={[
                        {
                          percentage: (data.recommendations_win / data.DAYS.length) * 100,
                          color: '#1982c4',
                        },
                        {
                          percentage: (data.recommendations_lose / data.DAYS.length) * 100,
                          color: '#f18701', 
                        },
                      ]}
                      strokeCap={'butt'}
                    />
                  // <PieChart
                  //   data={[
                  //     {
                  //       name: "",
                  //       population: data.recommendations_win,
                  //       color: "#1982c4",
                  //       legendFontColor: "#1982c4",
                  //       legendFontSize: 15
                  //     },
                  //     {
                  //       name: "",
                  //       population: data.recommendations_lose,
                  //       color: "#f18701",
                  //       legendFontColor: "#f18701",
                  //       legendFontSize: 15
                  //     }
                  //   ]}
                  //   width={200}
                  //   height={130}
                  //   chartConfig={chartConfig}
                  //   accessor={"population"}
                  //   backgroundColor={"transparent"}
                  //   paddingLeft={"10"}
                  //   center={[0, 0]}
                  // />
                }
              </View>
            </View>
          </View>
          <FlatList
            data={data.DAYS}
            renderItem={({item}) => <Card key={item.id} data={item} />}
          />
        </View>
      }
    </View>
  </View>
}

export default Recommendations;