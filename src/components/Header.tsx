import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../styles/colors';

export function Header(){
  return (
    <View style={styles.container}>

    </View>
  )
}

export const styles = StyleSheet.create({
  container:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.red,
  }
})