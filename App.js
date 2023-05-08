import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/home';
import { Provider } from 'jotai';
import { EditorStore } from './src/stores/editorStore';
import EditorScreen from './src/pages/editor';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={EditorStore}>
      <NavigationContainer>
        <StatusBar style='dark' />
        <Stack.Navigator screenOptions={() => ({
          headerTintColor: '#fafafa',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
        })}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Editor" component={EditorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
