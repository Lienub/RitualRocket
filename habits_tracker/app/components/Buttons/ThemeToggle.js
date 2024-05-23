import React, {useMemo} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../Theme';
import { COLORS } from '../../utils/constants/colors';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => getStyles(theme));
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</Text>
      <Switch
        value={theme === 'dark'}
        onValueChange={(value) => toggleTheme(value ? 'dark' : 'light')}
        thumbColor={theme === 'dark' ? '#fff' : '#000'}
        trackColor={{ false: '#767577', true: 'orange' }}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
};

function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: COLORS[theme].tertiary,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      margin: 10,
    },
    label: {
      fontSize: 18,
      color: COLORS[theme].text,
    },
  })
}

export default ThemeToggleButton;
