import { useColorScheme, StyleSheet, Pressable, View, Text } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { COLORS } from "../utils/constants/colors";
import { useTheme } from "./Theme";


export function NiceTextButton({ ...props }) {
    const [displayText, setDisplayText] = useState(props.text);
    const {theme} = useTheme();
    const styles = useMemo(() => getStyles(theme));

    // Update the display text when the text prop changes
    useEffect(() => {
        setDisplayText(props.text);
        props.onTextChange;
    }, [props.text]);


    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? COLORS[theme].secondary
                        : COLORS[theme].primary,
                },
                styles.container,
            ]}
        >
            <View style={styles.container}>
                <Text style={styles.text}>
                    {displayText}
                </Text>
            </View>
        </Pressable>
    )
}

const getStyles = (scheme) => StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})