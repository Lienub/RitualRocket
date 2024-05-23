import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import ThemeToggleButton from '../../components/Buttons/ThemeToggle'
import { useTheme } from '../../components/Theme';
import { getStyles } from './styles';
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export function Settings() {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme));

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.Action
                    icon={() => <Ionicons name="close" size={30} color="#fff" />}
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content title="Settings" titleStyle={styles.appbarTitle} />
            </Appbar.Header>
            <ThemeToggleButton />
        </View>
    );
}