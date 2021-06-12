import { StackNavigationOptions } from "@react-navigation/stack";

export const HeaderOptions: StackNavigationOptions = {
  headerTitleStyle: {
    color: 'red',
    fontWeight: '700',
    // marginBottom: 50, // only on android
  },
  // headerTitleAlign: 'center', // only on android
  headerTransparent: true,
  headerBackTitleStyle: { color: 'white' },
  headerBackTitle: '',
}