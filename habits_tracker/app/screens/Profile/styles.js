import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/constants/colors";

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
      marginTop: 20,
    },
    infoContainer: {
      backgroundColor: colors.tertiary,
      width: "80%",
      alignSelf: "center",
      borderRadius: 50,
      margin: 20,
      paddingBottom: 15,
      marginBottom: 50,
    },
    textIcon: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10
    },
    appbarTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: "500",
      alignSelf: "center",
      marginTop: 20,
    },
    appbar: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.primary,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 5,
      margin: 10,
      alignSelf: "center",
      width: "55%"
    },
    buttonRemove: {
      backgroundColor: "#EC2C35",
      padding: 10,
      borderRadius: 5,
      margin: 10,
      alignSelf: "center",
      fontWeight: "bold",
    },
  });
}
