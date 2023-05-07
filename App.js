import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/home';
import EditorScreen from './src/pages/editor';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style='dark' />
        <Stack.Navigator screenOptions={() => ({
          headerTintColor: '#fafafa',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
        })}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
