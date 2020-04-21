import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from './configs/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import stackRoutes from './configs/routes';
import { Root } from 'native-base';
import { YellowBox } from 'react-native';

console.disableYellowBox= true;

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Root>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {stackRoutes.map((route, index) => (
              <Stack.Screen
                key={index}
                name={route.name}
                component={route.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </Provider>
  );
}
