import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import StartScreen from '../screens/StartScreen/StartScreen';
import TodoScreen from '../screens/TodoScreen/TodoScreen';

type AppStackParamList = {
  Start: undefined;
  Tabs: undefined;
  Todo: { todo?: { id: string; text: string } } | undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Todo" component={TodoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppStack;