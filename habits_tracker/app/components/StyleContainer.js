import React, { useMemo } from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import { COLORS } from '../utils/constants/colors';
import { useTheme } from './Theme';

export const StyleContainer = ({ ...props }) => {
  const {theme} = useTheme();
  const styles = useMemo(() => getStyles(theme, props.custom));

  return (
    <View style={styles.field}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View
        style={{
          flexDirection: props.row ? "row" : "column",
          justifyContent: "space-evenly"
        }}
      >
        {props.children}
      </View>
    </View>
  )
}

const getStyles = (scheme, custom = undefined) => StyleSheet.create({
  field: {
    borderWidth: 2,
    borderColor: COLORS[scheme].primary,
    borderRadius: 20,
    padding: 10,
    margin: 15,
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: custom !== undefined ? custom : COLORS[scheme].background,
    paddingHorizontal: 5,
  },
  label: {
    fontWeight: 'bold',
    color: COLORS[scheme].secondary,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
});