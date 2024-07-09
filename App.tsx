import React from 'react';
import { Provider } from 'react-redux';
import AppStack from './src/routes/AppStack';
import { store } from './src/app/store';
import AppNavigationContainer from './src/navigation/NavigationContainer';
import linking from './src/navigation/linking';

const MainNavigator: React.FC = () => {
  return (
    <AppNavigationContainer linking={linking}>
      <AppStack />
    </AppNavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;