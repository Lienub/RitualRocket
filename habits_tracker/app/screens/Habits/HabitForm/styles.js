import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/constants/colors";

export const getStyles = (mode) => {
  const colors = mode === 'dark' ? COLORS.dark : COLORS.light;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    modalSelectIcons: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
    },
    btnSelectIcon: {
      borderRadius: 10,
      color: colors.primary,
      fontSize: 20,
      fontWeight: "500",
      marginBottom: 10,
    },
    selectElement: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "700",
      alignSelf: "center",
      margin: 10,
    },
    appbar: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.primary,
    },
    appbarBackaction: {
      color: colors.text,
    },
    appbarTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "500",
      alignSelf: "flex-start",
    },
    saveBtn: {
      fontSize: 20,
      alignSelf: "flex-end",
      fontWeight: 'bold'
    },
    iconButton: {
      alignSelf: "center",
      padding: 15,
      borderColor: colors.secondary,
      borderWidth: 2,
      borderRadius: 40,
      margin: 10,
    },
    colorPicker:{
      gap: 25,
    },
    text: {
      color: colors.text
    },
    calendar: {
      selectedDayBackgroundColor: colors.primary,
      selectedDayTextColor: 'white'
    }
  });
}
