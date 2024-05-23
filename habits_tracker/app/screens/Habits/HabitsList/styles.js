import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/constants/colors";

export const getStyles = (mode) => {
  const colors = mode === 'dark' ? COLORS.dark : COLORS.light; 
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "500",
      alignSelf: "flex-start",
      marginLeft: 20,
    },
    appbarTitle: {
      color: "white",
      fontSize: 20,
      fontWeight: "500",
      alignSelf: "flex-start",
    },
    habitList: {
      width: "95%",
      padding: 10,
      marginTop: 20,
      alignSelf: "center",
    },
    habitBlock: {
      width: "100%",
      padding: 20,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      marginTop: 5,
      borderRadius: 20,
      flexDirection: "column",
    },
    habitName: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "500",
    },
    habitDescription: {
      marginTop: 10,
      color: colors.text,
      fontSize: 16,
      fontWeight: "200",
    },
    appbar: {
      flexDirection: "row",
      width: "100%",
      padding: 10,
      backgroundColor: colors.primary,
      elevation: 0,
      alignSelf: "flex-start",
    },
  });
  
} 