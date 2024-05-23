import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/constants/colors";

export const getStyles = (mode) => {
  const colors = mode === 'dark' ? COLORS.dark : COLORS.light
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    background: {
      flex: 1,
      width: "90%"
    },
    form: {
      borderRadius: 20,
      shadowColor: 'black',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      backgroundColor: colors.background
    },
    title: {},
    logo: {
      height: 150,
      width: 150,
      alignSelf: "center",
      margin: 20,
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: colors.tertiary,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16,
      fontSize: 18,
    },
    button: {
      backgroundColor: colors.primary,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonTitle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    footerView: {
      alignItems: "center",
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: colors.text,
    },
    footerLink: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 16,
    },
    divider: {
      flexDirection: "row",
      marginVertical: 40,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.text,
    },
    dividerText: {
      marginHorizontal: 20,
      fontSize: 18,
      color: colors.text
    },
    socialMedia: {
      flexDirection: "row",
      justifyContent: "center",
    },
    socialMediaIcon: {
      width: 40,
      height: 40,
    },
    textError: {
      color: "red",
      fontSize: 20,
      borderRadius: 20,
      alignSelf: "center",
      marginBottom: 10,
    },
  })
};