import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import api from '../services/api';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/core';


type Enviroment = {
  title: string;
  key: string;
}

type Plants = {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number,
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [environment, setEnvironment] = useState<Enviroment[]>([]);
  const [plants, setplants] = useState<Plants[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plants[]>([]);
  const [environmentActive, setEnvironmentActive] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  function handlePlantSelect(plant: Plants){
    navigation.navigate('PlantSave', {plant})
  }

  function handleEnvironmentSelect(environment: string) {
    setEnvironmentActive(environment)

    if (environment === 'all')
      return setFilteredPlants(plants)

    const filtered = plants.filter(plants =>
      plants.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api
        .get<Enviroment[]>('plants_environments?_sort=title&_order=asc')

      setEnvironment([{
        key: 'all',
        title: 'Todos',
      },
      ...data
      ]);
    }
    fetchEnviroment();
  }, [])

  async function fetchPlants() {
    const { data } = await api
      .get<Plants[]>(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

    if (!data) {
      setLoading(true);
    }

    if (page > 1) {
      setplants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setplants(data);
      setFilteredPlants(data);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3500)
    setLoadingMore(false);
  }

  useEffect(() => {
    fetchPlants();
  }, [])

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual Ambiente
      </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
      </Text>
      </View >
      <View>
        <FlatList
          data={environment}
          keyExtractor={item => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentlist}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === environmentActive}
              onPress={() => handleEnvironmentSelect(item.key)}
            />
          )}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
          contentContainerStyle={styles.plantslist}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={event => handlePlantSelect(item)}
            />
          )}
        />
      </View>

    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentlist: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  plantslist: {

  }
})