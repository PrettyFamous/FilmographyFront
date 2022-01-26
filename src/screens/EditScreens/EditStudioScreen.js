import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { StudiosDataProvider } from '../../services/DataProviders/StudiosDataProvider';
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
  name: string().required(ErrorComponent('Поле не может быть пустым')),
  country: string().required(ErrorComponent('Поле не может быть пустым')),
});

const EditStudioScreen = ({ route, navigation }) => {
  const id = route?.params?.id ?? -1;
  const [defaultValues, setDefaultValues] = useState({
    id,
    name: "",
    country: "",
  });

  useEffect(() => {
    if (id !== -1) {
      StudiosDataProvider.getStudioByID(id).then((data) => {
        setDefaultValues(data.data);
      });
    }
  }, []);

  const handleSubmit = (values) => {
    if (id === -1) {
      StudiosDataProvider.putStudio(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });;
    } else {
      StudiosDataProvider.updateStudio(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });;
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
                    <Text fontSize="md">Название киностудии:</Text>
                    <Input
                      onChangeText={props.handleChange('name')}
                      onBlur={props.handleBlur('name')}
                      value={props.values.name}
                      placeholder="Введите название киностудии"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="name" />
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

export default EditStudioScreen;
