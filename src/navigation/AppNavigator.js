import React from 'react';
import {View ,TouchableOpacity} from 'react-native'; 
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeIcon from 'react-native-vector-icons/dist/Octicons';
import {StackNavigator} from './StackNavigator';
import CustomDrawer from './CustomDrawer';
import I18n from "../lang/I18n";

const Drawer = createDrawerNavigator();
const config={
  animation: 'spring',
  config: {
    stiffness: 1100,
    damping: 600,
    mass: 3,
    restDisplacementThreshold: 0.04,
    restSpeedThreshold: 0.04,
  },
};

export const AppNavigator = (props) => {
  // const setTabLabel = (title) => I18n.t(title);

  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerType= "front" 
      drawerStyle={{width: '100%'}} 
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={StackNavigator}
        options={{
          setTabLabel: false,
          headerShown: false,
          headerLeft: () => (<NavigationDrawerStructure navigationProps = {navigation}/>),
        }}
      />
  </Drawer.Navigator>);
};

export default AppNavigator;