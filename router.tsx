import {NavigationContainer, Theme} from '@react-navigation/native';

import * as React from 'react';
import {useAuth} from './hooks/auth';
import LoginScreen from './Screens/login';
import DetailsScreen from './Screens/details';
import HomeScreen from './Screens/home';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

const routerTheme: Theme = {
  dark: true,
  colors: {
    primary: 'white',
    background: '#343746',
    text: 'white',
    border: 'white',
    card: '#343746',
    notification: 'white',
  },
};

const AppRouter = () => {
  const {username, password} = useAuth();
  return (
    <NavigationContainer theme={routerTheme}>
      <Stack.Navigator>
        {username !== '' && password !== '' ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerTitle: ''}}
          />
        )}
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
