import { useColorScheme, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useMemo } from "react";
import { COLORS } from "../utils/constants/colors";

export function NiceTextInput({ ...props }) {
    const scheme = useColorScheme();
    const styles = useMemo(() => getStyles(scheme));
    
    return (
        <TextInput
            {...props}
            style={props.multiline ? styles.NiceTextArea : styles.NiceTextInput}
            selectionColor={COLORS[scheme].primary}
            underlineColor={COLORS[scheme].primary}
            outlineColor={COLORS[scheme].primary}
            textColor={COLORS[scheme].text}
            theme={{ colors: { primary: COLORS[scheme].primary } }}
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