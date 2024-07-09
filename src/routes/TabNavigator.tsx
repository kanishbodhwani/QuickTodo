import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

type TabParamList = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      safeAreaInsets={{ top: 0, bottom: 0 }}
      initialRouteName={'Home'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingHorizontal: 40,
          elevation: 0,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          width: '100%',
          alignSelf: 'center',
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: 'home' = 'home';

          color = focused ? '#eee' : '#ccc';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;