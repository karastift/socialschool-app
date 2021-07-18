import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const getBackLogin = (route: any, type: string, navigation: any) => {
  const name = getFocusedRouteNameFromRoute(route);
  
  if (typeof name === 'undefined' || name === 'Username') return;

  if (typeof name === 'undefined') return;

  if (type === 'Register') {
    const screens = ['Username', 'Email', 'Password', 'School'];
    return navigation.navigate(screens[screens.indexOf(name) - 1]);
  }
  const screens = ['Username', 'Password', 'School'];
  return navigation.navigate(screens[screens.indexOf(name) - 1]); 
};