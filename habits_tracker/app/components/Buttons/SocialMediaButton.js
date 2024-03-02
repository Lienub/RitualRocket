import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function SocialMediaButton({ source, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={source} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginHorizontal: 5,
    borderWidth: 0.2,
    borderColor: 'white',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
