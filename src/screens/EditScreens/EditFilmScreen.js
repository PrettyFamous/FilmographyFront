import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { FilmsDataProvider } from '../../services/DataProviders/FilmsDataProvider';
import { DirectorsDataProvider } from '../../services/DataProviders/DirectorsDataProvider';
import { StudiosDataProvider } from '../../services/DataProviders/StudiosDataProvider';
import { View, Picker, Dimensions, } from 'react-native';
import  Loading  from '../LoadingScreens/Loading'
import { ErrorMessage, Formik } from 'formik';
import {
  NativeBaseProvider,
  Text,
  Input,
  Button,
  Flex,
  Box,
} from 'native-base';
import { object, string, number } from 'yup';

const ErrorComponent = (msg) => (
  <Text color="red.700" fontSize="md">
    {msg}
  </Text>
);
                          
const validationSchema = object().shape({
  filmName: string().required(ErrorComponent('Поле не может быть пустым')),
  country: string().required(ErrorComponent('Поле не может быть пустым')),
  studio: string().required(ErrorComponent('Поле не может быть пустым')),
  director: string().required(ErrorComponent('Поле не может быть пустым')),
});

const EditFilmScreen = ({ route, navigation }) => {
  const id = route?.params?.id ?? -1;
  const [defaultValues, setDefaultValues] = useState({
    id,
    filmName: "",
    country: "",
    studio: 1,
    director: 1
  });


  const [isLoading, setIsLoading] = useState(0)
  const [directors, setDirectors] = useState()
  const [studios, setStudios] = useState()


  useEffect(() => {
    if (id !== -1) {
      FilmsDataProvider.getFilmByID(id).then((data) => {
        setDefaultValues({
          ...data.data,
          studio: data.data.studio.id,
          director: data.data.director.id
        });
      });
    }
    
    let count = 0;

    DirectorsDataProvider.getAllDirectorsShortInfo().then((directors) => {
      const mappedDirectors = directors.data.map((director) => ({
        key: director.id,
        ...director,
      }));

      setDirectors(mappedDirectors);
      count++
      setIsLoading(count)
    });


    StudiosDataProvider.getAllStudiosShortInfo().then((studios) => {
      const mappedStudios = studios.data.map((studio) => ({
        key: studio.id,
        ...studio,
      }));

      setStudios(mappedStudios);
      count++
      setIsLoading(count)
    });
  }, []);

  const handleSubmit = async (values) => {
    if (id === -1) {
      values = {
        filmName: values.filmName,
        country: values.country,
        studioId: values.studio,
        directorId: values.director
      }
      FilmsDataProvider.putFilm(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });;
    } else {
      values = {
        ...values,
        studio: await (await StudiosDataProvider.getStudioByID(values.studio)).data,
        director: await (await DirectorsDataProvider.getDirectorByID(values.director)).data,
      }
      FilmsDataProvider.updateFilm(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });;
    }
  };

  if (isLoading < 2) return <Loading />;

  return (
    <Card>
      <Card.Title>{id === -1 ? 'Добавление' : 'Редактирование'}</Card.Title>
      <Card.Divider />
      <View style={{ height: 600 }}>
        <Formik
          initialValues={defaultValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <NativeBaseProvider>
                <Flex>
                  <Box>
                    <Text fontSize="md">Название фильма:</Text>
                    <Input
                      onChangeText={props.handleChange('filmName')}
                      onBlur={props.handleBlur('filmName')}
                      value={props.values.filmName}
                      placeholder="Введите название фильма"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="filmName" />
                  </Box>
                  <Box>
                    <Text fontSize="md">Страна:</Text>
                    <Input
                      onChangeText={props.handleChange('country')}
                      onBlur={props.handleBlur('country')}
                      value={props.values.country}
                      placeholder="Введите страну"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="country" />
                  </Box>
                  <Box>
                    <Text fontSize="md">Студия:</Text>
                    <Picker
                      selectedValue={props.values.studio}
                      style={{ height: 30, width: Dimensions.get('window').width * 0.8 }}
                      onValueChange={props.handleChange('studio')}
                    >
                      {
                        studios.map((studio) => (
                            <Picker.Item key={studio.key} label={studio.name} value={studio.id} />
                        ))
                      }
                    </Picker>
                    <ErrorMessage name="studio" />
                  </Box>
                  <Box>
                    <Text fontSize="md">Режиссёр:</Text>
                    <Picker
                      selectedValue={props.values.director}
                      style={{ height: 30, width: Dimensions.get('window').width * 0.8 }}
                      onValueChange={props.handleChange('director')}
                    >
                      {
                        directors.map((director) => (
                            <Picker.Item key={director.key} label={director.fullName} value={director.id} />
                        ))
                      }
                    </Picker>
                    <ErrorMessage name="director" />
                  </Box>
                  <Button
                    size="sm"
                    fontSize="md"
                    variant="outline"
                    colorScheme="coolGray"
                    h={{
                      md: '10',
                    }}
                    mt={6}
                    onPress={props.handleSubmit}
                  >
                    Сохранить
                  </Button>
                </Flex>
              </NativeBaseProvider>
            );
          }}
        </Formik>
      </View>
    </Card>
  );
};

export default EditFilmScreen;
