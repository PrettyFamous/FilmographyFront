import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { DirectorsDataProvider } from '../../services/DataProviders/DirectorsDataProvider';
import { View } from 'react-native';
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
  fullName: string().required(ErrorComponent('Поле не может быть пустым')),
  birthDate: string().required(ErrorComponent('Поле не может быть пустым')),
  country: string().required(ErrorComponent('Поле не может быть пустым')),
});

const EditDirectorScreen = ({ route, navigation }) => {
  const id = route?.params?.id ?? -1;
  const [defaultValues, setDefaultValues] = useState({
    id,
    fullName: '',
    birthDate: '',
    country: '',
  });

  useEffect(() => {
    if (id !== -1) {
      DirectorsDataProvider.getDirectorByID(id).then((data) => {
        setDefaultValues(data.data);
      });
    }
  }, []);

  const handleSubmit = (values) => {
    if (id === -1) {
      DirectorsDataProvider.putDirector(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });
    } else {
      DirectorsDataProvider.updateDirector(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });
    }
    
  };

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
                    <Text fontSize="md">ФИО режиссёра:</Text>
                    <Input
                      onChangeText={props.handleChange('fullName')}
                      onBlur={props.handleBlur('fullName')}
                      value={props.values.fullName}
                      placeholder="Введите ФИО режиссёра"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="fullName" />
                  </Box>
                  <Box>
                    <Text fontSize="md">Дата рождения:</Text>
                    <Input
                      onChangeText={props.handleChange('birthDate')}
                      onBlur={props.handleBlur('birthDate')}
                      value={props.values.birthDate}
                      placeholder="Введите дату в формате 'dd.mm.yyyy'"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="birthDate" />
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

export default EditDirectorScreen;
