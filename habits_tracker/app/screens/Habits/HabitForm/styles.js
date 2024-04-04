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
    input: {
      width: "95%",
      padding: 4,
      backgroundColor: colors.tertiary,
      marginTop: 4,
      alignSelf: "center",
      borderRadius: 10,
      color: colors.text,
      fontSize: 20,
    },
    modal: {
      flex:1,
      justifyContent: "center",
    },
    btnSelectIcon: {
      borderRadius: 10,
      color: colors.primary,
      fontSize: 20,
      fontWeight: "500",
      marginBottom: 10,
    },
    viewModal: {
      margin: 20,
      backgroundColor: colors.background,
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
    selectedIcon: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "500",
      marginBottom: 10,
      alignSelf: "center",
    },
    selectElement: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    modalColor: {
      marginTop: 100,
      width: "60%",
    },
    dateTimePicker: {
      fontSize: 20,
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
      padding: 10,
    }
  });
}
