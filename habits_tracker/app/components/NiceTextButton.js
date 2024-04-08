import { useColorScheme, StyleSheet, Pressable, View, Text } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { COLORS } from "../utils/constants/colors";


export function NiceTextButton({ ...props }) {
    const [displayText, setDisplayText] = useState(props.text);
    const scheme = useColorScheme();
    const styles = useMemo(() => getStyles(scheme));

    // Update the display text when the text prop changes
    useEffect(() => {
        setDisplayText(props.text);
        props.onTextChange;
    }, [props.text]);


    return (
        <Pressable
            {...props}
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
        backgroundColor: COLORS[scheme].primary,
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontSize: 20
    }
})