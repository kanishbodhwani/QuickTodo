import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { RootStackParamList } from './types';

interface Props {
  children: React.ReactNode;
  linking?: LinkingOptions<RootStackParamList>;
}

const AppNavigationContainer: React.FC<Props> = ({ children, linking }) => {
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      {children}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
