import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { Card, ButtonGroup, Button, Icon } from 'react-native-elements';


const buttons = ['Фильмы', 'Студии', 'Режиссёры']

const MainScreen = ({ navigation }) => {
  //const [books, setBooks] = useState();
  //const [workMode, setWorkMode] = useState(1);


  const handleWorkModeChange = (pressedButtonIndex) => {
    switch (pressedButtonIndex) {
      case 0:
        navigation.navigate('FilmsMainScreen');
        break;
      case 1:
        navigation.navigate('StudiosMainScreen');
        break;
      case 2:
        navigation.navigate('DirectorsMainScreen');
        break;
    }
  }


  return (
    <Card>
      <ButtonGroup 
        buttons={buttons}
        containerStyle={{ height: Dimensions.get('window').height * 0.7 }}
        selectedButtonStyle={{ backgroundColor: '#f00' }}
        onPress={handleWorkModeChange}
        vertical
      />
    </Card>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  list: {
    marginBottom: 150,
  },
  textContainer: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
  },
  text: {
    fontSize: 25,
    maxWidth: 250,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 5,
    bordrerWidth: 1,
    borderRadius: 5,
    borderColor: '#D3D3D3',
    height: 500
  }
});
