import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

// Configuration for deep links
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      // Login: 'login',
      // SignUp: 'signup',
      // GoogleLogin: 'google-login',
      // PhoneLogin: 'phone-login',
      Home: 'home',
      NotFound: '*',
      Events: 'events',
      Profile: 'profile/:id',
      Event: 'event/:id',
      Group: 'group/:id',
      Groups: 'groups',
    },
  },
};

export default linking;
