import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Card, ButtonGroup, Button, Icon } from 'react-native-elements';
import { DirectorsDataProvider } from '../../services/DataProviders/DirectorsDataProvider';

const buttons = ['Удалить', 'Добавить'];

const DirectorsMainScreen = ({ navigation }) => {
  const [directors, setDirectors] = useState();
  const [workMode, setWorkMode] = useState(1);

  const getData = () => {
    let shouldComponentsUpdate = true;

    DirectorsDataProvider.getAllDirectorsShortInfo().then((directors) => {
      const mappedDirectors = directors.data.map((director) => ({
        key: director.id,
        ...director,
      }));

      if (shouldComponentsUpdate) {
        setDirectors(mappedDirectors);
      }
    });

    return () => {
      shouldComponentsUpdate = false;
    };
  }

  useEffect(getData, []);

  const handleDelete = (id) => {
    DirectorsDataProvider.deleteDirector(id).then( getData );
  };

  const renderListItem = ({ item }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#D9D9D9"
        onPress={
          workMode
            ? () =>
                navigation.navigate('EditDirector', {
                  id: item.id,
                  refresh: getData
                })
            : () => {
                handleDelete(item.id);
              }
        }
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.fullName}</Text>
          {!workMode && (
            <Button
              type="clear"
              onPress={
                workMode
                  ? () => null
                  : () => {
                      handleDelete(item.id);
                    }
              }
              icon={<Icon name="close" type="evilicon" color="#f00" />}
            />
          )}
        </View>
      </TouchableHighlight>
    );
  };

  const handleWorkModeChange = (pressedButtonIndex) => {
    if (pressedButtonIndex === 0) {
      if (workMode === 0) {
        setWorkMode(1);
      } else {
        setWorkMode(0);
      }
    } else {
      navigation.navigate('EditDirector', {
        refresh: getData
      });
    }
  };

  return (
    <Card>
      <ButtonGroup
        buttons={buttons}
        containerStyle={{ height: 50 }}
        selectedIndex={workMode ? undefined : workMode}
        selectedButtonStyle={{ backgroundColor: '#f00' }}
        onPress={handleWorkModeChange}
      />
      <Card.Divider />
      <FlatList style={styles.list} data={directors} renderItem={renderListItem} />
    </Card>
  );
};

export default DirectorsMainScreen;

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
    flexDirection: 'row',
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
});
