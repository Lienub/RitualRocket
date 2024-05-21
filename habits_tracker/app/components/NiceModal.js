import { useColorScheme, StyleSheet, Modal, View } from "react-native";
import { useMemo } from "react";
import { COLORS } from "../utils/constants/colors";

export function NiceModal({ ...props }) {
    const scheme = useColorScheme();
    const styles = useMemo(() => getStyles(scheme));

    return (
        <Modal
            {...props}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modal}>
                <View style={styles.viewModal}>
                    {props.children}
                </View>
            </View>
        </Modal>
    )
}

const getStyles = (scheme) => StyleSheet.create({
    modal: {
        flex:1,
        justifyContent: "center",
      },

      viewModal: {
        margin: 20,
        backgroundColor: COLORS[scheme].tertiary,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});