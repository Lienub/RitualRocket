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
    },
    appbarTitle: {
      color: "white",
      fontSize: 20,
      fontWeight: "500",
      alignSelf: "flex-start",
    },
    categoryList: {
      width: "95%",
      padding: 15,
      marginTop: 20,
      alignSelf: "center",
      marginBottom: 100,
    },
    categoryBlock: {
      width: "100%",
      padding: 20,
      backgroundColor: colors.tertiary,
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      marginTop: 5,
      borderRadius: 20,
      flexDirection: "column",
    },
    categoryTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "500",
    },
    categoryDescription: {
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
