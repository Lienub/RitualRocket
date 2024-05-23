import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useMemo } from "react";
import { COLORS } from "../utils/constants/colors";
import { useTheme } from "./Theme";

export default function NiceSuccesModal({
  visible,
  onRequestClose,
  taskTitle,
}) {
  const {theme} = useTheme();
  const styles = useMemo(() => getStyles(theme));

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modal}>
        <View style={styles.viewModal}>
          <Text style={styles.congratsText}>Bravo !</Text>
          <View style={styles.lineStyle} />
          <View style={styles.imagesContainer}>
            <Image
              source={{
                uri: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWtrczhzbGE1Z25sYTM0OXBqMjF6dmg5ODljdThqeXNraGozc2gwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zjQViuAU7RxIrCFvTf/giphy.gif",
              }}
              style={[styles.image, styles.imageBack]}
            />
            <Image
              source={{
                uri: "https://i.gifer.com/6SSp.gif",
              }}
              style={styles.image}
            />
          </View>
          <Text style={styles.taskTitle}>{taskTitle}</Text>
          <Text style={styles.detail}>Meilleur Série</Text>
          <Text style={styles.detailDay}>1 Journée</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onRequestClose}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (scheme) =>
  StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: COLORS[scheme].tertiary +"5",
    },
    viewModal: {
      margin: 20,
      backgroundColor: COLORS[scheme].tertiary,
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    congratsText: {
      fontSize: 24,
      fontWeight: "bold",
      margin: 20,
      color: COLORS[scheme].text,
    },
    image: {
      width: 200,
      height: 300,
      position: "absolute",
      borderRadius: 10,
    },
    imageBack: {
      width: 100,
      height: 100,
      marginBottom: 20,
      position: "absolute",
      borderRadius: 10,
      alignSelf: "center",
      zIndex: -1,
    },
    imagesContainer: {
      position: "relative",
      width: 200,
      height: 100,
      marginBottom: 20,
    },
    taskTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: COLORS[scheme].primary,
      marginBottom: 20,
      textAlign: "center",
    },
    closeButton: {
      backgroundColor: COLORS[scheme].primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      width: "100%",
      marginTop: 10,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
    },
    lineStyle: {
      borderWidth: 0.4,
      borderColor: COLORS[scheme].text,
      width: "100%",
      marginBottom: 10,
    },
    detail: {
      fontSize: 18,
      color: COLORS[scheme].text,
      marginBottom: 10,
    },
    detailDay: {
      fontWeight: "bold",
      fontSize: 18,
      color: COLORS[scheme].primary,
      marginBottom: 20,
    },
  });
