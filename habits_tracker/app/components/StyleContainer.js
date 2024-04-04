import React, { useMemo } from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import { COLORS } from '../utils/constants/colors';

export const StyleContainer = ({ ...props }) => {
  const scheme = useColorScheme();
  const styles = useMemo(() => getStyles(scheme));

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

const getStyles = (scheme) => StyleSheet.create({
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
    backgroundColor: COLORS[scheme].background,
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