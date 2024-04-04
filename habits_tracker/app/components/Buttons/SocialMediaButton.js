import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';

export default function SocialMediaButton({ source, onPress, title }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={source} style={styles.icon} />
      <View style={{alignSelf: 'center', flex:1, marginRight: 50}}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    width: 300,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  text: {
    color: '#9D9D9D',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
