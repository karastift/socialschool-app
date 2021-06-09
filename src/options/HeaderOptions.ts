import { StackNavigationOptions } from "@react-navigation/stack";

export const HeaderOptions: StackNavigationOptions = {
  headerTitleStyle: {
    color: 'red',
    fontWeight: '700',
    marginBottom: 50,
  },
  headerTitleAlign: 'center',
  headerTransparent: true,
  headerBackTitleStyle: { color: 'white' },
  headerBackTitle: '',
}