import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Home from '../screens/home';
import Services from '../screens/services';
import Reports from '../screens/reports';
import Recommendations from '../screens/recommenditions';
import Packages from '../screens/packages';
import Charts from '../screens/charts';
import Analysis from '../screens/analysis';
import ContactUs from '../screens/contactUs';
import AboutUs from '../screens/aboutUs';
import Login from '../screens/login';
import Register from '../screens/register';
import Policy from '../screens/policy';
import Welcome from '../screens/welcome';
import AsyncStorage from '@react-native-community/async-storage';

  const Stack = createStackNavigator();
  const config = {
    animation :'spring',
    config: {
      stiffness: 50,
      damping: 10,
      //  mass: 1,
      //  restDisplacementThreshold: 0.00,
      //  restSpeedThreshold: 0.00,      
    },
  };

  const options = {
    headerStyle: {
      backgroundColor: '#13314F',
    },
    headerTintColor: '#FFF'
  };


  export function StackNavigator() {
  const isFirstTime = useSelector((state) => state.isFirstTime);

  return (
    <Stack.Navigator
      initialRouteName = {isFirstTime ? 'Welcome' : 'Home'}
      screenOptions = {{
        gestureEnabled : false ,
        gestureDirection : 'horizontal' ,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec : {
          open : config, 
          close : config
        }
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options = {{
          ...options,
          headerShown:false
        }} 
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options = {{
          ...options,
          headerShown: false
        }} 
      />
       <Stack.Screen name="Services" 
                      component={Services}
                      options = {{
                        ...options,
                        title: 'خدمات بيت المال',
                      }}
        />
        <Stack.Screen name="Reports" 
                      component={Reports}
                      options = {{
                        ...options,
                        title: 'التقارير',
                        // headerLeft: () => (<NavigationDrawerStructure navigationProps = {navigation}/>),
                      }}
        />
        <Stack.Screen name="Recommendations" 
                      component={Recommendations}
                      options = {{
                        ...options,
                        title: 'التوصيات اللحظية'
                      }}
        />
        <Stack.Screen name = "Packages"
                      component={Packages}
                      options = {{
                        ...options,
                        title: 'باقات الإشتراك'
                      }}
        />
        <Stack.Screen name="Charts" 
                      component={Charts}
                      options = {{
                        ...options,
                        title: 'معدل الأداء'
                      }}
        />
        <Stack.Screen name = "Analysis"
                      component={Analysis}
                      options = {{
                        ...options,
                        title: 'التحليلات الفنية'
                      }}
        />
        <Stack.Screen name="AboutUs" 
                      component={AboutUs}
                      options = {{
                        ...options,
                        title: 'عن بيت المال'
                      }}
        />
        <Stack.Screen name = "ContactUs"
                      component={ContactUs}
                      options = {{
                        ...options,
                        headerShown: false
                      }}
        />
        <Stack.Screen name = "Login"
                      component={Login}
                      options = {{
                        ...options,
                        headerShown: false
                      }}
        />
        <Stack.Screen name = "Register"
                      component={Register}
                      options = {{
                        ...options,
                        headerShown: false
                      }}
        />
        <Stack.Screen name = "Policy"
                      component={Policy}
                      options = {{
                        ...options,
                        title: 'سياسة الخصوصية'
                      }}
        />
    </Stack.Navigator>
  );
}