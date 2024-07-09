// for deep links and notification services
// in this we have handle case for depp links and universal links
// You need to integrate with third party libraries, such as push notifications, branch etc. See third party integrations for deep linking instead.

// Below is a good use for redux
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function goBack() {
  return navigationRef?.goBack();
}

export function navigate<RouteName extends keyof RootStackParamList>(
  ...args: undefined extends RootStackParamList[RouteName]
    ? [name: RouteName] | [name: RouteName, params: RootStackParamList[RouteName]]
    : [name: RouteName, params: RootStackParamList[RouteName]]
) {
  if (navigationRef.isReady()) {
    // @ts-expect-error: this error is due to type inference issues, but the navigate function works correctly
    navigationRef.navigate(...args);
  }
}

function push(routeName: string, params?: Record<string, any>) {
  // @ts-expect-warning:
  throw new Error('Missing implementation of push');
}

function reset(routeName: string) {
  // @ts-expect-warning:
  throw new Error('Missing implementation of reset');
}

function getCurrentRoute() {
  throw new Error('Missing implementation of getCurrentRoute');
}

const getRouteName = () => {
  return navigationRef.getCurrentRoute()?.name ?? '';
};

const NavigationService = {
  navigate,
  push,
  goBack,
  reset,
  getCurrentRoute,
  getRouteName,
};

export default NavigationService;
