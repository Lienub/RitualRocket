import { useColorScheme, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useMemo } from "react";
import { COLORS } from "../utils/constants/colors";
import { useTheme } from "./Theme";

export function NiceTextInput({ ...props }) {
    const {theme} = useTheme();
    const styles = useMemo(() => getStyles(theme));
    
    return (
        <TextInput
            {...props}
            style={props.multiline ? styles.NiceTextArea : styles.NiceTextInput}
            selectionColor={COLORS[theme].primary}
            underlineColor={COLORS[theme].primary}
            outlineColor={COLORS[theme].primary}
            textColor={COLORS[theme].text}
            theme={{ colors: { primary: COLORS[theme].primary } }}
        />
    )
}

const getStyles = (scheme) => StyleSheet.create({
    NiceTextInput: {
        width: "95%",
        padding: 4,
        backgroundColor: COLORS[scheme].tertiary,
        marginTop: 4,
        alignSelf: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: .5,
        color: COLORS[scheme].text,
        fontSize: 20,
    },
    NiceTextArea: {
        width: "95%",
        height: 100,
        padding: 4,
        backgroundColor: COLORS[scheme].tertiary,
        marginTop: 4,
        alignSelf: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: .5,
        color: COLORS[scheme].text,
        fontSize: 20,
    },
});