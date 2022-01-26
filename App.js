import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Импортируем экраны нашего приложения
import DirectorsMainScreen from './src/screens/MainScreens/DirectorsMainScreen'
import StudiosMainScreen from './src/screens/MainScreens/StudiosMainScreen'
import FilmsMainScreen from './src/screens/MainScreens/FilmsMainScreen'
import MainScreen from './src/screens/MainScreens/MainScreen';
import EditDirectorScreen from './src/screens/EditScreens/EditDirectorScreen';
import EditStudioScreen from './src/screens/EditScreens/EditStudioScreen'
import EditFilmScreen from './src/screens/EditScreens/EditFilmScreen'

const Stack = createNativeStackNavigator();

// В корне храним только Навигацию
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name={'MainScreen'} component={MainScreen} />

        <Stack.Screen name={'DirectorsMainScreen'} component={DirectorsMainScreen} />
        <Stack.Screen name={'EditDirector'} component={EditDirectorScreen} />

        <Stack.Screen name={'StudiosMainScreen'} component={StudiosMainScreen} />
        <Stack.Screen name={'EditStudio'} component={EditStudioScreen} />

        <Stack.Screen name={'FilmsMainScreen'} component={FilmsMainScreen} />
        <Stack.Screen name={'EditFilm'} component={EditFilmScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
