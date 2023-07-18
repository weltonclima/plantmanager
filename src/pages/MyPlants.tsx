import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { loadPlant, PlantProps } from '../libs/storage';

import waterDropImg from '../assets/waterdrop.png';
import colors from '../../styles/colors';
import { formatDistance } from 'date-fns/esm';
import { pt } from 'date-fns/locale';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState('');

  useEffect(() => {
    async function loadStorageData() {
      const plantStoraged = await loadPlant();

      console.log(plantStoraged)

      const nexTime = formatDistance(
        new Date(plantStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWaterd(
        `Não esqueça de regar a ${plantStoraged[0].name} à ${nexTime} horas.`
      )

      setMyPlants(plantStoraged);
      setLoading(false);
    }
    loadStorageData();
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image
          source={waterDropImg}
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>
          {nextWaterd}
        </Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>
        <FlatList
          data={myPlants}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
          renderItem={({ item }) => (
            <Text>{item.id}</Text>
          )}
        />
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {

  },
  spotlightImage: {

  },
  spotlightText: {

  },
  plants: {

  },
  plantsTitle: {

  },
})