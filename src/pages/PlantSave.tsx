import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { isBefore } from 'date-fns/esm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker from '@react-native-community/datetimepicker';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from '../components/Button';

import waterDropImg from '../assets/waterdrop.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
  const route = useRoute();
  const { plant } = route.params as Params;
  const navigation = useNavigation();

  function handleChangeTime(event: Event, datetime: Date | undefined) {
    if (Platform.OS == 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (datetime && isBefore(datetime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰')
    }

    if (datetime) {
      setSelectedDateTime(datetime);
    }
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });
      
      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });

    } catch {
      Alert.alert('Não foi possível salvar. 😢');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />
        <Text style={styles.plantName}>
          {plant.name}
        </Text>
        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image
            source={waterDropImg}
            style={styles.tipImage}
          />
          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>
        {showDatePicker &&
          (
            <DateTimePicker
              value={selectedDateTime}
              mode='time'
              display='spinner'
              onChange={handleChangeTime}
            />
          )}
        {Platform.OS == 'android' &&
          (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={() => setShowDatePicker(oldState => !oldState)}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )}
        <Button
          title="Cadastrar Planta"
          onPress={handleSave}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'center',
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  }
})