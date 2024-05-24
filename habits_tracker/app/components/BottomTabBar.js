import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/constants/colors';
import { useTheme } from './Theme';

export function BottomTabBar({ state, descriptors, navigation }) {
  const {theme} = useTheme();
  const opposite = theme === 'dark' ? 'light' : 'dark';
  console.log(opposite);
  const styles = getStyles(theme);
  const middleIndex = Math.floor(state.routes.length / 2);
  console.log(navigation)

  return (
    <SafeAreaProvider style={styles.navSection}>
      <SafeAreaView style={styles.leftPanel}>
        {state.routes.slice(0, middleIndex).map((route, index) => {
          if (route.name !== "Statistics") {
            return renderTab(route, index, state, descriptors, theme, navigation)
          }
        })}
      </SafeAreaView>
      <SafeAreaView style={styles.middlePanel}>
        <TouchableOpacity
          style={{
            backgroundColor: '#F2994A',
            borderRadius: 50,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
          }}
          onPress={() => navigation.navigate('Statistics')}
        >
          <Icon name="rocket-launch" size={30} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.rightPanel}>
        {state.routes.slice(middleIndex).map((route, index) => {
          console.log(route.name)
          if (route.name !== "Statistics") {
            return renderTab(route, index + middleIndex, state, descriptors, theme, navigation)
          }
        })}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const renderTab = (route, index, state, descriptors, theme, navigation) => {
  const opposite = theme === 'dark' ? 'light' : 'dark';
  const { options } = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;

  const isFocused = state.index === index;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  let icon;
  if (route.name === 'Home') {
    icon = 'home';
  } else if (route.name === 'Profile') {
    icon = 'person';
  } else if (route.name === 'Catégories') {
    icon = 'folder';
  } else if (route.name === 'Settings') {
    icon = 'settings'
  } else {
    icon = 'circle'; // Default icon
  }

  return (
    <TouchableOpacity
      key={route.key}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1, ...styles.panelContent }}
    >
      <Icon name={icon} size={30} color={isFocused ? COLORS[theme].primary : COLORS[opposite].tertiary} />
      <Text style={{ color: isFocused ? COLORS[theme].primary : COLORS[theme].text, fontSize: 10 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (mode) => {
  return styles = {
    navSection: {
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      elevation: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      paddingBottom: Dimensions.get('window').height * 0.03,
      height: Dimensions.get('window').height * 0.1,
    },

    leftPanel: {
      display: 'flex',
      flex: 1,
      flexGrow: 1,
      flexDirection: 'row',

      height: "100%",

      backgroundColor: COLORS[mode].tertiary,

      borderWidth: 1,
      borderLeftWidth: 0,
      borderColor: '#F2994A',
      borderRadius: 10,
      borderTopLeftRadius: 0,
      borderBOTtomLeftRadius: 0,

      // Add shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,

      alignItems: 'center',
      justifyContent: 'center',
    },

    middlePanel: {
      width: 100,
      height: "100%",
      display: 'flex',
      alignItems: 'center',

      marginBottom: Dimensions.get('window').height * 0.02,
    },

    rightPanel: {
      flex: 1,
      flexGrow: 1,
      flexDirection: 'row',

      height: "100%",

      // Need to change that with dynamic value
      backgroundColor: COLORS[mode].tertiary,

      borderWidth: 1,
      borderRightWidth: 0,
      borderColor: '#F2994A',
      borderRadius: 10,
      borderTopRightRadius: 0,

      // Add shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    panelContent: {
      paddingTop: 5,
      justifyContent: 'center',
      alignItems: 'center',
      height: "100%",
      flex: 1,
    },
  }
};
